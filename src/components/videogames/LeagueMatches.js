import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import apiPS from "../../apiPS";
import LoadingPage from "../LoadingPage";

export default function LeagueMatches() {
    const   [matches, setMatches] = useState([]),
            {id} = useParams(),
            paramMatches = window.location.pathname.split("/").pop(),
            data = useLocation(),
            navigateTo = useNavigate()

    useEffect(() => {
        apiPS.get(`leagues/${id}/matches/${paramMatches}`)
            .then(res => {
                setMatches(res.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    if (matches.length !== 0) {
        console.log(data);
        return (
            <>
                <nav className="crumbs">
                    <ol>
                        <li className="crumb"><Link to={'/'}>Accueil</Link></li>
                        <li className="crumb"><Link to={`/videogames/${data.state.idVideogame}`}>{data.state.nameVideogame}</Link></li>
                        <li className="crumb"><Link to={`/leagues/${id}`}>{data.state.nameLeague}</Link></li>
                        {
                            paramMatches === 'upcoming' ? <li className="crumb">Matchs à venir</li> : ''
                        }

                        {
                            paramMatches === 'running' ? <li className="crumb">Matchs en cours</li> : ''
                        }

                        {
                            paramMatches === 'past' ? <li className="crumb">Matchs terminés</li> : ''
                        }
                    </ol>
                </nav>

                <h1>{data.state.nameVideogame} - {data.state.nameLeague}</h1>
    
                <div>
                    <h2>Liste des matches</h2>
                    <section>
                        {
                        (matches.length > 0) ? 
                            matches.map(match => 
                                <div key={match.id} id={match.id} onClick={() => {
                                    navigateTo(`/leagues/${id}/matches/${match.id}`);
                                }}>
                                    <aside>
                                        <div className="jc-se">
                                            <img alt="Logo match" className="logo-team" src={match.opponents[0].opponent.image_url} />
                                            <img alt="Logo match" className="logo-team" src={match.opponents[1].opponent.image_url} />
                                        </div>
                                        <h3 className="ta-center">{match.name}</h3>
                                        <p>Le {new Intl.DateTimeFormat("fr-FR", {
                                            year: "numeric",
                                            month: "long",
                                            day: "2-digit"
                                        }).format(new Date(match.original_scheduled_at))} à {new Intl.DateTimeFormat("fr-FR", {
                                            hour12: false,
                                            hour: '2-digit',
                                            minute: "2-digit"
                                        }).format(new Date(match.original_scheduled_at))} (heure française)</p>
                                        {(match.rescheduled) ? <p>Initialement prévu le {new Intl.DateTimeFormat("fr-FR", {
                                            year: "numeric",
                                            month: "long",
                                            day: "2-digit"
                                        }).format(new Date(match.scheduled_at))} à {new Intl.DateTimeFormat("fr-FR", {
                                            hour12: false,
                                            hour: '2-digit',
                                            minute: "2-digit"
                                        }).format(new Date(match.scheduled_at))} (heure française)</p> : ''}
                                        {
                                            (paramMatches === 'past') ?
                                            <div>
                                                <p><b>Vainqueur : </b>{match.winner.acronym}</p>
                                                <p>Score : {match.results[0].score} - {match.results[1].score}</p> 
                                                <p>Forfait ? {(match.forfeit) ? 'Oui' : 'Non'}</p> 
                                            </div>
                                            : 
                                            <div>
                                                <p>Stream : <a href={match.official_stream_url}>Chaîne Twitch officielle</a></p>
                                            </div>
                                        }
                                    </aside>
                                </div>
                            ) : <p>Aucun match trouvé</p>
                        }
                    </section>
                </div>
            </>
        );
    } else {
        return (
            <LoadingPage />
        )
    }

}