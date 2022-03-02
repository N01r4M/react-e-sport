import { useLocation } from "react-router-dom";
import BgLogo from "../elements/Background";

export default function ChampionInfo(props) {
    const   location = useLocation(),
            champion = location.state.params
            

    //console.log(champion);

    return (
        <>
            <BgLogo image={champion.image_url} />

            <h1>{champion.name}</h1>

            <div className="row">
                <div 
                    className="col"
                    style={{
                        boxShadow: "inset 0 .625rem 1.25rem rgba(0,0,0,.2)",
                        padding: ".8rem",
                        margin: "1rem 5rem"
                    }}
                >
                    <h2>Informations générales</h2>
                    <ul>
                        <li>HP : {champion.hp}</li>
                        <li>Mana : {champion.mp}</li>
                        <li>Attack damage : {champion.attackdamage}</li>
                        <li>Armure : {champion.armor}</li>
                        <li>Attack range : {champion.attackrange}</li>
                    </ul>
                </div>

                <div 
                    className="col"
                    style={{
                        boxShadow: "inset 0 .625rem 1.25rem rgba(0,0,0,.2)",
                        padding: ".8rem",
                        margin: "1rem 5rem"
                    }}
                >
                    <h2>Informations sur les sorts</h2>
                </div>
            </div>
        </>
    );
}