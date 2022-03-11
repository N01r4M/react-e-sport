import React from "react"
import apiDB from "../../apiDB";
import formatHour, { formatDate, formatDateTime } from "../functions/formatsDateTime";
import isSameDay from "../functions/isSameDay";
import LinkButton, { BetButton } from "./Button";
import Coins from "./Coins";
import Score from "./Score";
import TeamScore, { SmallTeamScore } from "./TeamsScore";

export default class LeagueCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fav: this.props.fav
        }
    }

    
    render() {
        return (
            <div key={this.props.league.id} className="card card-elmt shadow rounded">
                <img src={this.props.league.image_url} className="card-img-top" alt="Logo league" />
                {
                    this.state.fav ? <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-suit-heart-fill icon" viewBox="0 0 16 16" onClick={
                        () => {
                            apiDB.get(`/favLeagues?idUser=${parseInt(this.props.idUser)}&idLeague=${parseInt(this.props.league.id)}`)
                                .then(res => {
                                    const status = JSON.stringify(res.status)
                                    if (status === '200') {
                                        apiDB.delete(`/favLeagues/${parseInt(res.data[0].id)}`)
                                            .then(res => {
                                                const status = JSON.stringify(res.status)
                                                if (status === '200') {
                                                    this.setState({fav: false})
                                                } else {
                                                    console.log(`StatusHTTP : ${status}`)
                                                }
                                            })
                                            .catch(err => {
                                                console.log(err)
                                            })
                                    } else {
                                        console.log(`StatusHTTP : ${status}`)
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }
                    }>
                        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                    </svg> : sessionStorage.getItem('token') !== null && <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-suit-heart icon" viewBox="0 0 16 16" onClick={
                        () => {
                            apiDB.post(`/favLeagues`, {
                                "idUser": parseInt(this.props.idUser),
                                "league": this.props.league
                            })
                            .then(res => {
                                const status = JSON.stringify(res.status)
                                if (status === '201') {
                                    this.setState({ fav: true })
                                } else {
                                    console.log(`StatusHTTP : ${status}`)
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            }) 
                        }
                    }>
                        <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                    </svg>
                }
                <div className="card-body">
                    <h5 className="card-title">{this.props.league.name}</h5>
                    <div className="d-flex justify-content-around">
                        <LinkButton url={`/leagues/${this.props.league.id}/teams`} txt="Equipes" />
                        <LinkButton url={`/leagues/${this.props.league.id}/schedule`} txt="Programme" />
                    </div>
                </div>
            </div>
        );
    }
}

export class MatchCard extends React.Component {
    constructor(props) {
        super(props)
    }

    
    render() {
        return (
            <div className={`match-card ${isSameDay(new Date(this.props.match.scheduled_at), new Date()) && ' border-today'}`} key={this.props.match.id}>
                <div className="hour">
                    <h2>{formatHour(this.props.match.scheduled_at)}</h2>
                </div>

                <TeamScore
                    match={this.props.match}
                />

                {
                    (this.props.match.status === 'not_started' && this.props.isConnected) && 
                    <BetButton 
                        coins={this.props.coins} 
                        team1={this.props.match.opponents.length !== 0 && this.props.match.opponents[0].opponent}
                        team2={(this.props.match.opponents.length !== 0 && this.props.match.opponents.length === 2) && this.props.match.opponents[1].opponent}
                        match={this.props.match}
                        idUser={parseInt(this.props.idUser)}
                    />
                }

                {
                    this.props.match.status === 'running' && <LinkButton url={`/matches/${this.props.match.slug}`} params={{ match: this.props.match, idUser: this.props.idUser}} txt="Regarder" />
                }
            </div>
        );
    }
}

export class SmallMatchCard extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className={`match-card small-card ${isSameDay(new Date(this.props.match.scheduled_at), new Date()) && ' border-today'}`} key={this.props.match.id}>
                <div className="hour">
                    <h4>{formatDateTime(this.props.match.scheduled_at)}</h4>
                </div>

                <TeamScore
                    match={this.props.match}
                />

                {
                    (this.props.match.status === 'not_started' && this.props.isConnected) && <BetButton 
                        idUser={this.props.idUser}
                        match={this.props.match}
                    />
                }

                {
                    this.props.match.status === 'running' && <LinkButton url={`/matches/${this.props.match.slug}`} params={{ match: this.props.match, idUser: this.props.idUser }} txt="Regarder" />
                }
            </div>
        );
    }
} 

export function MatchCardHome(props) {
    return (
        <div key={props.match.id} className="card card-elmt shadow rounded">
            <div className="card-body">
                <h5 className="mb-3">{props.match.videogame.name} - {props.match.league.name}</h5>

                <SmallTeamScore match={props.match} />

                {
                    props.match.status === 'not_started' &&
                    <p className="mt-2">Commence à : {formatHour(props.match.scheduled_at)}</p>
                }

                <div className="d-flex justify-content-around mt-2">
                    {
                        props.match.status === 'not_started' &&
                        <BetButton
                            coins={props.coins}
                            team1={props.match.opponents.length !== 0 && props.match.opponents[0].opponent}
                            team2={(props.match.opponents.length !== 0 && props.match.opponents.length === 2) && props.match.opponents[1].opponent}
                            match={props.match}
                            idUser={parseInt(props.idUser)}
                        />
                    }

                    {
                        props.match.status === 'running' && <LinkButton url={`/matches/${props.match.slug}`} params={{ match: props.match, idUser: props.idUser }} txt="Regarder" />
                    }

                    {
                        props.match.status === 'finished' && <Score status={props.match.status} team1={props.match.results[0].score} team2={props.match.results[1].score} />
                    }
                </div>
            </div>
        </div>
    )
}

export class PlayerCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={`player-card small-card`} key={this.props.player.id}>
                <img src={this.props.player.image_url} />

                <div>
                    <h5>{this.props.player.name}</h5>
                    <h6>{this.props.player.first_name} <span>{this.props.player.last_name}</span></h6>
                </div>
            </div>
        );
    }
}

export class TeamCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div key={this.props.team.id} className="card card-elmt column shadow rounded">
                <img src={this.props.team.image_url} className="card-img-top" alt="Logo team" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.team.name}</h5>
                    <div className="d-flex justify-content-around">
                        <LinkButton url={`/teams/${this.props.team.slug}`} txt="Voir plus ..." />
                    </div>
                </div>
            </div>
        );
    }
}

export function BetCard(props) {
    return (
        <div className="card-bet shadow" key={props.id}>
            <div>
                <h6>{props.match.name}</h6>
                <p>Mise : {props.coins} <Coins size="18" /> sur {props.match.opponents[0].opponent.id === props.idTeam ? props.match.opponents[0].opponent.acronym : props.match.opponents[1].opponent.acronym}</p>
                {
                    props.match.status === 'finished' && <p className={`${props.match.winner_id === props.team ? 'win' : 'defeat'}`}>{props.match.winner_id === props.team ? `Pari gagné ! Gain : ${props.coins * 2} ${<Coins size="18" />}` : `Perdu ...`}</p>
                }
                {
                    props.match.status === "not_started" && <p>Prévu le {formatDate(props.match.scheduled_at)} à {formatHour(props.match.scheduled_at)}</p>
                }
            </div>
            {
                props.match.status === "running" && <LinkButton url={`/matches/${props.match.slug}`} params={{ match: props.match, idUser: props.idUser, right: true }} txt="Regarder" />
            }
        </div>
    )
}