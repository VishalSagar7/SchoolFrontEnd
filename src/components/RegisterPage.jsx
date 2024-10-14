import { useFormik } from 'formik'
import { SignUpValidation } from './YupValidations/YupValidations';
import { Link } from 'react-router-dom';
import { } from 'react-dom'
import { useState } from 'react';
import { backendAddress } from '../helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialStates = {
    username: '',
    email: '',
    password: 'password',
    standard: '',
    phone: '',
}

const Register = () => {

    const [buttonLoading, setButtonLoading] = useState(false);

    const notify = (message, type = 'success') => {
        toast(message, { type  });
    };

    const failnotify = (message, type = "error") => {
        toast(message, { type });
    }

    const Formik = useFormik({
        initialValues: initialStates,
        validationSchema: SignUpValidation,
        onSubmit: async (values) => {
            // console.log('Submitted values:', values);
            
            setButtonLoading(true);

            try {
                const response = await fetch(`${backendAddress}/api/register/student`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                });

                // console.log(data.message);
                const data = await response.json();

                if (!response.ok) {

                    failnotify(data.message);
                    return;
                }

                
                

                notify(data.message);

            } catch (error) {
                // console.error('Error:', error);
            } finally {
                setButtonLoading(false);
            }
        }
    });

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = Formik;

    // console.log('Errors:', errors);  // Track the validation errors

    return (
        <div className=" bg-blue-50 h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit} className='h-[500px] w-[350px]  flex flex-col z-20 justify-around p-[10px] rounded'>
                <h1 className='font-semibold text-lg block text-black mx-auto'>Student registration</h1>

                <input
                    className='h-[40px] pl-[10px] outline-none border rounded border-gray-400'
                    type='text'
                    placeholder='Enter Your name'
                    name='username'
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.username && touched.username ? <p className="text-sm text-red-600">{errors.username}</p> : null}

                <input
                    className='h-[40px] pl-[10px] outline-none border rounded border-gray-400'
                    type='text'
                    placeholder='Phone'
                    name='phone'
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.phone && touched.phone ? <p className="text-sm text-red-600">{errors.phone}</p> : null}

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
                    type='text'
                    placeholder='Standard'
                    name='standard'
                    value={values.standard}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.standard && touched.standard ? <p className="text-sm text-red-600">{errors.standard}</p> : null}


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

                {buttonLoading ? (
                    <button type='submit' className='bg-sky-600 rounded text-white text-lg transition duration-200 hover:bg-sky-500 h-[40px]'>
                        Loading....
                    </button>
                ) : (
                    <button type='submit' className='bg-sky-600 rounded text-white text-lg transition duration-200 hover:bg-sky-500 h-[40px]'>
                        Signup
                    </button>
                )}

                <p className='text-black text-sm'>Already have an account? <Link to="/"><span className=' text-blue-600 hover:underline'>Login</span></Link></p>
            </form>

            <ToastContainer />

        </div>
    );
}

export default Register;
