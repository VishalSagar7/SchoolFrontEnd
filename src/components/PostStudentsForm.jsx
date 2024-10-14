import { useState } from 'react';
import { backendAddress } from '../helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PostStudentsForm = () => {

    const availableSubjects = ['Marathi', 'Sanskrit', 'Math', 'English', 'Science', 'History', 'SocialScience', 'Geography'];
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [percentage, setPercentage] = useState(null); 

    const notify = (message, type = 'success') => {
        toast(message, { type });
    };

    const failNotify = (message, type = 'error') => {
        toast(message, { type });
    }

    const negativeMarksToast = (message, type = "error") => {
        toast(message, { type });
    }

    const [formData, setFormData] = useState({
        semister: 'first semister', 
        studentName: '',
        standard: '',
        marks: {},
        year: '',
        seatno: '',
    });


    const handleSubmit = (e) => {



        const postStdMarkstoDb = async (formData) => {
            try {
                const response = await fetch(`${backendAddress}/post-student-marks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (!response.ok) {
                    failNotify(data.message)
                    // console.log(data.message);
                    
                    // throw new Error(`Failed to submit marks: ${response.statusText}`);
                    return;
                }

                // Parse the JSON response
                
                console.log('Response data:', data.message);
                notify(data.message);
                

                // Reset formData if the response is successful
                setFormData({
                    examName: '',
                    studentName: '',
                    standard: '',
                    division: '',
                    marks: {},
                    year: '',
                });

                // console.log('Form reset after successful submission.');
            } catch (error) {
                // Handle errors during the fetch request
                console.error('Error submitting marks:', error);
                alert('Failed to submit marks. Please try again.');
            }
        };


        e.preventDefault();

        // console.log('Submitted data:', formData);

        postStdMarkstoDb(formData);

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;  // Get the name and value from the event
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,  // Dynamically update the correct field
        }));
    };

    // Handle subject selection with checkboxes
    const handleSubjectSelection = (subject) => {
        if (selectedSubjects.includes(subject)) {
            setSelectedSubjects(selectedSubjects.filter((subj) => subj !== subject));
        } else {
            setSelectedSubjects([...selectedSubjects, subject]);
        }
    };

      // Calculate percentage
  const calculatePercentage = () => {
    let totalMarks = 0;
    selectedSubjects.forEach((subject) => {
      totalMarks += parseInt(formData.marks[subject] || 0);
    });

    const maxMarksPerSubject = 100; // Assuming each subject has a maximum of 100 marks
    const totalMaxMarks = selectedSubjects.length * maxMarksPerSubject;
    const percentage = (totalMarks / totalMaxMarks) * 100;
    setPercentage(percentage.toFixed(2));
  };



    return (
        <div>
            <form className="mt-4 p-4 bg-gray-100 rounded-md" onSubmit={handleSubmit}>
                {/* Student Details */}
                <div className=' flex flex-wrap '>

                    <div className="mb-4 w-[50%] px-[10px]">
                        <label className="block mb-2 font-semibold">Student Name:</label>
                        <input
                            type="text"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4 w-[50%] px-[10px]">
                        <label className="block mb-2 font-semibold">Year:</label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4 w-[50%] px-[10px]">
                        <label className="block mb-2 font-semibold">Semister:</label>
                        <select
                            value={formData.semister}  // Make sure this is binding the correct value
                            onChange={handleInputChange}  // Handle changes correctly
                            name="semister"
                            className="w-full p-2 border rounded"
                        >
                            <option value="first semister">First semester</option>
                            <option value="second semister">Second semester</option>
                        </select>

                    </div>


                    <div className="mb-4 w-[50%] px-[10px]">
                        <label className="block mb-2 font-semibold">Seat number:</label>
                        <input
                            type="text"
                            name="seatno"
                            value={formData.seatno}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4 w-[50%] px-[10px]">
                        <label className="block mb-2 font-semibold">Standard:</label>
                        <input
                            type="number"
                            name="standard"
                            value={formData.standard}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>


                </div>

                {/* Subject Selection */}
                <div className="mb-4 mt-[20px]">
                    <h2 className="mb-2 font-semibold">Select Subjects:</h2>
                    <div className='flex flex-wrap'>
                        {availableSubjects.map((subject) => (
                            <div key={subject} className="flex items-center mb-2 border border-gray-500 mx-[10px] px-[10px] py-[7px] rounded">
                                <label className="mr-2 text-black text-lg">{subject}</label>
                                <input
                                    type="checkbox"
                                    name={subject}
                                    value={subject}
                                    checked={selectedSubjects.includes(subject)}
                                    onChange={() => handleSubjectSelection(subject)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Display input fields for selected subjects */}
                <div className="mb-4 mt-[20px]">
                    <h2 className="mb-2 font-semibold">Enter Marks for Selected Subjects:</h2>
                    <div className='flex flex-wrap'>
                        {selectedSubjects.map((subject) => (
                            <div key={subject} className="mb-2 mx-[10px]">
                                <label className="block mb-1">{subject}:</label>
                                <input
                                    type="number"
                                    name={subject}
                                    value={formData.marks[subject] || ''}
                                    className="w-full p-2 border rounded"
                                    required
                                    onChange={(e) => {
                                        if (e.target.value < 0) {
                                            negativeMarksToast("Marks must not be negative")
                                            return 
                                        }
                                        setFormData((prevState) => ({
                                            ...prevState,
                                            marks: { ...prevState.marks, [subject]: e.target.value },
                                        }))
                                    }

                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Get Percentage Button */}
                <button
                    type="button"
                    className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                    onClick={calculatePercentage}
                >
                    Get Percentage
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    Submit
                </button>

                {/* Display the percentage if calculated */}
                {percentage && (
                    <div className="mt-4 p-4 bg-green-100 rounded">
                        <h2 className="text-xl">Percentage: {percentage}%</h2>
                    </div>
                )}
            </form>

            <ToastContainer />
            
        </div>
    )
}

export default PostStudentsForm
