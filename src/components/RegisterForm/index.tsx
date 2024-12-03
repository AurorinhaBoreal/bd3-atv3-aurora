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
        <div className={styles.listWrapper}>
            <h3>
                Register your Student
            </h3>
            <Formik
                initialValues={initialValues}
                validationSchema={RegisterSchema}
                onSubmit={values => {
                    CreateUser(values)
                    console.log({...values});
                }}
            >
                <Form>
                    <div className={styles.firstNameI}>
                        <label htmlFor='firstName_input'>First Name</label>
                        <Field
                            id='firstName_input'
                            type='text'
                            placeholder='Aurora'
                            name='firstName'
                        />
                        <ErrorMessage name="firstName"/>
                    </div>
                    <div className={styles.lastNameI}>
                        <label htmlFor='lastName_input'>Last Name</label>
                        <Field
                            id='lastName_input'
                            type='text'
                            placeholder='Rossi'
                            name='lastName'
                        />
                        <ErrorMessage name="lastName"/>
                    </div>
                    <div className={styles.cpfI}>
                        <label htmlFor='cpf_input'>CPF - Without Symbols</label>
                        <Field
                            id='cpf_input'
                            type='text'
                            placeholder='00000000000'
                            name='cpf'
                        />
                        <ErrorMessage name="cpf"/>
                    </div>
                    <div className={styles.rgI}>
                        <label htmlFor='rg_input'>RG - Without Symbols</label>
                        <Field
                            id='rg_input'
                            type='text'
                            placeholder='12345678910'
                            name='rg'
                        />
                        <ErrorMessage name="rg"/>
                    </div>
                    <div className={styles.studentNumberI}>
                        <label htmlFor='studentNumber_input'>Student Number</label>
                        <Field
                            id='studentNumber_input'
                            type='text'
                            placeholder='(11) 930564158'
                            name='studentNumber'
                        />
                        <ErrorMessage name="studentNumber"/>
                    </div>
                    <div className={styles.emailI}>
                        <label htmlFor='email_input'>Email</label>
                        <Field
                            id='email_input'
                            type='text'
                            placeholder='email@gmail.com'
                            name='email'
                        />
                        <ErrorMessage name="email"/>
                    </div>
                    <div className={styles.birthDateI}>
                        <label htmlFor='birthDate_input'>Birth Date</label>
                        <Field
                            id='birthDate_input'
                            type='date'
                            placeholder='12345678910'
                            name='birthDate'
                        />
                        <ErrorMessage name="birthDate"/>
                    </div>
                    <div className={styles.parentNameI}>
                        <label htmlFor='parentName_input'>Parent Name</label>
                        <Field
                            id='parentName_input'
                            type='text'
                            placeholder='José de Pado'
                            name='parentName'
                        />
                        <ErrorMessage name="parentName"/>
                    </div>
                    <div className={styles.parentNumberI}>
                        <label htmlFor='parentNumber_input'>Parent Number</label>
                        <Field
                            id='parentNumber_input'
                            type='text'
                            placeholder='12345678910'
                            name='parentNumber'
                        />
                        <ErrorMessage name="parentNumber"/>
                    </div>
                    <button
                        type="submit"
                    >
                        Register Student
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default RegisterForm;