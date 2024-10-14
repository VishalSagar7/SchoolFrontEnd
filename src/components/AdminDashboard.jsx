import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { json, Link } from 'react-router-dom';
import StudentsListComponent from './StudentsListComponent';
import { backendAddress } from '../helper';
import PostStudentsForm from './PostStudentsForm';
import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import UnstyledTabsIntroduction from './TabsComponent';
import BasicTabs from './TabsforAdmin';
import Person4Icon from '@mui/icons-material/Person4';
import { Button, Popover, Typography } from '@mui/material';


const AdminDashboard = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isToken, setIsToken] = useState(true); // For token validation
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the popup
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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



  useEffect(() => {
    const verifyAdminToken = async () => {
      const response = await fetch(`${backendAddress}/teacher-dashboard`, {
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
    };

    verifyAdminToken();
  }, [setUserInfo]);

  if (!isToken) {
    return (
      <h1 className="text-3xl">
        You don't have access to this page. Go to{' '}
        <span className="text-blue-500 hover:underline">
          <Link to="/">login page</Link>
        </span>
      </h1>
    );
  }












  return (
    <div className="">
      <div className="h-[100px] p-[30px] px-[100px] w-full bg-blue-600 flex items-center justify-between">

        <div>
          <h1 className="text-3xl text-white">Teacher dashboard</h1>
          <h1 className="text-2xl text-white">{userInfo?.name}</h1>
        </div>

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

export default AdminDashboard;
