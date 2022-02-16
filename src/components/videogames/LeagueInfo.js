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
                setVideogame(res.data.videogame.name)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    if (league !== '' && videogame !== '') {
        return (
            <>
                <h1>Informations - {league.name}</h1>
    
                <Link to={`/leagues/${id}/matches/past`} state={{ nameLeague: league.name , nameVideogame: videogame }}>Matchs passés</Link>
                
                <br/>
                <Link to={`/leagues/${id}/matches/running`} state={{ nameLeague: league.name, nameVideogame: videogame }}>Matchs en cours</Link>
                <br/>
                <Link to={`/leagues/${id}/matches/upcoming`} state={{ nameLeague: league.name, nameVideogame: videogame }}>Matchs à venir</Link>
            </>
        );
    } else {
        return (
            <LoadingPage />
        )
    }

}