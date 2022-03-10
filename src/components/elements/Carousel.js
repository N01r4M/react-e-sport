import Carousel from "react-bootstrap/Carousel"
import LeagueCard, { MatchCardHome } from "./Card"

export default function CarouselFav(props) {
    return (
        <Carousel>
            {
                props.leagues.map(league => 
                    <Carousel.Item>
                        <LeagueCard league={league} fav={true} idUser={props.idUser} />
                    </Carousel.Item>
                )
            }
        </Carousel>
    )
}

export function CarouselMatch(props) {
    return (
        <Carousel>
            {
                props.matches.map(match => 
                    <Carousel.Item>
                        <MatchCardHome match={match} idUser={props.idUser} coins={props.coins} />
                    </Carousel.Item>    
                )
            }
        </Carousel>
    )
}