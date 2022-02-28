import React from "react";

export default class PlayerCard extends React.Component {
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