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
                                <li><Link to={`/lol/champions/1`}>Champions</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to={`/videogames/dota2/leagues/1`}>Dota 2</Link>
                            <ul>
                                <li><Link to={`/videogames/dota-2/leagues/1`}>Leagues</Link></li>
                                <li><Link to={`/dota2/heroes/1`}>Héros</Link></li>
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