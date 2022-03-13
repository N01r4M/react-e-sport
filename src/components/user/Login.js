import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react"
import { Navigate } from "react-router-dom"
import apiDB from "../../apiDB";
import { BigLinkButton } from "../elements/Button";
import isSameDay from "../functions/isSameDay";

export default function Login(props) {
    if (props.login) {
        return <Navigate to={`/`} state={{ coins: props.coins, idUser: props.idUser }} replace={true} />
    }

    return (
        <>
            <BigLinkButton url={`/register`} txt="Rejoins la communauté des e-parieurs !" />
          
            <div className="form-div rounded shadow">
                <h2>Connexion</h2>

                <Formik
                    initialValues={{ username: "", password: "" }}
                    validate={values => {
                        const errors = {}

                        if (!values.email) {
                            errors.email = 'Champs obligatoire'
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Format de l\'adresse mail incorrect';
                        }

                        if (!values.password) {
                            errors.password = "Champs obligatoire"
                        } /*else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/i.test(values.password)) {
                            errors.password = "Le mot de passe doit comprendre minimum 1 minuscule, 1 majuscule, 1 chiffre, un caractère parmi !@#$%^&* et 8 caractères au total"
                        }*/
                        return errors
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        apiDB.post('/login', {
                            "email": values.email,
                            "password": values.password
                        })
                            .then(res => {
                                const   status = JSON.stringify(res.status),
                                        token = JSON.stringify(res.data.accessToken),
                                        coins = JSON.stringify(res.data.user.coins),
                                        id = JSON.stringify(res.data.user.id),
                                        lastLogInAt = res.data.user.lastLogInAt
                                    
                                if (status === '200') {
                                    if (!isSameDay(new Date(lastLogInAt), new Date())) {
                                        apiDB.patch(`/users/${id}`, {
                                            "coins": parseInt(coins) + 10,
                                            "lastLogInAt": new Date()
                                        })
                                        .then(res => {
                                            sessionStorage.setItem('token', token)
                                            window.location.reload()
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })
                                    } else {
                                        sessionStorage.setItem('token', token)
                                        window.location.reload()
                                    }
                                } else {
                                    console.log(`Status HTTP : ${status}`)                                    
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        setSubmitting(false)
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-3 d-flex justify-content-center flex-column">
                                <label htmlFor="email" ><h5>Adresse mail</h5></label>
                                <Field type="email" name="email" className="align-self-center w-80" autocomplete="email" />
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>

                            <div className="mb-3 d-flex justify-content-center flex-column">
                                <label htmlFor="password" ><h5>Mot de passe</h5></label>
                                <Field type="password" name="password" className="align-self-center w-80" autocomplete="current-password" />
                                <ErrorMessage name="password" component="div" className="error" />
                            </div>

                            <button type="submit" className="submit-button">Valider</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}