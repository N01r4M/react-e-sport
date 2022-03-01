import React from "react";
import { Link } from "react-router-dom";

export default class LinkButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.match);
        return (
            <Link to={this.props.url} state={{ match: this.props.match }} className="button button-link">{this.props.txt}</Link>
        );
    }
}

export class BetButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <btn className="button">Parier</btn>
        );
    }
}