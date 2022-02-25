import React from "react";
import { Link } from "react-router-dom";

export default class LinkButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Link to={this.props.url} className="button button-link">{this.props.txt}</Link>
        );
    }
}