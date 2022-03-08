import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import apiDB from "../../apiDB";

export default class LinkButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Link to={this.props.url} state={{ params: this.props.params }} className="button button-link">{this.props.txt}</Link>
        );
    }
}
export class BigLinkButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Link to={this.props.url} state={{ params: this.props.params }} className="button button-link big-button">{this.props.txt}</Link>
        );
    }
}

export class BetButton extends React.Component {
    constructor(props) {
        super(props)

        this.state={
            show: false
        }

        this.handleClose = () => this.setState({ show: false });
        this.handleShow = () => this.setState({ show: true });
    }

    componentDidMount() {
        apiDB.get(`/bets?idUser=${this.props.idUser}&idMatch=${this.props.match}`)
        .then(res => {
            if (res.data.length !== 0) {
                this.setState({ bet: res.data[0] })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    
    render() {
        return (
            <>
                <btn className="button" onClick={this.handleShow}>Parier</btn>

                <Modal
                    size="lg"
                    show={this.state.show}
                    onHide={this.handleClose}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Parie et tente de doubler ta mise !</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{ betTeam1: (this.state.bet && this.state.bet.idTeam === this.props.team1.id) ? this.state.bet.coins : "", betTeam2: (this.state.bet && this.state.bet.idTeam === this.props.team2.id) ? this.state.bet.coins : ""}}
                            validate={values => {
                                const errors = {}

                                if (!values.betTeam1 && !values.betTeam2) {
                                    errors.betTeam1 = "Saisis au moins une valeur pour une équipe"
                                }

                                if (values.betTeam1 && values.betTeam2) {
                                    errors.betTeam2 = "Tu ne peux parier que pour une seule équipe"
                                }

                                if (values.betTeam1 > this.props.coins) {
                                    errors.betTeam1 = "Tu n'as pas assez de coins"
                                } 
                                
                                if (values.betTeam1 <= 0 && values.betTeam1 !== "") {
                                    errors.betTeam1 = "Tu dois parier une somme supérieure à 1"
                                }

                                if (values.betTeam2 > this.props.coins) {
                                    errors.betTeam2 = "Tu n'as pas assez de coins"
                                } 
                                
                                if (values.betTeam2 <= 0 && values.betTeam2 !== "") {
                                    errors.betTeam2 = "Tu dois parier une somme supérieure à 1"
                                }

                                return errors
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                if (this.state.bet) {
                                    apiDB.put(`/bets/${this.state.bet.id}`, {
                                        "idUser": this.props.idUser,
                                        "idTeam": values.betTeam1 !== "" ? this.props.team1.id : this.props.team2.id,
                                        "idMatch": this.props.match,
                                        "coins": values.betTeam1 !== "" ? values.betTeam1 : values.betTeam2
                                    })
                                        .then(res => {
                                            const status = JSON.stringify(res.status)

                                            if (status === '200') {
                                                const bet = values.betTeam1 !== "" ? values.betTeam1 : values.betTeam2

                                                apiDB.patch(`/users/${this.props.idUser}`, {
                                                    'coins': this.state.bet.coins > bet ? this.props.coins - (this.state.bet.coins - bet) : this.props.coins - (bet - this.state.bet.coins)
                                                })
                                                    .then(res => {
                                                        const status = JSON.stringify(res.status)

                                                        if (status === '200') {
                                                            window.location.reload()
                                                        } else {
                                                            console.log(`Status HTTP : ${status}`)
                                                        }
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                    })
                                            } else {
                                                console.log(`Status HTTP : ${status}`);
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })
                                } else {
                                    apiDB.post(`/bets`, {
                                        "idUser": this.props.idUser,
                                        "idTeam": values.betTeam1 !== "" ? this.props.team1.id : this.props.team2.id,
                                        "idMatch": this.props.match,
                                        "coins": values.betTeam1 !== "" ? values.betTeam1 : values.betTeam2
                                    })
                                        .then(res => {
                                            const status = JSON.stringify(res.status)

                                            if (status === '201') {
                                                const bet = values.betTeam1 !== "" ? values.betTeam1 : values.betTeam2

                                                apiDB.patch(`/users/${this.props.idUser}`, {
                                                    'coins': this.props.coins - bet
                                                })
                                                    .then(res => {
                                                        const status = JSON.stringify(res.status)

                                                        if (status === '200') {
                                                            window.location.reload()
                                                        } else {
                                                            console.log(`Status HTTP : ${status}`)
                                                        }
                                                    })
                                            } else {
                                                console.log(`Status HTTP : ${status}`);
                                            }
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })
                                }
                                setSubmitting(false)
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="mb-3 d-flex justify-content-evenly">
                                        <div className="mb-3 d-flex flex-column align-items-center ">
                                            <img src={this.props.team1.image_url} style={{
                                                width: '100px',
                                                height: '100px'
                                            }} />
                                            <label htmlFor="betTeam1">{this.props.team1.name}</label>
                                            <div>
                                                <Field type="number" name="betTeam1" className="align-self-center" style={{ width: '70px', marginRight: '.3rem' }} /><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-coin icoins" viewBox="0 0 16 16">
                                                    <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                                                </svg>
                                            </div>
                                            <ErrorMessage name="betTeam1" component="div" className="error" />
                                        </div>

                                        <div className="mb-3 d-flex flex-column align-items-center">
                                            <img src={this.props.team2.image_url} style={{
                                                width: '100px',
                                                height: '100px'
                                            }} />
                                            <label htmlFor="betTeam1">{this.props.team2.name}</label>
                                            <div>
                                                <Field type="number" name="betTeam2" className="align-self-center" style={{ width: '70px', marginRight: '.3rem' }} /><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-coin icoins" viewBox="0 0 16 16">
                                                    <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z" />
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                                                </svg>
                                            </div>
                                            <ErrorMessage name="betTeam2" component="div" className="error" />
                                        </div>
                                    </div>

                                    <button type="submit" className="submit-button float-end">Parier</button>
                                </Form>
                            )}
                        </Formik>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export class SubmitButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <btn className="submit-button" type={this.props.type}>{this.props.txt}</btn>
        );
    }
}