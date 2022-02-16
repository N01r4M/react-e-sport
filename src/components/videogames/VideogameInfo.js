import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ApiPS from "../../apiPS"
import LoadingPage from "../LoadingPage"

export default function VideogameInfo() {
    const   [videogame, setVideogame] = useState({}),
            [leagues, setLeagues] = useState([]),
            {id} = useParams(),
            navigateTo = useNavigate()

    useEffect(() => {
        ApiPS.get(`videogames/${id}`)
            .then(response => {
                setVideogame(response.data)
                setLeagues(response.data.leagues)
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    if (leagues.length !== 0 && Object.keys(videogame).length !== 0) {
        return (
            <>
                <h1>{videogame.name}</h1>
                <p>Dernière version : {videogame.current_version}</p>
                <div>
                    <h2>Liste des leagues : </h2>
                    <section>
                        {
                            leagues.map(league =>
                                <div key={ league.id } id={ league.id } onClick={() => {
                                    navigateTo(`/leagues/${league.id}`);
                                }}>
                                    <aside>
                                        <img alt="Logo league" className="logo-league" src={league.image_url} />
                                        <h3>{league.name}</h3>
                                    </aside>
                                </div>
                            )
                        }
                    </section>
                </div>
            </>
        )
    } else {
        return (
            <LoadingPage />
        )
    }
    


}
