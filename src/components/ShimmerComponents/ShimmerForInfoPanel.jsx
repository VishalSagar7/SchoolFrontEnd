import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ShimmerForInfoPanel = () => {
  return (
    <div className='flex flex-wrap gap-[50px]'>
          <Skeleton height={200} width={200} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
          <Skeleton height={200} width={200} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
          <Skeleton height={200} width={200} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
          <Skeleton height={200} width={200} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
          <Skeleton height={200} width={200} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
          <Skeleton height={200} width={200} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
          <Skeleton height={200} width={200} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
          <Skeleton height={200} width={200} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
          <Skeleton height={200} width={200} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
          <Skeleton height={200} width={200} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
          <Skeleton height={200} width={200} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
    </div>
  )
}

export default ShimmerForInfoPanel;
