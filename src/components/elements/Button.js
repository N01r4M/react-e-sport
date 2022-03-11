import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import apiDB from "../../apiDB";
import Coins from "./Coins";

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
            show: false,
            coins1: 0,
            coins2: 0
        }

        this.handleClose = () => this.setState({ show: false });
        this.handleShow = () => this.setState({ show: true });
    }

    componentDidMount() {
        apiDB.get(`/bets?idUser=${this.props.idUser}&match.id=${this.props.match.id}`)
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
                                        "createdAt": new Date(),
                                        "idUser": this.props.idUser,
                                        "idTeam": values.betTeam1 !== "" ? this.props.team1.id : this.props.team2.id,
                                        "match": this.props.match,
                                        "coins": values.betTeam1 !== "" ? values.betTeam1 : values.betTeam2
                                    })
                                        .then(res => {
                                            const status = JSON.stringify(res.status)

                                            if (status === '200') {
                                                const bet = values.betTeam1 !== "" ? values.betTeam1 : values.betTeam2

                                                apiDB.patch(`/users/${this.props.idUser}`, {
                                                    'coins': this.state.bet.coins > bet ? this.props.coins + (this.state.bet.coins - bet) : this.props.coins - (bet - this.state.bet.coins)
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
                                        "createdAt": new Date(),
                                        "idUser": this.props.idUser,
                                        "idTeam": values.betTeam1 !== "" ? this.props.team1.id : this.props.team2.id,
                                        "match": this.props.match,
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
                                            <img src={this.props.team1.image_url} className="w-100-px h-100-px" />
                                            <label htmlFor="betTeam1">{this.props.team1.name}</label>
                                            <div>
                                                <Field type="number" name="betTeam1" className="align-self-center field-bet" /><Coins size="22" />
                                            </div>
                                            <ErrorMessage name="betTeam1" component="div" className="error" />
                                        </div>

                                        <div className="mb-3 d-flex flex-column align-items-center">
                                            <img src={this.props.team2.image_url} className="w-100-px h-100-px" />
                                            <label htmlFor="betTeam1">{this.props.team2.name}</label>
                                            <div>
                                                <Field type="number" name="betTeam2" className="align-self-center field-bet" /><Coins size="22" />
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