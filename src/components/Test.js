import axios from "axios";
import React from "react";
import API from '../apiPS';


class Test extends React.Component {
    state = {
        videogames: []
    }

    componentDidMount() {
        API.get(`videogames`)
        .then(res => {
            const videogames = res.data;
            this.setState({ videogames });
        })
    }

    render() {
        return (
            <>
                <ul>
                    {this.state.videogames.map(videogame => <li>{videogame.name}</li>)}
                </ul>
            </>
        );
    }
}

export default Test;