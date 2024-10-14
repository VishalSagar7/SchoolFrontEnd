import * as React from 'react';
import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import PostStudentsForm from './PostStudentsForm';
import StudentsListComponent from './StudentsListComponent';
import StudentsMarksComponent from './StudentsMarksComponent';

export default function UnstyledTabsIntroduction() {
    return (
        <Tabs defaultValue={0}>
            <CustomTabsList>
                <CustomTab value={0}>Students List</CustomTab>
          <CustomTab value={1}>Add New Student Marks</CustomTab>
          <CustomTab value={2}>Student results</CustomTab>
            </CustomTabsList>
            <CustomTabPanel value={0}><StudentsListComponent /></CustomTabPanel>
        <CustomTabPanel value={1}><PostStudentsForm /></CustomTabPanel>
        <CustomTabPanel value={2}><StudentsMarksComponent/></CustomTabPanel>
        </Tabs>
    );
}

const blue = {
    50: '#f0f4ff',
    100: '#d0e1ff',
    200: '#a8c7ff',
    300: '#82aeff',
    400: '#5a96ff',
    500: '#397dff',
    600: '#2663e1',
    700: '#1f4fbf',
    800: '#1a3d9b',
    900: '#142d75',
};

const grey = {
    50: '#f9f9fb',
    100: '#e0e0e5',
    200: '#c7c7cf',
    300: '#b0b0b8',
    400: '#9999a0',
    500: '#808087',
    600: '#65656c',
    700: '#4b4b53',
    800: '#33333b',
    900: '#1a1a23',
};

const CustomTab = styled(BaseTab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: ${blue[600]};  /* Blue text when not selected */
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  background-color: #fff;  /* White background when not selected */
  width: 100%;
  padding: 12px 20px;
  margin: 6px;
  border-radius: 8px;
  border: 1px solid ${blue[200]};  /* Light blue border */
  display: flex;
  justify-content: center;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: ${blue[50]};  /* Light blue on hover */
    border-color: ${blue[400]};  /* Darker blue border on hover */
  }

  &:focus {
    color: ${blue[600]};
    // outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: ${blue[600]};  /* Blue background for selected tab */
    color: #fff;  /* White text for selected tab */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid ${blue[600]};  /* Darker border when selected */
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;



const CustomTabPanel = styled(BaseTabPanel)(
    ({ theme }) => `
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 16px;
  padding: 0px 10px;
  margin-top : 15px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//   border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
  border-radius: 12px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  opacity: 1;
  transition: opacity 0.3s ease;
`
);

const CustomTabsList = styled(BaseTabsList)(
    ({ theme }) => `
  min-width: 500px;
//   background-color: ${blue[500]};
  border-radius: 12px;
//   margin-top : 10px;
//   margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  padding: 4px;
//   box-shadow: 0px 6px 20px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
`
);
