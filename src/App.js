import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashbord from "./Components/dashbord";

import Login from "./Components/login";

import ListOfemp from "./Components/ListOfemp";
import CreateOrEditUser from "./Components/CreateEditForm";
import { useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]); // Manage list of users
  const [selectedUser, setSelectedUser] = useState(null); // Manage selected user for editing
  const navigate = useNavigate();
  const location = useLocation(); // Get location object to access route state
  const selectedUserId = location.state?.selectedUser || null;
//  console.log(selectedUserId._id);
  

  const handleUserSubmit = async(userData, isEditMode) => {
    console.log(userData)
    // console.log(userData.img.name, isEditMode);
    const img = userData.img.name
    const {
      Name,
      email,
      mobileNumber,
      designation,
      gender,
      course,
      
       } = userData;
     // Regex to validate the email address
     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(emailRegex.test(email) ){
      if (isEditMode) {
        const token = localStorage.getItem("access_token")
        // console.log(token ,",,,,,,,")
        // Update existing user
        const response = await axios.put(`http://localhost:5000/Employee/${selectedUserId._id}`, { 
          Name,
          email,
          mobileNumber,
          designation,
          gender,
          course,
          img},
          { 
            headers: { 
              Authorization: `Bearer ${token}`,
            }
          }
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === userData.id ? userData : user))
        );
        console.log(response)
        alert(response.data.message)
      } else {
        // Add new user
  
    
        const response = await axios.post(`http://localhost:5000/Employee/create`,{
          Name,
        email,
        mobileNumber,
        designation,
        gender,
        course,
        img
        },
         { 
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          }
        }
        );
        setUsers((prevUsers) => [...prevUsers, { ...userData, id: Date.now() }]);
        console.log(response)
        alert(response.data.message)
       }
    }else{
      alert("Invalid email")
    }
    
    

    navigate("/list");
  };


  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Dashbord />} />
        <Route
          path="/edit_employee"
          element={
            <CreateOrEditUser
              selectedUser={selectedUser}
              onSubmit={handleUserSubmit}
            />
          }
        />
        <Route
          path="/create_employee"
          element={<CreateOrEditUser onSubmit={handleUserSubmit} />}
        />
      
        <Route
          path="/list"
          element={<ListOfemp />}
        />
      </Routes>
    </>
  );
}

export default App;
