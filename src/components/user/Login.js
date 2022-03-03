import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react"
import apiDB from "../../apiDB";
import LinkButton from "../elements/Button";

export default function Login() {
    return (
        <>
            <LinkButton url={`/register`} txt="Rejoins la communauté des e-parieurs !" />
          
            <div className="rounded shadow" style={{
                margin: "6rem auto",
                border: "1px solid black",
                padding: "1.25rem",
                width: "40%"
            }}>
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
                                        token = JSON.stringify(res.data.accessToken)
                                    
                                if (status === '200') {
                                    sessionStorage.setItem('token', token)
                                    window.location.replace("http://localhost:3001/user/homepage")
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
                                <label htmlFor="email" >Adresse mail</label>
                                <Field type="email" name="email" className="align-self-center" autocomplete="email" style={{ width: "80%" }} />
                                <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                            </div>

                            <div className="mb-3 d-flex justify-content-center flex-column">
                                <label htmlFor="password" >Mot de passe</label>
                                <Field type="password" name="password" className="align-self-center" autocomplete="current-password" style={{ width: "80%" }} />
                                <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                            </div>

                            <button type="submit" className="submit-button">Valider</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}