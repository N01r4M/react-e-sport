import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiPS from "../../apiPS";
import BgLogo from "../elements/Background";
import { SmallMatchCard } from "../elements/Card";
import { PlayerCard } from "../elements/Card";
import LoadingPage from "../LoadingPage";

export default function TeamInfo() {
    const   { slug } = useParams(),
            [loading, setLoading] = useState(false),
            [team, setTeam] = useState({}),
            [players, setPlayers] = useState([]),
            [pastMatches, setPastMatches] = useState([]),
            [runningMatches, setRunningMatches] = useState([]),
            [upcomingMatches, setUpcomingMatches] = useState([]),
            isConnected = sessionStorage.getItem('token') === null ? false : true

    let matches = {}

    
    const getMatches = (data) => {
        apiPS.get(`/teams/${data.id}/matches?filter[status]=finished&sort=-begin_at&per_page=3`)
            .then(res => {
                setPastMatches(res.data.reverse())
            })
            .catch(err => {
                console.log(err)
            })

        apiPS.get(`/teams/${data.id}/matches?filter[status]=running&sort=begin_at`)
            .then(res => {
                setRunningMatches(res.data);
            })
            .catch(err => {
                console.log(err)
            })

        apiPS.get(`/teams/${data.id}/matches?filter[status]=not_started&sort=begin_at&per_page=3`)
            .then(res => {
                setUpcomingMatches(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const groupMatches = (data) => {
        data.forEach(match => {
            const date = match.scheduled_at.split('T')[0]
            if (matches[date]) {
                matches[date].push(match)
            } else {
                matches[date] = [match]
            }
        })

        return matches
    }

    groupMatches(pastMatches)
    groupMatches(runningMatches)
    groupMatches(upcomingMatches)

    const renderMatches = []
    for (const dateGroup in matches) {
        renderMatches.push(
            <div className="group-matches" key={dateGroup}>
                {
                    matches[dateGroup].map(match => {
                        return <SmallMatchCard 
                            match={match}
                            isConnected={isConnected}
                        />
                    })
                }
            </div>
        )
    }

    const renderPlayers = []
    for (let nb = 0; nb < players.length; nb++) {
        renderPlayers.push(
            <div className="group-matches" key={players[nb].slug}>
                <PlayerCard player={players[nb]} />
            </div>
        )
    }
    
    useEffect(() => {
        apiPS.get(`/teams/${slug}`)
        .then(res => {
            setTeam(res.data)
            setPlayers(res.data.players)
            getMatches(res.data)
        })
        .catch(err => {
            console.log(err)
        })

        setLoading(false)
    }, [])

    if (!loading) {
        return (
            <>
                <BgLogo image={team.image_url} />

                <h1>{team.name}</h1>

                <div className="row">
                    <div className="col">
                        <h3>Planning des matchs</h3>
                        {renderMatches}
                    </div>

                    <div className="col">
                        <h3>Liste des joueurs</h3>
                        {renderPlayers}
                    </div>
                </div>
            </>
        );
    } else {
        <LoadingPage />
    }
}