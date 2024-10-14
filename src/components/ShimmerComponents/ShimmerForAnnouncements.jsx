import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ShimmerForAnnouncements = () => {
    return (
        <div className="flex flex-col gap-[20px] ">
            <Skeleton height={30} width={250} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
            <Skeleton height={160} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
            <Skeleton height={160} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
            <Skeleton height={160} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
            <Skeleton height={160} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
            <Skeleton height={160} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
            <Skeleton height={160} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
            <Skeleton height={160} baseColor="#DDEEF8" highlightColor="#EEF7FC" />
        </div>
    );
};

export default ShimmerForAnnouncements;

