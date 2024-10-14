import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ShimmerForMarksTable = () => {
    return (

        <div className='mt-[10px] flex flex-col gap-[7px]'>
            <Skeleton height={25} width={200} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
            <Skeleton height={25} width={200} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
            <Skeleton height={25} width={150} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
            <Skeleton height={500}  baseColor="#DDEEF8" highlightColor="#EEF7FC" />
        </div>

    )
}

export default ShimmerForMarksTable;
