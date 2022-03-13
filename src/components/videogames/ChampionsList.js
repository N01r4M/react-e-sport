import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiPS from "../../apiPS";
import PaginationBar from "../elements/Pagination";
import LoadingPage from "../LoadingPage";

export default function ChampionsList() {
    const   [loading, setLoading] = useState(true),
            [champions, setChampions] = useState([]),
            [disabled, setDisabled] = useState(false),
            [noPage, setNoPage] = useState(false),
            { page } = useParams(),
            { slug } = useParams()

    const getChampions = () => {
        apiPS.get(slug === 'lol' ? `/lol/champions?sort=name&page=${page}&per_page=20` : `/dota2/heroes?sort=name&page=${page}&per_page=25`)
        .then(res => {
            setChampions(res.data)
            
            apiPS.get(slug === 'lol' ? `/lol/champions?sort=name&page=${parseInt(page) + 1}&per_page=20` : `/dota2/heroes?sort=name&page=${parseInt(page) + 1}&per_page=25`)
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
    }, [slug])

    if (!loading) {
        return (
            <div>
                <div className="d-flex justify-content-between align-items-center p-2">
                    <div>
                        <h2>Liste des {slug === 'lol' ? 'champions' : 'héros'}</h2>
                    </div>

                    <div>
                        <Formik
                            initialValues={{ champions: "" }}
                            onSubmit={(values, { setSubmitting }) => {
                                if (values.champions !== "") {
                                    apiPS.get(slug === 'lol' ? `/lol/champions?sort=name&search[name]=${values.champions}` : `/dota2/heroes?sort=name&search[name]=${values.champions}`)
                                        .then(res => {
                                            setChampions(res.data)
                                            setNoPage(true)
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })
                                } else {
                                    getChampions()
                                    setNoPage(false)
                                }
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="input-group mb-3">
                                        <Field type="text" name="champions" placeholder="Recherche par nom" />

                                        <button type="submit" className="submit-button">Rechercher</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                
                {
                    !noPage && <div className="d-flex justify-content-center">
                        <PaginationBar
                            nbPages={0}
                            disabled={disabled}
                            page={parseInt(page)}
                            url={slug === 'lol' ? `/${slug}/champions/` : `/${slug}/heroes/`}
                        />
                    </div>
                }

                <div className="list-cards">
                    {
                        champions.map(champion => 
                            <div key={champion.id} className={slug === 'lol' ? 'card card-elmt shadow rounded' : 'card card-heroes shadow rounded'}>
                                <img src={champion.image_url} className="card-img-top" alt="Image champion" />
                                <div className="card-body">
                                    <h5 className="card-title">{champion.name}</h5>
                                    {
                                        slug === 'lol' && <ul>
                                            <li>Armure : {champion.armor}</li>
                                            <li>Attack damage : {champion.attackdamage}</li>
                                            <li>Attack range : {champion.attackrange}</li>
                                            <li>HP : {champion.hp}</li>
                                            <li>Mana : {champion.mp}</li>
                                        </ul>
                                    }
                                </div>
                            </div> 
                        )
                    }
                </div>
                
                {
                    !noPage && <div className="d-flex justify-content-center">
                        <PaginationBar
                            nbPages={0}
                            disabled={disabled}
                            page={parseInt(page)}
                            url={slug === 'lol' ? `/${slug}/champions/` : `/${slug}/heroes/`}
                        />
                    </div>
                }
            </div>
        );
        
    } else {
        return (
            <LoadingPage />
        )
    }
}