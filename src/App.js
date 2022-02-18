import { Route, Routes } from 'react-router-dom';
import './App.css';
import LeagueInfo from './components/videogames/LeagueInfo';
import LeaguesList from './components/videogames/LeaguesList';
import Login from './components/user/Login';
import MatchInfo from './components/videogames/MatchInfo';
import TeamInfo from './components/videogames/TeamInfo';
import TournamentInfo from './components/videogames/TournamentInfo';
import VideogamesList from './components/videogames/VideogamesList';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<VideogamesList />} />
            <Route path="/videogames" element={<VideogamesList />} />
            <Route path="/videogames/:id" element={<LeaguesList />} />
            <Route path="/leagues/:id" element={<LeagueInfo />} />
            <Route path="/teams/:id" element={<TeamInfo />} />
            <Route path="/tournaments/:id" element={<TournamentInfo />} />
            <Route path="/match/:id" element={<MatchInfo />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}
