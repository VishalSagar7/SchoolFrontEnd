import * as Yup from 'yup';


export const SignUpValidation = Yup.object({
    username: Yup.string().required("Please enter name"),
    email: Yup.string().email('Invalid email address').required('Enter email'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Enter password'),
    phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be digits only") // ensures phone is numeric
        .min(10, 'Phone number must be at least 10 digits') // if you want a specific length
        .max(10, 'Phone number must not exceed 10 digits') // enforce a maximum length
        .required('Please enter your phone number'),
    standard: Yup.number()
        .min(1, 'Standard must be between 1 and 12')
        .max(12, 'Standard must be between 1 and 12')
        .required('Please enter your standard'),
});


export const LoginValidation = Yup.object({
    email: Yup.string().email('Invalid email address').required('Enter email'),
    password: Yup.string().min(6, 'Must be at least 6 characters').required('Enter password'),
})