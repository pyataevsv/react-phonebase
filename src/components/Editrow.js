import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('Required'),
    lastName: Yup.string()
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    phone: Yup.string()
        .required('Required')
        .matches(/^\(\d\d\d\)\d\d\d-\d\d\d\d$/, 'Must match (xxx)xxx-xxxx'),
})

export default function Editrow(props) {


    const init = (props.editItem) ? {
        firstName: props.editItem.firstName,
        lastName: props.editItem.lastName,
        email: props.editItem.email,
        phone: props.editItem.phone
    } : {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        }


    return (props.addMode) ?
        (
            <Formik
                enableReinitialize
                initialValues={init}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    if (!props.editItem) {
                        props.onSubmit(values)
                    } else {
                        props.onEditItem(Object.assign({}, props.editItem, values))
                    }
                }}
            >{({ errors, touched }) => (
                <div className='level'>
                    <div className="level-left"></div>
                    <div className="level-right">

                        <Form>
                            <div className="field has-addons">

                                <div className="control">
                                    <Field className={errors.firstName && touched.firstName ? 'input is-danger' : 'input'} name="firstName" type="text" placeholder="Nikita" />
                                    {errors.firstName && touched.firstName ? (<div className='err'>{errors.firstName}</div>) : null}
                                </div>
                                <div className="control">
                                    <Field className={errors.lastName && touched.lastName ? 'input is-danger' : 'input'} name="lastName" placeholder="Shevlyakov" />
                                    {errors.lastName && touched.lastName ? (<div className='err'>{errors.lastName}</div>) : null}
                                </div>
                                <div className="control">
                                    <Field className={errors.email && touched.email ? 'input is-danger' : 'input'} name="email" type="text" placeholder="shevlyakov.n@future-group.ru" />
                                    {errors.email && touched.email ? (<div className='err'>{errors.email}</div>) : null}
                                </div>
                                <div className="control">
                                    <Field name='phone'>
                                        {({ field, form: { touched, errors } }) => (
                                            <div>
                                                <InputMask className={errors.phone && touched.phone ? 'input is-danger' : 'input'}
                                                    type="text"
                                                    placeholder="(495)409-0179"
                                                    {...field}
                                                    mask="(999)999-9999"
                                                    maskChar=" " />
                                                {errors.phone && touched.phone ? (<div className='err'>{errors.phone}</div>) : null}
                                            </div>
                                        )}
                                    </Field>

                                </div>
                                <div className="control">
                                    {props.editItem ?
                                        <button type="submit" className="button is-warning">Edit</button> :
                                        <button type="submit" className="button is-info">Add</button>}

                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            )}


            </Formik >)
        : null

}
