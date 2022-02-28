import React from "react";
import formatHour, { formatDateTime } from "../functions/formatsDateTime";
import isSameDay from "../functions/isSameDay";
import { BetButton } from "./Button";
import TeamScore from "./TeamsScore";

export default class MatchCard extends React.Component {
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
            </div>
        );
    }
}