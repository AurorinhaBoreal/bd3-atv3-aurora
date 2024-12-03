import * as Yup from "yup";
import styles from './registerForm.module.css'
import { ErrorMessage, Field, Form, Formik } from "formik";
import Student from "../../types/Student";
import { db } from "../../utils/useFirebase";
import { addDoc, collection } from "firebase/firestore";


const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    cpf: Yup.string()
        .matches(/^[0-9]{11}$/, 'CPF must be valid!')
        .required('CPF is required'),
    rg: Yup.string()
        .matches(/^[0-9]{9,10}$/, 'RG must be valid!')
        .required('RG is required'),
    studentNumber: Yup.string()
        .matches(/^[0-9]{11}$/, 'Cellphone number must be exactly 11 digits')
        .required('Cellphone number is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    birthDate: Yup.date()
        .max(new Date(), 'Birth date cannot be in the future')
        .min(new Date(new Date().setFullYear(new Date().getFullYear() - 120)), 'Please enter a valid birth date')
        .required('Birth date is required')
        .test('age', 'You must be at least 18 years old', function (value) {
            const cutoff = new Date();
            cutoff.setFullYear(cutoff.getFullYear() - 18);
            return value && value <= cutoff;
        }),
    parentName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    parentNumber: Yup.string()
        .matches(/^[0-9]{11}$/, 'Cellphone number must be exactly 11 digits')
        .required('Cellphone number is required'),
});

const RegisterForm = () => {
    const initialValues: Student = {
        firstName: '',
        lastName: '',
        cpf: '',
        rg: '',
        studentNumber: '',
        parentName: '',
        parentNumber: '',
        email: '',
        birthDate: '',  
    }

    const StudentCollectionRef = collection(db, "activity-collection")

    const CreateUser = async (values: Student) => {
        await addDoc(StudentCollectionRef, {...values})
    }

    return (
        <div className={styles.divWrapper}>
            <h3 className={styles.formTitle}>
                Register your Student
            </h3>
            <Formik
                initialValues={initialValues}
                validationSchema={RegisterSchema}
                onSubmit={async (values, {resetForm}) => {
                    CreateUser(values)
                    resetForm()
                }}
            >
                <Form>
                    <div className={styles.doubleInputs}>
                        <div>
                            <ErrorMessage
                                component='p'
                                name="firstName"
                                className={styles.inputError}
                            />
                            <Field
                                className={styles.input}
                                id='firstName_input'
                                type='text'
                                name='firstName'
                                placeholder='First Name'
                            />
                        </div>
                        <div>
                            <ErrorMessage 
                                component='p'
                                name="lastName"
                                className={styles.inputError}    
                            />
                            <Field
                                className={styles.input}
                                id='lastName_input'
                                type='text'
                                name='lastName'
                                placeholder='Last Name'                            
                            />
                        </div>
                    </div>
                    <div className={styles.doubleInputs}>
                        <div>
                            <ErrorMessage
                                component='p'
                                name="cpf"
                                className={styles.inputError}
                            />
                            <Field
                                className={styles.input}
                                id='cpf_input'
                                type='text'
                                name='cpf'
                                placeholder='CPF'
                            />
                        </div>
                        <div>
                            <ErrorMessage 
                                component='p'
                                name="rg"
                                className={styles.inputError}    
                            />
                            <Field
                                className={styles.input}
                                id='rg_input'
                                type='text'
                                name='rg'
                                placeholder='RG'                            
                            />
                        </div>
                    </div>
                    <div className={styles.uniqueInput}>
                        <ErrorMessage
                            component='p'
                            name="email"
                            className={styles.inputError}  
                        />
                        <Field
                            className={styles.inputLine}
                            id='email_input'
                            type='text'
                            name='email'
                            placeholder='Email'
                        />
                    </div>
                    <div className={styles.doubleInputs}>
                        <div>
                            <ErrorMessage 
                                    component="p"
                                    name="studentNumber"
                                    className={styles.inputError}
                            />
                            <Field
                                className={styles.input}
                                id='studentNumber_input'
                                type='text'
                                placeholder='Student Number'
                                name='studentNumber'
                            />
                        </div>
                        <div>
                            <ErrorMessage 
                                component="p"
                                name="birthDate"
                                className={styles.inputError}
                            />                        
                            <Field
                                className={styles.input}
                                id='birthDate_input'
                                type='date'
                                placeholder='Birth Date'
                                name='birthDate'
                            />
                        </div>
                    </div>
                    <div className={styles.doubleInputs}>
                        <div>
                            <ErrorMessage 
                                    component="p"
                                    name="parentName"
                                    className={styles.inputError}
                            />
                            <Field
                                className={styles.input}
                                id='parentName_input'
                                type='text'
                                placeholder='Parent Name'
                                name='parentName'
                            />
                        </div>
                        <div>
                            <ErrorMessage 
                                component="p"
                                name="parentNumber"
                                className={styles.inputError}
                            />                        
                            <Field
                                className={styles.input}
                                id='parentNumber_input'
                                type='text'
                                placeholder='Parent Number'
                                name='parentNumber'
                            />
                        </div>
                    </div>
                    <button
                        className={styles.registerButton}
                        type="submit"
                    >
                        Register
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default RegisterForm;