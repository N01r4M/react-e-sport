import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PaginationBar from "../elements/Pagination"
import LoadingPage from "../LoadingPage"
import apiPS from "../../apiPS";

export default function HeroesList() {
    const   [loading, setLoading] = useState(true),
            [heroes, setHeroes] = useState([]),
            [disabled, setDisabled] = useState(false),
            { page } = useParams(),
            { slug } = useParams()


    const getHeroes = () => {
        apiPS.get(`/dota2/heroes?sort=name&page=${page}&per_page=25`)
            .then(res => {
                setHeroes(res.data)

                apiPS.get(`/dota2/heroes?sort=name&page=${parseInt(page) + 1}&per_page=25`)
                    .then(res => {
                        console.log(res.data);
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
        getHeroes()
        setLoading(false)
    }, [])

    if (!loading) {
        return (
            <div>
                <h2>Liste des héros</h2>

                <div className="d-flex justify-content-center">
                    <PaginationBar
                        nbPages={0}
                        disabled={disabled}
                        page={parseInt(page)}
                        url={`/${slug}/heroes/`}
                    />
                </div>

                <div className="list-cards">
                    {
                        heroes.map(hero => 
                            <div key={hero.id} className="card-heroes shadow rounded">
                                <img src={hero.image_url} className="card-img-top" alt="Image héro" />
                                <div className="card-body">
                                    <h5 className="card-title">{hero.name}</h5>
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
                        url={`/${slug}/heroes/`}
                    />
                </div>
            </div>
        )
    } else {
        return (
            <LoadingPage />
        )
    }
} 