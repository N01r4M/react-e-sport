import React from "react";
import apiDB from "../../apiDB";
import Coins from "./Coins";

export default class TeamDiv extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            coins: 0
        }
    }
    
    componentDidMount() {
        apiDB.get(`/bets?match.id=${this.props.idMatch}&idTeam=${this.props.team.id}`)
        .then(res => {
            res.data.map(bet => 
                this.setState({ coins: this.state.coins + bet.coins })    
            )
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    render() {
        return (
            <>
                <div className={`team ${this.props.left ? 'ta-left' : 'ta-right'} ${this.props.left && 'fd-reverse'} ${(this.props.matchStatus !== 'finished' || this.props.winner === this.props.team.id) ? '' : 'loser'}`} >
                    <img src={this.props.team.image_url} className={this.props.matchStatus && 'running-match'} />
                    <div className={`d-flex align-items-center flex-column ${this.props.left ? 'pad-right' : 'pad-left'}`} >
                        <h6>{this.props.team.name}</h6>
                        <p>{this.state.coins} <Coins size="20" /> pariés</p>
                    </div>
                </div>
            </>
        );
    }
}

export function SmallTeamDiv(props) {
    return (
        <div className={`team d-flex flex-column align-items-center ${props.left ? 'ta-left' : 'ta-right'} ${props.left && 'fd-reverse'} ${(props.matchStatus !== 'finished' || props.winner === props.team.id) ? '' : 'loser'}`}>
            <img src={props.team.image_url} className={`mw-5 mh-5 ${props.matchStatus && 'running-match'}`} />
            <div className={props.left ? 'pad-right' : 'pad-left'} >
                <h6>{props.team.acronym}</h6>
            </div>
        </div>
    );
}