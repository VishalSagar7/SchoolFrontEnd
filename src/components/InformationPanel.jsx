import React, { useEffect, useState } from 'react'
import { backendAddress } from '../helper'
import ShimmerForInfoPanel from './ShimmerComponents/ShimmerForInfoPanel';

const InformationPanel = () => {

    const [studentArray, setStudentArray] = useState([]);
    const [studentsByStandard, setStudentsByStandard] = useState({});

    const getData = async () => {
        const response = await fetch(`${backendAddress}/admin-panelinfo`);
        const data = await response.json();
        setStudentArray(data.studentsArray);
    }

    useEffect(() => {
        getData();
    }, []);

    // Function to group students by their standard
    const groupByStandard = (students) => {
        const grouped = students.reduce((acc, student) => {
            if (!acc[student.studentstandard]) {
                acc[student.studentstandard] = [];
            }
            acc[student.studentstandard].push(student);
            return acc;
        }, {});
        setStudentsByStandard(grouped);
    };

    useEffect(() => {
        if (studentArray.length > 0) {
            groupByStandard(studentArray);
        }
    }, [studentArray]);

    // Function to get the total number of students
    const getTotalStudents = () => {
        return Object.values(studentsByStandard).reduce((total, students) => total + students.length, 0);
    }

    if (studentArray.length === 0) {
        return <ShimmerForInfoPanel/>
    }

    return (
        <div>

            {/* <h1 className='text-[2em] text-gray-800'>Student Count</h1> */}


            <div className='flex gap-[40px] my-[15px]'>

                {Object.keys(studentsByStandard).map(standard => (
                    <div className='h-[200px] relative w-[200px] bg-blue-500  rounded-md shadow py-[10px] px-[15px] text-lg' key={standard} >

                        <h2 className='text-white'>Standard {standard}</h2>
                        <h2 className='absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] text-white text-[3em]'> {studentsByStandard[standard].length}</h2>

                    </div>
                ))}
            </div>


            <div className='mt-[40px] h-[200px] relative w-[200px] bg-green-600 rounded-md shadow py-[10px] px-[15px] text-lg'>
                <h2 className='text-white'>Total Students</h2>
                <h2 className='absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] text-white text-[3em]'>{getTotalStudents()}</h2>
            </div>

        </div>
    );
}

export default InformationPanel;
