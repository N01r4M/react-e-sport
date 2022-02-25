import React from "react"
import LinkButton from "./Button";

export default class TeamCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div key={this.props.league.id} className="card shadow rounded">
                <img src={this.props.league.image_url} className="card-img-top" alt="Logo league" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.league.name}</h5>
                    <div className="d-flex justify-content-around">
                        <LinkButton url={`/leagues/${this.props.league.slug}/team`} txt="Equipes" />
                        <LinkButton url={`/leagues/${this.props.league.id}/schedule`} txt="Programme" />
                    </div>
                </div>
            </div>
        );
    }
}