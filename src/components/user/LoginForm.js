import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const LoginForm = () => (
    <div>
        <h1>Connectez-vous !</h1>
        <section>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Champs requis';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'L\'adresse saisie est incorrecte';
                    } 
                    
                    if (!values.password) {
                        errors.password = 'Champs requis'; 
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <label htmlFor='email'>Adresse mail</label>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />

                        <label htmlFor='password'>Mot de passe</label>
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />

                        <button type="submit" disabled={isSubmitting}>
                            Se connecter
                        </button>
                    </Form>
                )}
            </Formik>
        </section>
    </div>
);

export default LoginForm;