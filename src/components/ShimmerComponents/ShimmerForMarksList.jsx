import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ShimmerForMarksList = () => {
  return (
      <div className='flex flex-col gap-[10px] pt-[10px]'>
          <Skeleton height={40} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
          <Skeleton height={600} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
    </div>
  )
}

export default ShimmerForMarksList;
