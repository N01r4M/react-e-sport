import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiPs from "../../apiPS";
import MatchCard from "../elements/MatchCard";
import LoadingPage from "../LoadingPage";
import { formatDate } from "../functions/formatsDateTime";
import BgLogo from "../elements/Background";

export default function LeagueSchedule() {
    const   { id } = useParams(),
            [loading, setLoading] = useState(false),
            [serie, setSerie] = useState({}),
            [pastMatches, setPastMatches] = useState([]),
            [runningMatches, setRunningMatches] = useState([]),
            [upcomingMatches, setUpcomingMatches] = useState([])

    let matches = {}

    const getMatches = (data) => {
        apiPs.get(`/series/${data.id}/matches/past?sort=-begin_at`)
            .then(res => {
                setPastMatches(res.data.reverse())
            })
            .catch(err => {
                console.log(err)
            })

        apiPs.get(`/series/${data.id}/matches/running?sort=begin_at`)
            .then(res => {
                setRunningMatches(res.data);
            })
            .catch(err => {
                console.log(err)
            })

        apiPs.get(`/series/${data.id}/matches/upcoming?sort=begin_at`)
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
                <h3 className="date-schedule">{formatDate(dateGroup)}</h3>

                {
                    matches[dateGroup].map(match => {
                        return <MatchCard 
                            match={match}
                        />
                    })
                }
            </div>

        )
    }
    
    useEffect(() => {
        apiPs.get(`/series/running?filter[league_id]=${id}`)
        .then(res => {
            if (res.data[0] !== undefined) {
                setSerie(res.data[0])
                getMatches(res.data[0])
            } else {
                apiPs.get(`/series/upcoming?filter[league_id]=${id}`)
                    .then(res => {
                        if (res.data[0] !== undefined) {
                            setSerie(res.data[0])
                            getMatches(res.data[0])
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
        .catch(err => {
            console.log(err)
        })

        setLoading(false)
    }, [])

    if (!loading) {
        if (serie && Object.keys(serie).length === 0 && Object.getPrototypeOf(serie) === Object.prototype) {
            return (
                <>
                    <h1>Aucune série en cours ou à venir pour cette league</h1>
                </>
            );
        } else {
            return (
                <>
                    <BgLogo image={serie.league.image_url} />

                    {renderMatches}
                </>
            );
        }
    } else {
        return (
            <LoadingPage />
        );
    }
}