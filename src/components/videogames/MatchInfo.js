import { useLocation } from "react-router-dom";
import Score from "../elements/Score";
import TeamDiv from "../elements/TeamDiv";
import formatHour from "../functions/formatsDateTime";

export default function MatchInfo(props) {
    const   location = useLocation(),
            match = location.state.match

    //console.log(match);

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
                    <h2>Informations match</h2>
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
                        </div>
                    </div>

                    <p><b>Heure de début :</b> {formatHour(match.begin_at)} (heure française)</p>
                </div>
                <div
                    style={{
                        boxShadow: "inset 0 .625rem 1.25rem rgba(0,0,0,.2)",
                        padding: ".8rem",
                        margin: "1rem 0"
                    }}
                >
                    <h2>Informations sur les paris</h2>
                </div>
            </div>

            <div>
                <iframe
                    src={match.live_embed_url.concat('', "&parent=localhost&autoplay=true&muted=true")}
                    height="360"
                    width="640"
                    allowFullScreen={true}>
                </iframe>
            </div>
        </div>
    );
}