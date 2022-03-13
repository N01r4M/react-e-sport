import React from "react"
import withRouter from "../functions/withRouter";
import apiPs from "../../apiPS";
import LoadingPage from "../LoadingPage";
import LeagueCard from "../elements/Card";
import PaginationBar from "../elements/Pagination";
import apiDB from "../../apiDB";
import { Field, Form, Formik } from "formik";
import apiPS from "../../apiPS";


class LeaguesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            favLeagues: []
        }
        this.slug = props.params.slug
        this.page = parseInt(props.params.page)

        this.idUser = this.props.idUser
    }

    getData = () => {
        apiPs.get(`videogames/${this.slug}`)
        .then(res => {
            const videogame = res.data
            let nbPages = res.data.leagues.length / 15
            
            if (!Number.isInteger(nbPages)) {
                nbPages = parseInt(nbPages) + 1
            }
            
            this.setState({ videogame })
            this.setState({ nbPages })
            
            apiPs.get(`videogames/${this.slug}/leagues?sort=name&page=${this.page}&per_page=15`)
            .then(res => {
                const leagues = res.data
                this.setState({ leagues })
            })
        })
    }

    getFav = () => {
        apiDB.get(`/favLeagues?idUser=${this.idUser}`)
            .then(res => {
                res.data.map(elmt => {
                    this.setState({ favLeagues: [...this.state.favLeagues, elmt.league.id] });
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getData()
        sessionStorage.getItem('token') !== null && this.getFav()
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.slug !== prevProps.params.slug || this.props.params.page !== prevProps.params.page) {
            delete this.state.videogame
            delete this.state.nbPages
            delete this.state.leagues

            this.slug = this.props.params.slug
            this.page = parseInt(this.props.params.page)
            
            this.getData()
            sessionStorage.getItem('token') !== null && this.getFav()
        }
    }

    
    render() {
        if ("videogame" in this.state && "leagues" in this.state) {
            return (
                <>
                    <div className="d-flex justify-content-between align-items-center p-2">
                        <div>
                            <h1>{this.state.videogame.name}</h1>
                            <h2>Liste des leagues</h2>
                        </div>

                        <div>
                            <Formik
                                initialValues={{ league: "" }}
                                onSubmit={(values, { setSubmitting }) => {
                                    if (values.league !== "") {
                                        apiPS.get(this.slug === 'league-of-legends' ? `/lol/leagues?sort=name&search[name]=${values.league}` : `/dota2/leagues?sort=name&search[name]=${values.league}`)
                                            .then(res => {
                                                this.setState({ leagues: res.data })
                                                this.setState({ nbPages: 0 })
                                                this.props.params.page = 'search'
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            })
                                    } else {
                                        this.getData()
                                    }
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="input-group mb-3">
                                            <Field type="text" name="league" placehorder="Recherche par nom" />

                                            <button type="submit" className="submit-button">Rechercher</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                    <div className="list-cards">
                        {
                            this.state.leagues.map(league => 
                                <LeagueCard league={league} fav={this.state.favLeagues.includes(league.id)} idUser={this.idUser} />
                            )
                        }
                    </div>

                    {
                        this.state.nbPages !== 0 && <div className="d-flex justify-content-center">
                            <PaginationBar
                                nbPages={this.state.nbPages}
                                page={this.page}
                                url={`/videogames/${this.slug}/leagues/`} />
                        </div>
                    }
                </>
            );
        } else {
            return (
                <LoadingPage />
            );
        }
    }
}

export default withRouter(LeaguesList)