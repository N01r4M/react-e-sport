import React from "react";

export default class TeamDiv extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={`team ${this.props.left ? 'ta-left' : 'ta-right'} ${this.props.left && 'fd-reverse'} ${(this.props.matchStatus !== 'finished' || this.props.winner === this.props.team.id) ? '' : 'loser'}`} >
                <img src={this.props.team.image_url} className={this.props.matchStatus && 'running-match'} />
                <div className={this.props.left ? 'pad-right' : 'pad-left'} >
                    <h6>{this.props.team.name}</h6>
                </div>
            </div>
        );
    }
}

export function SmallTeamDiv(props) {
    return (
        <div className={`team ${props.left ? 'ta-left' : 'ta-right'} ${props.left && 'fd-reverse'} ${(props.matchStatus !== 'finished' || props.winner === props.team.id) ? '' : 'loser'}`} style={{
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center'
        }} >
            <img src={props.team.image_url} className={props.matchStatus && 'running-match'} style={{
                maxMidth: '5rem',
                maxHeight: '5rem'
            }} />
            <div className={props.left ? 'pad-right' : 'pad-left'} >
                <h6>{props.team.acronym}</h6>
            </div>
        </div>
    );
}