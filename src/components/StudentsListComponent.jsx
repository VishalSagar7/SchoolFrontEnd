import React, { useEffect, useState } from 'react';
import { backendAddress } from '../helper';
import ShimmerForStudentsList from './ShimmerComponents/ShimmerForStudentsList';

const StudentsListComponent = () => {

  const [allStudents, setAllStudents] = useState([]);
  const [searchValue, setSearchvalue] = useState('');

  const getStudentsList = async () => {
    try {
      const response = await fetch(`${backendAddress}/api/all-students-list`);
      const data = await response.json();
      // console.log(data.allStudents);
      setAllStudents(data.allStudents);
    } catch (error) {
      console.error('Error fetching students list:', error);
    }
  };

  useEffect(() => {
    getStudentsList();
  }, []);

  if (allStudents.length === 0) {
    return <ShimmerForStudentsList />
  }

  return (
    <div className="h-[400px]  w-full">
      {/* <h1>All students</h1> */}

      <div className='pb-[10px] flex items-center justify-center'>
        <input
          className='h-[40px] pl-[10px] rounded-l w-[500px] outline-none border border-gray-400 focus:border-sky-600'
          placeholder='Search by name'
          onChange={(e) => { setSearchvalue(e.target.value) }}
        />
        {/* <button className=' bg-blue-600 text-white  px-[10px] rounded-r py-[7px] h-[40px]'>Search</button> */}
      </div>


      <table className="min-w-full mt-[10px] bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2 border">Username</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Phone</th>
            <th className="px-4 py-2 border">Standard</th>

          </tr>
        </thead>
        <tbody>
          {allStudents.length > 0 ? (
            allStudents.
              filter(student => student.studentname.toLowerCase().includes(searchValue.toLowerCase())).
              map((student, index) => (
                <tr key={student.id || index} className="text-gray-700">
                  <td className="px-4 py-2 border">{student?.studentname || "Unavailable"}</td>
                  <td className="px-4 py-2 border">{student?.studentemail || "Unavailable"}</td>
                  <td className="px-4 py-2 border">{student?.studentphone || "Unavailable"}</td>
                  <td className="px-4 py-2 border">{student?.studentstandard || "Unavailable"}</td>

                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsListComponent;
