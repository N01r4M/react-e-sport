import React from "react"
import { Link } from "react-router-dom"
import ApiPS from "../../apiPS"
import LoadingPage from "../LoadingPage"

export default class ListVideogames extends React.Component {
    constructor(props) {
        super()
        this.state = {}
    }

    componentDidMount() {
        ApiPS.get(`videogames`)
        .then(res => {
            const videogames = res.data
            this.setState({ videogames })
        })
    }

    render() {
        if ("videogames" in this.state) {
            return (
                <>
                    <nav className="crumbs">
                        <ol>
                            <li className="crumb">Accueil</li>
                        </ol>
                    </nav>

                    <h1>Liste des jeux</h1>
                    <ul>
                        {
                            this.state.videogames.map(videogame =>
                                <li key={videogame.id}>
                                    <Link to={`/videogames/${videogame.id}`}>{videogame.name}</Link>
                                </li>
                            )
                        }
                    </ul>
                </>
            );
        } else {
            return (
                <LoadingPage />
            )
        }
    }
}