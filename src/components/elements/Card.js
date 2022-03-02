import React from "react"
import formatHour, { formatDateTime } from "../functions/formatsDateTime";
import isSameDay from "../functions/isSameDay";
import LinkButton, { BetButton } from "./Button";
import TeamScore from "./TeamsScore";

export default class LeagueCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div key={this.props.league.id} className="card-elmt shadow rounded">
                <img src={this.props.league.image_url} className="card-img-top" alt="Logo league" />
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
                    this.props.match.status === 'not_started' && <BetButton />
                }

                {
                    this.props.match.status === 'running' && <LinkButton url={`/matches/${this.props.match.slug}`} params={this.props.match} txt="Regarder" />
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
                    this.props.match.status === "not_started" && <BetButton />
                }

                {
                    this.props.match.status === 'running' && <LinkButton url={`/matches/${this.props.match.slug}`} params={this.props.match} txt="Regarder" />
                }
            </div>
        );
    }
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
            <div key={this.props.team.id} className="card shadow rounded">
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