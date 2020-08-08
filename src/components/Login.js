import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { firebaseConfig } from '../firebase'

firebase.initializeApp(firebaseConfig)

const SignupSchema = Yup.object().shape({
    pass: Yup.string()
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
});

export default function Login(props) {
    const [loginData, setLoginData] = useState(null)
    const [loginError, setLoginError] = useState(false)

    if (loginData) {
        firebase.auth().signInWithEmailAndPassword(loginData.email, loginData.pass)
            .then(res => props.showApp())
            .catch(function (error) {
                setLoginError(true)
                setLoginData(null)
            })
    }



    return (
        <div className='login-wrapper'>
            <div className='card login-box'>
                <h3 className="is-size-3">Log in</h3>
                <span className='is-size-7'>Use <i>lookingfor@awsomejob.com, frontend</i></span>

                <Formik
                    initialValues={{
                        email: '',
                        pass: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        setLoginData(values)
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="field mb-5">
                                <div className="control has-icons-left has-icons-right ">
                                    <Field className="input is-medium" type="text" placeholder="Email" name='email' />
                                    {errors.email && touched.email ? (
                                        <div className="err">{errors.email}</div>
                                    ) : null}
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                    {/* <span className="icon is-small is-right">
                                        <i className="fas fa-check"></i>
                                    </span> */}
                                </div>
                            </div>
                            <div className="field mb-5">
                                <div className="control has-icons-left">
                                    <Field className="input is-medium" type="password" placeholder="Password" name='pass' />
                                    {errors.pass && touched.pass ? (
                                        <div className="err">{errors.pass}</div>
                                    ) : null}
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-success is-medium">
                                        Login
                                            </button>
                                    {loginError ? (
                                        <div className="err">Wrong email or password</div>
                                    ) : null}
                                </div>

                            </div>
                        </Form>
                    )}</Formik>
            </div>
        </div>


    )
}
