import React from "react";
import LinkButton from "./Button";

export default class TeamCard extends React.Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div key={this.props.team.id} className= "card shadow rounded">
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