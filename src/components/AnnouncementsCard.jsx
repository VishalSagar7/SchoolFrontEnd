import React from 'react'

const AnnouncementsCard = ({ data }) => {
    // Convert createdAt to a readable format
    const formattedDate = new Date(data.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    
    return (
        <div className='rounded shadow-md p-[20px] border'>
            <h2 className='text-lg text-gray-800'>{data.announcement}</h2>
            <p className='text-gray-700 text-base mt-[10px]'>- {data.author}</p>
            <p className='text-gray-600 text-sm mt-[10px]'>{formattedDate}</p>
        </div>
    )
}

export default AnnouncementsCard;

