import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashbord from "./Components/dashbord";

import Login from "./Components/login";

import ListOfemp from "./Components/ListOfemp";
import CreateOrEditUser from "./Components/CreateEditForm";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]); // Manage list of users
  const [selectedUser, setSelectedUser] = useState(null); // Manage selected user for editing
  const navigate = useNavigate();

  const handleUserSubmit = (userData, isEditMode) => {
    console.log(userData, isEditMode);
    if (isEditMode) {
      // Update existing user
      // const response = await axios.put(EDIT_USER_API(userData.id), userData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userData.id ? userData : user))
      );
    } else {
      // Add new user
      // const response = await axios.post(CREATE_USER_API, userData);
      setUsers((prevUsers) => [...prevUsers, { ...userData, id: Date.now() }]);
    }

    navigate("/list");
  };

  // Function to handle edit click
  const handleEditUser = (user) => {
    setSelectedUser(user); // Set the user to be edited
    navigate("/edit_employee"); // Navigate to the edit page
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
          element={<ListOfemp users={users} onEditUser={handleEditUser} />}
        />
      </Routes>
    </>
  );
}

export default App;
