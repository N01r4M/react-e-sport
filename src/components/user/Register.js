import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react"
import apiDB from "../../apiDB";
import LinkButton from "../elements/Button";

export default function Login() {
    return (
        <>
            <LinkButton url={`/login`} txt="Déjà e-parieur ? Connecte-toi !" />

            <div className="rounded shadow" style={{
                margin: "6rem auto",
                border: "1px solid black",
                padding: "1.25rem",
                width: "40%"
            }}>
                <h2>Inscription</h2>

                <Formik
                    initialValues={{ username: "", email: "", password1: "", password2: "", firstName: "" }}
                    validate={values => {
                        const errors = {}

                        if (!values.username) {
                            errors.username = 'Champs obligatoire'
                        }
                        if (!values.firstName) {
                            errors.firstName = 'Champs obligatoire'
                        }

                        if (!values.email) {
                            errors.email = 'Champs obligatoire'
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Format de l\'adresse mail incorrect';
                        }

                        if (!values.password1) {
                            errors.password1 = "Champs obligatoire"
                        } /*else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/i.test(values.password)) {
                                errors.password = "Le mot de passe doit comprendre minimum 1 minuscule, 1 majuscule, 1 chiffre, un caractère parmi !@#$%^&* et 8 caractères au total"
                            }*/
                        if (!values.password2) {
                            errors.password2 = "Champs obligatoire"
                        }
                        if (values.password1 !== values.password2) {
                            errors.password2 = "Les mots de passe ne sont pas identiques"
                        }
                        return errors
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        apiDB.post('/users', {
                            "username": values.username,
                            "email": values.email,
                            "firstName": values.firstName,
                            "password": values.password1,
                            "coins": 100
                        })
                        .then(res => {
                            const   status = JSON.stringify(res.status),
                                    token = JSON.stringify(res.data.accessToken)

                            if (status === '201') {
                                sessionStorage.setItem('token', token)
                                window.location.replace("http://localhost:3001/user/homepage")
                            } else {
                                console.log(`Status HTTP : ${status}`)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        setSubmitting(false)
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-3 d-flex justify-content-center flex-column">
                                <label htmlFor="username" >Identifiant</label>
                                <Field type="text" name="username" className="align-self-center" style={{ width: "80%" }} />
                                <ErrorMessage name="username" component="div" style={{ color: 'red' }} />
                            </div>

                            <div className="mb-3 d-flex justify-content-center flex-column">
                                <label htmlFor="firstName" >Prénom</label>
                                <Field type="text" name="firstName" className="align-self-center" style={{ width: "80%" }} />
                                <ErrorMessage name="firstName" component="div" style={{ color: 'red' }} />
                            </div>

                            <div className="mb-3 d-flex justify-content-center flex-column">
                                <label htmlFor="email" >Adresse mail</label>
                                <Field type="email" name="email" className="align-self-center" autocomplete="email" style={{ width: "80%" }} />
                                <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                            </div>

                            <div className="mb-3 d-flex justify-content-center flex-column">
                                <label htmlFor="password1" >Mot de passe</label>
                                <Field type="password" name="password1" className="align-self-center" style={{ width: "80%" }} />
                                <ErrorMessage name="password1" component="div" style={{ color: 'red' }} />
                            </div>

                            <div className="mb-3 d-flex justify-content-center flex-column">
                                <label htmlFor="password2" >Confirmation du mot de passe</label>
                                <Field type="password" name="password2" className="align-self-center" style={{ width: "80%" }} />
                                <ErrorMessage name="password2" component="div" style={{ color: 'red' }} />
                            </div>

                            <button type="submit" className="submit-button">Valider</button>
                        </Form>
                    )}
                </Formik>
            </div>

        </>
    );
}