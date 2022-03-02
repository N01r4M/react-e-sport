import { Route, Routes } from 'react-router-dom';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarNotLogin from './components/elements/Navbar';
import Homepage from './components/Homepage';
import LeaguesList from './components/videogames/LeaguesList';
import LeagueSchedule from './components/videogames/LeagueSchedule';
import LeagueTeams from './components/videogames/LeagueTeams';
import TeamInfo from './components/videogames/TeamInfo';
import MatchInfo from './components/videogames/MatchInfo';
import ChampionsList from './components/videogames/ChampionsList';
import Login from './components/user/Login';
import Home from './components/user/Home';
import Profile from './components/user/Profile';
import Register from './components/user/Register';

export default function App() {
    return (
        <>
            <NavbarNotLogin />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/videogames/:slug/leagues/:page" element={<LeaguesList />} />
                <Route path="/leagues/:id/schedule" element={<LeagueSchedule />} />
                <Route path="/leagues/:id/teams" element={<LeagueTeams />} />
                <Route path="/teams/:slug" element={<TeamInfo />} />
                <Route path="/matches/:slug" element={<MatchInfo />} />
                <Route path="/:slug/champions/:page" element={<ChampionsList />} />
                <Route path="/:slug/heroes/:page" element={<ChampionsList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user/homepage" element={<Home />} />
                <Route path="/user/profile" element={<Profile />} />
                <Route path="/user/register" element={<Register />} />
            </Routes>
        </>
    )
}
