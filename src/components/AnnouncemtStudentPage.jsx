import React, { useEffect, useState } from 'react'
import { backendAddress } from '../helper';
import AnnouncementsCard from './AnnouncementsCard';
import { Shimmer, Breathing } from 'react-shimmer'
import ShimmerForAnnouncements from './ShimmerComponents/ShimmerForAnnouncements';

const AnnouncemtStudentPage = () => {

  const [announcementArray, setAnnouncementArray] = useState([]);

  const getAnnouncements = async () => {

    try {
      const response = await fetch(`${backendAddress}/api/announcements`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Failed to fetch announcements');
      }
      // console.log(data);
      setAnnouncementArray(data.allAnouncements)
    }
    catch (error) {
      console.error("Error fetching announcements:", error);

    }

  }


  useEffect(() => {

      getAnnouncements();

  }, []);


  // console.log(announcementArray);


  if (announcementArray.length === 0) {
    return <ShimmerForAnnouncements/>
  }


  return (
    <div>
      <h1 className='text-xl text-gray-800'>Recent Announcements</h1>

      <div className='mt-[20px] flex flex-col gap-[20px]'>

        {announcementArray.map((item) =>
          <AnnouncementsCard key={item._id} data={item} />
        )}

      </div>
    </div>
  )
}

export default AnnouncemtStudentPage;
