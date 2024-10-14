import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { backendAddress } from '../helper';
import { useNavigate } from 'react-router-dom';
import Person4Icon from '@mui/icons-material/Person4';
import { Button, Popover, Typography } from '@mui/material';
import SearchResultsComponent from './SearchResultsComponent';
import BasicTabs from './TabsforStudentDashboard';
import { Shimmer } from 'react-shimmer'


const StudentDashboard = () => {

  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isToken, setIsToken] = useState(true); // For token validation
  const [loading, setLoading] = useState(true); // Loading state
  const [anchorEl, setAnchorEl] = useState(null);

  // Function to open the popup
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the popup
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`${backendAddress}/student/dashboard`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok) {
          setUserInfo(data.user);
          setIsToken(true);
        } else {
          setIsToken(false);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setIsToken(false);
      } finally {
        setLoading(false); // End loading state
      }
    };

    verifyToken();

  }, [setUserInfo]);


  const handleLogout = async () => {

    try {
      const response = await fetch(`${backendAddress}/student/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        return;
      }


      const data = await response.json();

      console.log(data);

      navigate('/')
    }
    catch (e) {
      console.log("Error", e);

    }


  }




  // console.log(studentData.marks);





  // If the token is invalid, redirect to the login page
  if (!isToken) {
    return <h1 className='text-3xl'>You dont have access to this page Go to <span className='text-blue-500 hover:underline'><Link to="/">login page</Link></span></h1>;
  }

  // Display loading message while data is being fetched


  // Render the dashboard after userInfo is fetched
  return (
    <div className=' pb-[80px]'>
      <div className='h-[100px] p-[30px] w-full bg-blue-500 px-[120px] justify-centerp flex items-center justify-between'>
        {/* <h1 className='text-3xl text-white'>Welcome {userInfo?.name}</h1> */}
        <h1 className='text-2xl text-white'>Student dashboard</h1>
        <div>
          <Person4Icon
            sx={{ fontSize: '50px', padding: '5px', borderRadius: '50%', color: 'white', bgcolor: '#4169E1', '&:hover': { bgcolor: 'blue' } }}
            onClick={handleClick}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >

            <Typography sx={{ p: 1 }}>
              <h1 className='text-lg hover:bg-gray-100 p-1'>{userInfo?.name}</h1>
              <h1 className='text-lg hover:bg-gray-100 p-1'>{userInfo?.email}</h1>
              <button onClick={() => handleLogout()} className='text-lg text-left w-full hover:bg-gray-100 p-1 '>Logout</button>
            </Typography>

          </Popover>

        </div>
      </div>


      <div className='px-[100px]'>
        <BasicTabs />
      </div>



    </div>
  );
};

export default StudentDashboard;
