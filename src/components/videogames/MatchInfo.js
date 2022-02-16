import React from "react";
import { Link } from "react-router-dom";
import apiPS from "../../apiPS";
import withRouter from "../functions/withRouter";
import LoadingPage from "../LoadingPage";

class MatchInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.idMatch = props.params.idMatch
    }

    componentDidMount() {
        apiPS.get(`matches/${this.idMatch}`)
            .then(res => {
                const   match = res.data,
                        team1 = res.data.opponents[0].opponent,
                        team2 = res.data.opponents[1].opponent
                this.setState({ match })
                this.setState({ team1 })
                this.setState({ team2 })
            })
            .catch(error => {
                console.log(error);
            })
        }
        
        
        render() {
            console.log(this.state.match);
        if ("match" in this.state && "team1" in this.state && "team2" in this.state) {
            return (
                <>
                    <nav className="crumbs">
                        <ol>
                            <li className="crumb"><Link to={'/'}>Accueil</Link></li>
                            <li className="crumb"><Link to={`/videogames/${this.state.match.videogame.id}`}>{this.state.match.videogame.name}</Link></li>
                            <li className="crumb"><Link to={`/leagues/${this.state.match.league_id}`}>{this.state.match.league.name}</Link></li>
                            {
                                this.state.match.status === 'not_stated' ? <li className="crumb"><Link to={`/leagues/${this.state.match.league_id}/matches/upcoming`}>Matchs à venir</Link></li> : ''
                            }

                            {
                                this.state.match.status === 'started' ? <li className="crumb"><Link to={`/leagues/${this.state.match.league_id}/matches/running`}>Matchs en cours</Link></li> : ''
                            }
                                
                            {
                                this.state.match.status === 'finished' ? <li className="crumb"><Link to={`/leagues/${this.state.match.league_id}/matches/past`}>Matchs terminés</Link></li> : ''
                            }
                        
                            <li className="crumb">{this.state.match.name}</li>
                        </ol>
                    </nav>

                    <h1>{this.state.match.league.name} - {this.state.match.name}</h1>
                    <section>
                        <aside>
                            <h3>Informations générales</h3>
                            <p>Le {new Intl.DateTimeFormat("fr-FR", {
                                year: "numeric",
                                month: "long",
                                day: "2-digit"
                            }).format(new Date(this.state.match.begin_at))} à {new Intl.DateTimeFormat("fr-FR", {
                                hour12: false,
                                hour: '2-digit',
                                minute: "2-digit"
                            }).format(new Date(this.state.match.begin_at))} (heure française)</p>
                            {(this.state.match.rescheduled) ? <p>Initialement prévu le {new Intl.DateTimeFormat("fr-FR", {
                                year: "numeric",
                                month: "long",
                                day: "2-digit"
                            }).format(new Date(this.state.match.begin_at))} à {new Intl.DateTimeFormat("fr-FR", {
                                hour12: false,
                                hour: '2-digit',
                                minute: "2-digit"
                            }).format(new Date(this.state.match.begin_at))} (heure française)</p> : ''}
                            <p>Score : {this.state.match.results[0].score} - {this.state.match.results[1].score} pour <b>{this.state.match.winner.name}</b></p>
                            <p>Forfait ? {(this.state.match.forfeit) ? 'Oui' : 'Non'}</p> 
                        </aside>
                
                        <aside>
                            <img alt="Logo 1ère équipe" className="logo-league" src={this.state.team1.image_url} />
                            <h3>{this.state.team1.name}</h3>
                        </aside>
                
                        <aside>
                            <img alt="Logo 2nde équipe" className="logo-league" src={this.state.team2.image_url} />
                            <h3>{this.state.team2.name}</h3>
                        </aside>
                    </section>
                </>
            );
        } else {
            return (
                <LoadingPage />
            )
        }
    }
}

export default withRouter(MatchInfo)