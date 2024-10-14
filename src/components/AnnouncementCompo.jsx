import React, { useState } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { backendAddress } from '../helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AnnouncementCompo = () => {

    const { userInfo, setUserInfo } = useContext(UserContext);
    const [announcement, setAnnouncement] = useState('');

    const notify = (message, type = 'success') => {
        toast(message, { type });
    };

    const emptyText = (message, type = "error") => {
        toast(message, { type });
    }

    const { name } = userInfo;
    // console.log(name);
    


    const postAnnouncement = async () => {
        
        if (!announcement) {
            emptyText('fill the input first')
            return;
        }

        const response = await fetch(`${backendAddress}/api/announcement`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                announcement : announcement,
                author : name
            })
        });

        const data = await response.json();

        // console.log(data);
        notify(data.message);
        
    }
    

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // console.log("form submitted");
        // console.log(announcement);
        postAnnouncement();

        setAnnouncement("");
        
    };

    // console.log(userInfo);
    

    return (
        <div className='p-[30px]'>
            <form onSubmit={handleFormSubmit} className='w-[55%] m-auto'>
                <TextareaAutosize
                    value={announcement}
                    onChange={(e)=>{setAnnouncement(e.target.value)}}
                    aria-label="minimum height"
                    minRows={5}
                    placeholder="Write announcement here"
                    style={{
                        fontSize : '20px',
                        borderWidth: '1px',
                        width: '100%',
                        padding: '10px',
                        borderColor: 'gray',
                        borderRadius: '4px',
                        outline: 'none', // Remove default outline
                    }}
                    className="textarea"
                />
                <button
                    type='submit'
                    className='block bg-blue-500 text-white text-lg rounded h-[40px] w-[100px] mt-[10px] transition duration-200 hover:bg-blue-400'
                >
                    Post
                </button>
            </form>

            {/* Tailwind or Custom CSS to handle focus state */}
            <style jsx>{`
                .textarea:focus {
                    border-color: skyblue;
                    box-shadow: 0 0 0 3px rgba(135, 206, 235, 0.5); /* Optional: a soft skyblue glow effect */
                }
            `}</style>


            <ToastContainer/>
        </div>
    );
};

export default AnnouncementCompo;
