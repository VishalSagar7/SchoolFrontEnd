import React, { useState, useEffect } from 'react';
import { backendAddress } from '../helper';
import ShimmerForMarksList from './ShimmerComponents/ShimmerForMarksList';

const StudentsMarksComponent = () => {
    const [resultList, setResultList] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const [sortOption, setSortOption] = useState('default'); // State to track selected sorting option

    // Function to fetch student results from the backend
    const getAllStudentResults = async () => {
        try {
            const response = await fetch(`${backendAddress}/api/student-results`);
            const data = await response.json();

            if (!response.ok) {
                console.log('Data not found');
                return;
            }

            // Set the fetched student result data to the state
            setResultList(data.studentsResultData);
        } catch (e) {
            console.log('Error', e);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
            getAllStudentResults();
    }, []);

    // Filtered results based on the search term
    const filteredResults = resultList.filter((student) =>
        student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.seatnumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.standard.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to handle sorting
    const handleSortChange = (e) => {
        const selectedOption = e.target.value;
        setSortOption(selectedOption);

        let sortedList;
        switch (selectedOption) {
            case 'percentageAsc':
                sortedList = [...filteredResults].sort((a, b) => a.percentage - b.percentage);
                break;
            case 'percentageDesc':
                sortedList = [...filteredResults].sort((a, b) => b.percentage - a.percentage);
                break;
            default:
                sortedList = filteredResults;
        }

        setResultList(sortedList); // Update the sorted result list
    };

    return (
        <div>
            <div className='flex justify-between h-[40px]'>

                <input
                    className='h-full pl-[10px] rounded w-[500px] outline-none border border-gray-400 focus:border-sky-600'
                    type="text"
                    placeholder="Search by student name, seat number, or standard"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className='border border-gray-400 h-full rounded px-4 py-2'>
                    <option value="default">Sort By</option>
                    <option value="percentageAsc">Percentage (Ascending)</option>
                    <option value="percentageDesc">Percentage (Descending)</option>
                </select>

            </div>



            {resultList.length === 0 ? (
                <ShimmerForMarksList />
            ) : (
                <table className="min-w-full mt-[20px] bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="px-4 py-2 border">Student Name</th>
                            <th className="px-4 py-2 border">Seat Number</th>
                            <th className="px-4 py-2 border">Standard</th>
                            <th className="px-4 py-2 border">Year</th>
                            <th className="px-4 py-2 border">Percentage</th>
                            <th className="px-4 py-2 border">Result</th>
                            <th className="px-4 py-2 border">Subjects</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResults.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-4">No results found</td>
                            </tr>
                        ) : (
                            filteredResults.map((student) => (
                                <tr key={student._id} className="text-gray-700">
                                    <td className="px-4 py-2 border">{student.studentName}</td>
                                    <td className="px-4 py-2 border">{student.seatnumber}</td>
                                    <td className="px-4 py-2 border">{student.standard}</td>
                                    <td className="px-4 py-2 border">{student.year}</td>
                                    <td className="px-4 py-2 border">{student.percentage}%</td>
                                    <td className="px-4 py-2 border">{student.result}</td>
                                    <td className="px-4 py-2 border">
                                        <ul>
                                            {student.marks.map((mark) => (
                                                <li key={mark._id}>
                                                    {mark.subject}: {mark.score}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default StudentsMarksComponent;
