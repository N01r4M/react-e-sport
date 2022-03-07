import React from "react"
import BgLogo from "../elements/Background"
import withRouter from "../functions/withRouter";
import apiPs from "../../apiPS";
import { TeamCard } from "../elements/Card";

class LeagueTeams extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.id = props.params.id
    }

    getTeams = (serie) => {
        const videogame = serie.videogame.id === 1 ? 'lol' : 'dota2'

        apiPs.get(`/${videogame}/series/${serie.id}/teams?sort=name`)
        .then(res => {
            const teams = res.data

            this.setState({ teams })
        })
        .catch(err => {
            console.log(err);
        })
    }

    
    getData = () => {
        apiPs.get(`/series/running?filter[league_id]=${this.id}`)
        .then(res => {
            if (res.data[0] !== undefined) {
                const serie = res.data[0]
                this.setState({ serie })
                this.getTeams(serie)
            } else {
                apiPs.get(`/series/upcoming?filter[league_id]=${this.id}`)
                    .then(res => {
                        if (res.data[0] !== undefined) {
                            const serie = res.data[0]
                            this.setState(serie)
                            this.getTeams(serie)
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
        
    }
    
    componentDidMount() {
        this.getData()
    }

    render() {
        if ("serie" in this.state) {
            if ("teams" in this.state) {
                return (
                    <>
                        <BgLogo image={this.state.serie.league.image_url} />

                        <h1>{this.state.serie.league.name} - {this.state.serie.full_name}</h1>
                        <h2>Liste des équipes</h2>
                        <div className="list-cards">
                            {
                                this.state.teams.map(team => 
                                    <TeamCard team={team} />
                                )
                            }
                        </div>
                    </>
                );
            } else {
                return (
                    <>
                        <h1>Aucun match en cours ou à venir pour cette league</h1>
                    </>
                );
            }
        } else {
            return (
                <>
                    <h1>Aucune série en cours ou à venir pour cette league</h1>
                </>
            );
        }
    }
}

export default withRouter(LeagueTeams)