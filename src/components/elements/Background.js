import React from "react";

export default class BgLogo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="bg-team" style={{ backgroundImage: `url(${this.props.image})` }}></div>
        );
    }
}