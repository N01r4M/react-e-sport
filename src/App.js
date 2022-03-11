import { Route, Routes } from 'react-router-dom';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarEparis from './components/elements/Navbar';
import Homepage from './components/Homepage';
import LeaguesList from './components/videogames/LeaguesList';
import LeagueSchedule from './components/videogames/LeagueSchedule';
import LeagueTeams from './components/videogames/LeagueTeams';
import TeamInfo from './components/videogames/TeamInfo';
import MatchInfo from './components/videogames/MatchInfo';
import ChampionsList from './components/videogames/ChampionsList';
import Login from './components/user/Login';
import Logout from './components/user/Logout';
import Home from './components/user/Home';
import Register from './components/user/Register';
import { useEffect, useState } from 'react';
import apiDB from './apiDB';

export default function App() {
    const parseJWT = (token) => {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64)).sub;
    }, 
    idUser = parseInt(parseJWT(sessionStorage.getItem('token'))),
    login = sessionStorage.getItem('token') !== null,
    [coins, setCoins] = useState()

    useEffect(() => {
        login && apiDB.get(`/users/${idUser}`)
            .then(res => {
                setCoins(res.data.coins)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <NavbarEparis idUser={idUser} login={login} coins={coins} />
            <Routes>
                <Route path="/" element={login ? <Home idUser={idUser} coins={coins} /> : <Homepage />} />
                <Route path="/videogames/:slug/leagues/:page" element={<LeaguesList />} />
                <Route path="/leagues/:id/schedule" element={<LeagueSchedule />} />
                <Route path="/leagues/:id/teams" element={<LeagueTeams />} />
                <Route path="/teams/:slug" element={<TeamInfo idUser={idUser} />} />
                <Route path="/matches/:slug" element={<MatchInfo />} />
                <Route path="/:slug/champions/:page" element={<ChampionsList />} />
                <Route path="/:slug/heroes/:page" element={<ChampionsList />} />
                <Route path="/login" element={<Login idUser={idUser} login={login} coins={coins} />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    )
}
