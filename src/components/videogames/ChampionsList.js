import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiPS from "../../apiPS";
import LinkButton from "../elements/Button";
import PaginationBar from "../elements/Pagination";
import LoadingPage from "../LoadingPage";

export default function ChampionsList() {
    const   [loading, setLoading] = useState(true),
            [champions, setChampions] = useState([]),
            [disabled, setDisabled] = useState(false),
            { page } = useParams(),
            { slug } = useParams()


    const getChampions = () => {
        apiPS.get(`/lol/champions?sort=name&page=${page}&per_page=30`)
        .then(res => {
            setChampions(res.data)
            
            apiPS.get(`/lol/champions?sort=name&page=${parseInt(page) + 1}&per_page=30`)
                .then(res => {
                    res.data.length === 0 && setDisabled(true)
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getChampions()
        setLoading(false)
    }, [])

    if (!loading) {
        return (
            <>
                <h2>Liste des champions</h2>

                <div className="d-flex justify-content-center">
                    <PaginationBar
                        nbPages={0}
                        disabled={disabled}
                        page={parseInt(page)}
                        url={`/${slug}/champions/`}
                    />
                </div>

                <div className="list-cards">
                    {
                        champions.map(champion => 
                            <div key={champion.id} className="card shadow rounded">
                                <img src={champion.image_url} className="card-img-top" alt="Logo league" />
                                <div className="card-body">
                                    <h5 className="card-title">{champion.name}</h5>
                                    <LinkButton
                                        url={`/champions/${champion.id}`}
                                        txt="Voir plus ..."
                                    />
                                </div>
                            </div> 
                        )
                    }
                </div>

                <div className="d-flex justify-content-center">
                    <PaginationBar 
                        nbPages={0}
                        disabled={disabled}
                        page={parseInt(page)}
                        url={`/${slug}/champions/`}
                    />
                </div>
            </>
        );
        
    } else {
        return (
            <LoadingPage />
        )
    }
}