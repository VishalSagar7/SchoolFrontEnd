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

const AdminLogin = () => {

    const [errorFromServer, setErrorFromServer] = useState();
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false)

    const Formik = useFormik({
        initialValues: initialStates,
        validationSchema: LoginValidation,
        onSubmit: async (values) => {

            setLoadingButton(true);
            const sendAdminLoginData = async () => {

                try {
                    const response = await fetch(`${backendAddress}/api/login/admin`, {
                        method: "POST",
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values),
                    });

                    const data = await response.json();
                    if (response.ok) {
                        console.log(data);
                        setUserInfo(data.admin);
                        setRedirect(true)
                    }
                    else {
                        // console.log(data);
                        setErrorFromServer(data.message);

                    }
                }

                catch (error) {
                    console.log("Error", error);

                }
                finally {
                    setLoadingButton(false)
                }

            }

            setTimeout(() => {
                sendAdminLoginData();
            }, 1000);

        }
    });

    // console.log(Formik);

    // console.log(userInfo);


    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = Formik;


    if (redirect) {
        return <Navigate to="/admin-dashboard" />
    }

    return (
        <div className=" bg-blue-50 h-screen flex justify-center items-center relative">

            <form onSubmit={handleSubmit} className='h-[200px] w-[350px]  flex flex-col z-20 justify-between  p-[10px] pt-0 rounded'>
                <h1 className='font-semibold text-lg block text-black mx-auto'>Admin-login</h1>


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

                {loadingButton ?
                    
                    (<button type='submit'
                        className='bg-sky-600 rounded text-white text-lg transition duration-200 hover:bg-sky-500 h-[40px]'>
                        Loading....
                    </button>) :

                    (<button type='submit'
                        className='bg-sky-600 rounded text-white text-lg transition duration-200 hover:bg-sky-500 h-[40px]'>
                        Signup
                    </button>)
                }



            </form>

            <Link to="/student-login"><button className=' absolute left-[47%] top-[85%] hover:underline'>Student-login</button></Link>

        </div>
    )
}


export default AdminLogin;
