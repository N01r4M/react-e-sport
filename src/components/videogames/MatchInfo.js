import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import formatHour from "../functions/formatsDateTime";
import apiDB from "../../apiDB";
import Coins from "../elements/Coins"

export default function MatchInfo(props) {
    const   location = useLocation(),
            match = location.state.params.match,
            idUser = location.state.params.idUser,
            [coins1, setCoins1] = useState(0),
            [coins2, setCoins2] = useState(0),
            [betUser, setBetUser] = useState(null)

    console.log(idUser);

    useEffect(() => {
        apiDB.get(`/bets?match.id=${match.id}&idTeam=${match.opponents[0].opponent.id}`)
            .then(res => {
                res.data.map(bet =>
                    setCoins1(bet.coins + coins1)
                )
            })
            .catch(err => {
                console.log(err);
            })
        apiDB.get(`/bets?match.id=${match.id}&idTeam=${match.opponents[1].opponent.id}`)
            .then(res => {
                res.data.map(bet =>
                    setCoins2(bet.coins + coins2)
                )
            })
            .catch(err => {
                console.log(err);
            })
        apiDB.get(`/bets?idUser=${idUser}&match.id=${match.id}`)
            .then(res => {
                if (res.data.length !== 0) {
                    setBetUser(res.data[0])
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    

    return (
        <div 
            className="d-flex justify-content-around align-items-center" 
            style={{
                minHeight: "calc(100vh - 3.75rem)"
            }}
        >
            <div>
                <div
                    style={{
                        boxShadow: "inset 0 .625rem 1.25rem rgba(0,0,0,.2)",
                        padding: ".8rem",
                        margin: "1rem 0"
                    }}
                >
                    <h2>Informations sur le match</h2>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center"
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            <img
                                src={match.opponents[0].opponent.image_url}
                                style={{
                                    height: "3.125rem"
                                }}
                            />
                            <p>{match.opponents[0].opponent.acronym}</p>
                            <p>Total paris : {coins1} <Coins size="18" /></p>
                        </div>

                        <h3>{match.results[0].score} - {match.results[1].score}</h3>

                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            <img
                                src={match.opponents[1].opponent.image_url}
                                style={{
                                    height: "3.125rem"
                                }}
                            />
                            <p>{match.opponents[1].opponent.acronym}</p>
                            <p>Total paris : {coins2} <Coins size="18" /></p>
                        </div>
                    </div>

                    <p><b>Heure de début :</b> {formatHour(match.begin_at)} (heure française)</p>
                    {
                        (betUser === null || betUser.coins === 0) && <p>Vous n'avez pas misé pour ce match</p>
                    } 
                    {
                        (betUser !== null && betUser.coins !== 0) && <p>Votre mise pour ce match : {betUser.coins} <Coins size="18" /> en faveur de {betUser.idTeam === match.opponents[0].opponent.id ? match.opponents[0].opponent.name : match.opponents[1].opponent.name}</p>
                    }
                </div>
            </div>

            <div>
                <iframe
                    src={match.live_embed_url && match.live_embed_url.concat('', "&parent=localhost&autoplay=true&muted=true")}
                    height="720"
                    width="1280"
                    allowFullScreen={true}>
                </iframe>
            </div>
        </div>
    );
}