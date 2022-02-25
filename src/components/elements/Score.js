import React from "react";

export default class Score extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="score">{
                this.props.status !== 'finished' ? 'VS' : `${this.props.team1} - ${this.props.team2}`
            }</div>
        );
    }
}