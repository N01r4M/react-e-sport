import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiPS from "../../apiPS";
import LoadingPage from "../LoadingPage";

export default function LeagueInfo() {
    const   { id } = useParams(),
            [league, setLeague] = useState(''),
            [videogame, setVideogame] = useState('')

    useEffect(() => {
        apiPS.get(`leagues/${id}`)
            .then(res => {
                setLeague(res.data)
                setVideogame(res.data.videogame)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    if (league !== '' && videogame !== '') {
        return (
            <>
                <nav className="crumbs">
                    <ol>
                        <li className="crumb"><Link to={'/'}>Accueil</Link></li>
                        <li className="crumb"><Link to={`/videogames/${videogame.id}`}>{videogame.name}</Link></li>
                        <li className="crumb">{league.name}</li>
                    </ol>
                </nav>

                <h1>Informations - {league.name}</h1>

                {
                    league.url === null ? '' : <p><br /><a href={league.url} target="_blank">Site officiel de la league</a><br /></p>
                }

    
                <Link to={`/leagues/${id}/matches/past`} state={{ nameLeague: league.name, nameVideogame: videogame.name, idVideogame: videogame.id }}>Matchs passés</Link>
                <br/>
                <Link to={`/leagues/${id}/matches/running`} state={{ nameLeague: league.name, nameVideogame: videogame.name, idVideogame: videogame.id }}>Matchs en cours</Link>
                <br/>
                <Link to={`/leagues/${id}/matches/upcoming`} state={{ nameLeague: league.name, nameVideogame: videogame.name, idVideogame: videogame.id }}>Matchs à venir</Link>
            </>
        );
    } else {
        return (
            <LoadingPage />
        )
    }

}