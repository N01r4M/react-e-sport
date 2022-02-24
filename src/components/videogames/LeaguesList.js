import React from "react"
import withRouter from "../functions/withRouter";
import apiPs from "../../apiPS";
import LoadingPage from "../LoadingPage";
import { Link } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";


class LeaguesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.slug = props.params.slug
        this.page = parseInt(props.params.page)
    }

    getData = () => {
        apiPs.get(`videogames/${this.slug}`)
        .then(res => {
            const videogame = res.data
            let nbPages = res.data.leagues.length / 15
            
            if (!Number.isInteger(nbPages)) {
                nbPages = parseInt(nbPages) + 1
            }
            
            this.setState({ videogame })
            this.setState({ nbPages })
            
            apiPs.get(`videogames/${this.slug}/leagues?sort=name&page=${this.page}&per_page=15`)
            .then(res => {
                const leagues = res.data
                this.setState({ leagues })
            })
        })
    }

    componentDidMount() {
        this.getData()
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.slug !== prevProps.params.slug) {
            delete this.state.videogame
            delete this.state.nbPages
            delete this.state.leagues

            this.slug = this.props.params.slug
            this.page = parseInt(this.props.params.page)
            
            this.getData()
        }
    }

    
    render() {
        if ("videogame" in this.state && "leagues" in this.state) {
            let paginationItems = []
            for (let nb = 1; nb <= this.state.nbPages; nb++) {
                paginationItems.push(<Pagination.Item key={nb} active={nb === this.page} href={`/videogames/${this.slug}/leagues/${nb}`}>{nb}</Pagination.Item>)
                
            }

            return (
                <>
                    <h1>{this.state.videogame.name}</h1>
                    <h2>Liste des leagues</h2>
                    <div className="list-cards">
                        {
                            this.state.leagues.map(league => 
                                <div key={ league.id } className="card shadow rounded">
                                    <img src={league.image_url} className="card-img-top" alt="Logo league" />
                                    <div className="card-body">
                                        <h5 className="card-title">{ league.name }</h5>
                                        <div className="d-flex justify-content-around">
                                            <Link to={`/leagues/${league.slug}/teams`} className="btn btn-primary">Equipes</Link>
                                            <Link to={`/leagues/${league.slug}/schedule`} className="btn btn-primary">Programme</Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                    <div className="d-flex justify-content-center">
                        <Pagination>
                            <Pagination.Prev disabled={1 === this.page} href={`/videogames/${this.slug}/leagues/${this.page - 1}`} />
                            {paginationItems}
                            <Pagination.Next disabled={this.state.nbPages === this.page} href={`/videogames/${this.slug}/leagues/${this.page + 1}`} />
                        </Pagination>
                    </div>
                </>
            );
        } else {
            return (
                <LoadingPage />
            );
        }
    }
}

export default withRouter(LeaguesList)