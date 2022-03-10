import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiDB from "../../apiDB";
import apiPS from "../../apiPS";
import { BetCard } from "../elements/Card";
import CarouselFav, { CarouselMatch } from "../elements/Carousel";
import LoadingPage from "../LoadingPage";

export default function Home() {
    const   [loading, setLoading] = useState(true),
            [bets, setBets] = useState([]),
            [leagues, setLeagues] = useState([]),
            [matchesFav, setMatchesFav] = useState([]),
            location = useLocation(),
            coins = location.state.coins,
            idUser = location.state.idUser,
            startDay = () => {
                const date = new Date(),
                    day = date.getDate(),
                    month = date.getMonth() + 1,
                    year = date.getFullYear()

                return `${year}-${month < 10 ? `0${month}` : `${month}`}-${day < 10 ? `0${day}` : `${day}`}T00:00:00Z`
            },
            endDay = () => {
                const date = new Date(),
                    day = date.getDate(),
                    month = date.getMonth() + 1,
                    year = date.getFullYear()

                return `${year}-${month < 10 ? `0${month}` : `${month}`}-${day < 10 ? `0${day}` : `${day}`}T23:59:59Z`
            },

    getBets = () => {
        apiDB.get(`/bets?idUser=${idUser}&_sort=createdAt&_order=desc&_limit=3`)
        .then(res => {
            res.data.map(elmt => {
                apiPS.get(`/matches/${elmt.match.id}`)
                    .then(res => {
                        elmt.match = res.data
                    })
                    .catch(err => {
                        console.log(err);
                    })
                setBets(bets => ([...bets, elmt]));
            })
        })
        .catch(err => {
            console.log(err);
        })
    },

    getLeagues = () => {
        apiDB.get(`/favLeagues?idUser=${idUser}&_sort=league.name`)
        .then(res => {
            res.data.map(elmt => {
                setLeagues(leagues => ([...leagues, elmt.league]))
            })

            res.data.map(elmt => {
                getMatchesFav(elmt.league.id)
            })
        })
        .catch(err => {
            console.log(err);
        })
        },

    getMatchesFav = (idLeague) => {
        apiPS.get(`/matches?filter[league_id]=${idLeague}&range[scheduled_at]=${startDay()},${endDay()}&sort=-scheduled_at`)
            .then(res => {
                setMatchesFav(matchesFav => ([...matchesFav, ...res.data]))
            })
            .catch(err => {
                console.log(err);
            })
    }

    
    
    useEffect(() => {
        getBets()
        getLeagues()
        setLoading(false)
    }, []) 
    
    if (!loading) {
        return (
            <>
                <h1>Accueil</h1>

                <div className="list-cards">
                    <div className="card card-home shadow rounded">
                        <h2>Tes derniers paris</h2>
                        {
                            bets.map(bet =>
                                <BetCard coins={bet.coins} team={bet.idTeam} match={bet.match} id={bet.id} />
                            )
                        }
                    </div>

                    <div className="card card-home shadow rounded justify-content-center">
                        <h2>Les ligues suivies</h2>
                        <CarouselFav leagues={leagues} idUser={idUser} />
                    </div>

                    <div className="card card-home shadow rounded justify-content-center">
                        <h2>Matchs prévus aujourd'hui</h2>
                        <CarouselMatch matches={matchesFav} idUser={idUser} coins={coins} />
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <LoadingPage />
        )
    }
}