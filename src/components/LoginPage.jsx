import { useFormik } from 'formik'
import { UserContext } from '../Context/UserContext';
import { LoginValidation } from './YupValidations/YupValidations';
import { Link } from 'react-router-dom';
import { } from 'react-dom'
import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { backendAddress } from '../helper';


const initialStates = {
    email: '',
    password: 'password',
}

const Login = () => {

    const [redirect, setRedirect] = useState(false);
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [errorFromServer, setErrorFromServer] = useState();
    const [buttonLoading, setbuttonLoading] = useState(false);

    const Formik = useFormik({
        initialValues: initialStates,
        validationSchema: LoginValidation,
        onSubmit: async (values) => {
            // console.log(values);

            setbuttonLoading(true);

            const postLoginDetails = async () => {

                try {
                    const response = await fetch(`${backendAddress}/api/login/student`, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values),

                    });

                    const data = await response.json();

                    if (response.ok) {

                        // console.log(data);
                        setUserInfo(data.user);
                        setRedirect(true);

                    }
                    else {
                        console.log(data);
                        setErrorFromServer(data.message)

                    }



                }

                catch (error) {
                    console.log("Error", error);
                }
                finally {
                    setbuttonLoading(false);
                }

            }

            setTimeout(() => {
                postLoginDetails();
            }, 1000);


        }
    });

    // console.log(Formik);

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = Formik;


    if (redirect) {
        return <Navigate to="/student-dashboard" />
    }


    return (
        <div className=" bg-blue-50 h-screen flex justify-center items-center relative">

            <form onSubmit={handleSubmit} className='h-[250px] w-[350px]  flex flex-col z-20 justify-around p-[10px] rounded'>
                <h1 className='font-semibold text-lg block text-black mx-auto'>Student Login</h1>


                <input
                    className='h-[40px] pl-[10px] outline-none border rounded border-gray-400'
                    type='email'
                    placeholder='Enter email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.email && touched.email ? <p className="text-sm text-red-600">{errors.email}</p> : null}


                <input
                    className='h-[40px] pl-[10px] outline-none border rounded border-gray-400'
                    type='password'
                    placeholder='Enter password'
                    value={values.password}
                    name='password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.password && touched.password ? <p className="text-sm text-red-600">{errors.password}</p> : null}

                {errorFromServer && <p className='text-red-500'>{errorFromServer}</p>}


                {buttonLoading ?
                    
                    (<button
                        className='bg-sky-600 rounded text-white text-lg transition duration-200 hover:bg-sky-500 h-[40px]'>
                        Loading....
                    </button>) :

                    (<button type='submit'
                        className='bg-sky-600 rounded text-white text-lg transition duration-200 hover:bg-sky-500 h-[40px]'>
                        Login
                    </button>)

                }

                <p className='text-black text-sm'>Dont have an account? <Link to="/student-register"><span className=' text-blue-600 hover:underline'>Signup</span></Link></p>

            </form>

            <Link to="/admin-login"><button className=' absolute left-[47%] top-[85%] hover:underline'>Admin login</button></Link>

        </div >
    )
}


export default Login;