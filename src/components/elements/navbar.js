import React from "react"
import { Link } from "react-router-dom";
import apiDB from "../../apiDB";

export default class NavbarEparis extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.parseJWT = (token) => {
            if (!token) { return; }
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64)).sub;
        }

        this.idUser = this.parseJWT(sessionStorage.getItem('token'))
        this.login = sessionStorage.getItem('token') !== null
    }


    componentDidMount() {
        this.login && apiDB.get(`/users/${this.idUser}`)
            .then(res => {
                this.setState({coins: res.data.coins})
            })
            .catch(err => {
                console.log(err)
            })
    }

    
    render() {
        return (
            <>
                <nav role="navigation">
                    <ul>
                        <li><h3>E-paris</h3></li>
                        <li><Link to={this.login ? `/user/homepage` : `/`}>Accueil</Link></li>
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
                            this.login && <li><Link to={`/user/profile`}>Mon profil</Link></li>
                        }

                        {
                            this.login && <li className="ms-auto d-flex flex-wrap align-content-center" style={{ paddingRight: '1.7rem' }}><h5 style={{ padding: '0 .8rem' }}>{this.state.coins}</h5> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-coin icoins" viewBox="0 0 16 16">
                                <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                            </svg></li>
                        }

                        <li className={!this.login && 'ms-auto'}>
                            {
                                this.login ? <Link to={`/logout`}>Se déconnecter</Link> : <Link to={`/login`}>Se connecter</Link>
                            }
                        </li>
                    </ul>
                </nav>
            </>
        );
    }
}