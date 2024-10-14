import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContextProvider } from './Context/UserContext';
import Register from "./components/RegisterPage";
import Login from "./components/LoginPage";
import StudentDashboard from './components/StudentDashboard';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <>

      <UserContextProvider>
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/student-register" element={<Register />} />
          <Route path='/student-dashboard' element={<StudentDashboard />} />
          <Route path='/admin-login' element={ <AdminLogin/> } />
          <Route path='/admin-dashboard' element={ <AdminDashboard/> } />
        </Routes>

      </UserContextProvider>

    </>
  );
}

export default App;

