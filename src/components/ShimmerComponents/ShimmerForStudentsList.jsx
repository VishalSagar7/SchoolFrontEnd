import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ShimmerForStudentsList = () => {
    return (
        <div className=' flex flex-col gap-[20px] '>
            
            <Skeleton height={80} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
            <Skeleton height={600} baseColor="#DDEEF8" highlightColor="#EEF7FC" />

        </div>
    )
}

export default ShimmerForStudentsList; 
