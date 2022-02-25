import React from "react";
import TeamDiv from "../elements/TeamDiv";
import Score from "./Score";

export default class TeamScore extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className="teams-score">
                <TeamDiv
                    matchStatus={this.props.match.status}
                    winner={this.props.match.winner_id}
                    team={this.props.match.opponents[0].opponent}
                    left={true}
                />

                <Score
                    status={this.props.match.status}
                    team1={this.props.match.results[0].score}
                    team2={this.props.match.results[1].score}
                />

                <TeamDiv
                    matchStatus={this.props.match.status}
                    winner={this.props.match.winner_id}
                    team={this.props.match.opponents[1].opponent}
                    left={false}
                />
            </div>
        );
    }
}