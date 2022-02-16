import { Route, Routes } from 'react-router-dom';
import './App.css';
import ListVideogames from './components/ListVideogames';
import Login from './components/user/Login';
import VideogameInfo from './components/VideogameInfo';
import LeagueInfo from './components/LeagueInfo';
import LeagueMatches from './components/LeagueMatches';
import MatchInfo from './components/MatchInfo';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<ListVideogames />} />
            <Route path="/videogames" element={<ListVideogames />} />
            <Route path="/videogames/:id" element={<VideogameInfo />} />
            <Route path="/leagues/:id" element={<LeagueInfo />} />
            <Route path="/leagues/:id/matches/past" element={<LeagueMatches />} />
            <Route path="/leagues/:id/matches/running" element={<LeagueMatches />} />
            <Route path="/leagues/:id/matches/upcoming" element={<LeagueMatches />} />
            <Route path="/leagues/:idLeague/matches/:idMatch" element={<MatchInfo />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}
