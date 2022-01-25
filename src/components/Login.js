import { Formik } from "formik";
import React from "react";
import DB from "../apiDB";

class Login extends React.Component {
    render() {
        return (
            <>
                <h1>Connexion</h1>
                <Formik
                    initialValues={{
                        username: "",
                        password: ""
                    }}
                    validate={values => {
                        const errors = {};
                        if (!values.username) {
                            errors.username = "Champs requis";
                        }
                        if (!values.password) {
                            errors.password = "Champs requis"
                        }
                        return errors;
                    }}
                    onSubmit={values => {
                        DB.get(`users?username=${values.username}&password=${values.password}`)
                        .then(res => {
                            res.data.length === 1 ? console.log("OK") : console.error("KO")
                        })
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="username">Identifiant</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {errors.username && touched.username && errors.username}
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {errors.password && touched.password && errors.password}
                            <button type="submit" disabled={isSubmitting}>
                                Se connecter
                            </button>
                        </form>
                    )}
                </Formik>
            </>
        );
    }
}

export default Login;