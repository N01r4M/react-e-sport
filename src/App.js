import { Route, Routes } from 'react-router-dom';
import './App.css';
import ListVideogames from './components/videogames/ListVideogames';
import Login from './components/user/Login';
import VideogameInfo from './components/videogames/VideogameInfo';
import LeagueInfo from './components/videogames/LeagueInfo';
import LeagueMatches from './components/videogames/LeagueMatches';
import MatchInfo from './components/videogames/MatchInfo';

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
