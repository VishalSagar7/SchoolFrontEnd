import React from 'react'
import { useState } from 'react';
import { backendAddress } from '../helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShimmerForMarksTable from './ShimmerComponents/ShimmerForMarksTable';

const SearchResultsComponent = () => {

    const [searchValue, setSearchValue] = useState('');
    const [studentData, setStudentData] = useState('');
    const [subjectList, setSubjectList] = useState([]);
    const [showShimmer, setShowShimmer] = useState(false);

    const notify = (message, type = "error") => {
        toast(message, { type })
    }


    const hancleSearchBtn = async () => {

        setShowShimmer(true);

        try {
            const response = await fetch(`${backendAddress}/getmarksby-seatno`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ seatnumber: searchValue }),
            });

            const data = await response.json();

            if (!response.ok) {
                // console.log(data);\
                notify(data.message)
                return;
            }
            // console.log(data
            // console.log(data.user);


            setStudentData(data.user)
            setSubjectList(data.user.marks)



        }
        catch (error) {
            console.log(error);

        }
        finally{
            setShowShimmer(false)
        }
    }




    return (
        <div>
            <div className='h-[50px] mt-[10px] flex items-center justify-center gap-1'>
                <input
                    className='h-[40px] w-[300px] outline-none border border-gray-400 rounded-md pl-[10px] text-lg'
                    type='text'
                    placeholder='Enter seat number'
                    value={searchValue}
                    onChange={(e) => { setSearchValue(e.target.value) }}
                />
                <button
                    onClick={() => { hancleSearchBtn() }}
                    className='h-[40px] w-[100px] bg-sky-600 text-white rounded-md'>
                    Submit
                </button>
            </div> 


            {showShimmer ? (<ShimmerForMarksTable/>) : (
                 studentData &&
                <div className=' w-[500px]  p-[] mx-auto mt-[10px]'>
                    <h1 className='text-lg font-semibold'>Name : {studentData.studentName}</h1>
                    <h1 className='text-lg'>{studentData.semister} - {studentData.year}</h1>
                    <h1>Std : {studentData.standard}</h1>

                    {/* <h1 className='text-lg font-semibold text-center'>Marks</h1> */}

                    <table className='w-full mt-[10px]'>
                        <thead>
                            <tr className='bg-gray-200 text-left'>
                                <td className='px-4 py-2 border font-bold'>Subject</td>
                                <td className='px-4 py-2 border font-bold'>Marks</td>
                            </tr>
                        </thead>


                        <tbody>
                            {subjectList.map((subject) => (
                                <tr key={subject._id}>
                                    <td className='px-4 py-2 border'>{subject.subject}</td>
                                    <td className='px-4 py-2 border'>{subject.score}</td>
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>

                            <tr>
                                <td className='px-4 py-2 border font-bold'>Percentage</td>
                                <td className='px-4 py-2 border font-bold'>{studentData.percentage}%</td>
                            </tr>

                            <tr>
                                <td className='px-4 py-2 border font-bold'>Result</td>
                                <td className='px-4 py-2 border font-bold'>{studentData.result}</td>
                            </tr>

                        </tfoot>



                    </table>
                </div>
            
            )}

            <ToastContainer />

        </div>
    )
}

export default SearchResultsComponent;
