import React from "react"
import { Link } from "react-router-dom";

export default class NavbarNotLogin extends React.Component {
    render() {
        return (
            <>
                <nav role="navigation">
                    <ul>
                        <li><h3>E-paris</h3></li>
                        <li><Link to={`/`}>Accueil</Link></li>
                        <li>
                            <Link to={`/videogames/league-of-legends/leagues/1`}>League of Legends</Link>
                            <ul>
                                <li><Link to={`/videogames/league-of-legends/leagues/1`}>Leagues</Link></li>
                                <li><Link to={`/league-of-legends/champions/1`}>Champions</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to={`/videogames/rl/leagues/1`}>Rocket League</Link>
                            <ul>
                                <li><Link to={`/videogames/rl/leagues/1`}>Leagues</Link></li>
                            </ul>
                        </li>
                        <li className="ms-auto">
                            <Link to={`/login`}>Se connecter</Link>
                        </li>
                    </ul>
                </nav>
            </>
        );
    }
}