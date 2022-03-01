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