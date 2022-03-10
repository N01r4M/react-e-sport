import React from "react"
import { Link } from "react-router-dom";
import Coins from "./Coins";

export default class NavbarEparis extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <>
                <nav role="navigation">
                    <ul>
                        <li><h3>Par'e-sportifs</h3></li>
                        <li><Link to={`/`} state={{ coins: this.props.coins, idUser: this.props.idUser }}>Accueil</Link></li>
                        <li>
                            <Link to={`/videogames/league-of-legends/leagues/1`}>League of Legends</Link>
                            <ul>
                                <li><Link to={`/videogames/league-of-legends/leagues/1`}>Leagues</Link></li>
                                <li><Link to={`/lol/champions/1`}>Champions</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to={`/videogames/dota-2/leagues/1`}>Dota 2</Link>
                            <ul>
                                <li><Link to={`/videogames/dota-2/leagues/1`}>Leagues</Link></li>
                                <li><Link to={`/dota2/heroes/1`}>Héros</Link></li>
                            </ul>
                        </li>

                        {
                            this.props.login && <li className="ms-auto d-flex flex-wrap align-content-center" style={{ paddingRight: '1.7rem' }}><h5 style={{ padding: '0 .8rem' }}>{this.props.coins}</h5> <Coins size="25" /></li>
                        }

                        <li className={!this.props.login && 'ms-auto'}>
                            {
                                this.props.login ? <Link to={`/logout`}>Se déconnecter</Link> : <Link to={`/login`}>Se connecter</Link>
                            }
                        </li>
                    </ul>
                </nav>
            </>
        );
    }
}