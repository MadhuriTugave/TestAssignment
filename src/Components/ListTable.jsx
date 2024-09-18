import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function ListTable({data ,onUpdateStatus}) {

    async function UpdateStatus(projectId, status) {
        console.log(projectId, status);
        // console.log(localStorage.getItem("access_token"));
        try {
          const response = await axios.put(
            // `https://online-project-management-onae.onrender.com/ProjectList/${projectId}`,
            {
              status: status,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );
          // console.log(response)
          onUpdateStatus(projectId);
        } catch (error) {
          console.log(error);
        }
      }
      const navigate = useNavigate(); // useNavigate hook for navigation

  const handleEditClick = (user) => {
    // Navigate to the CreateOrEditUser component and pass user data as state
    navigate("/edit-user", { state: { selectedUser: user } });
  };
  return (
    <>
      
      <table className="min-w-full bg-white">
    <thead className="hidden lg:table-header-group ">
      <tr className="bg-blue-100">
        <th className="py-3 px-4 border-b table-heading2">Unique Id</th>
        <th className="py-2 px-4 border-b table-heading2">Image</th>
        <th className="py-2 px-4 border-b table-heading2">Email</th>
        <th className="py-2 px-5 border-b table-heading2">Name</th>
        <th className="py-2 px-4 border-b table-heading2 ">Mobile No</th>
        <th className="py-2 px-4 border-b table-heading2">Designation</th>
        <th className="py-2 px-4 border-b table-heading2">course</th>
        <th className="py-2 px-4 border-b table-heading2">Created Date</th>
        <th className="py-2 px-5  border-b table-heading2 ">Action</th>
      
        <th className="py-2 px-3 border-b"></th>
        <th className="py-2 px-3 border-b"></th>
        
      </tr>
    </thead>
    <tbody>
      {data ? data.map((User) => (
        <tr key={User._id} className="hidden lg:table-row">
          <td className="py-2 px-3 border-b">
            <div className="table-heading2">{User._id}</div>
           
          </td>
          <td className="py-2 px-3 border-b table-data">{User.Image}</td>
          <td className="py-2 px-3 border-b table-data">{User.Email}</td>
          <td className="py-2 px-3 border-b table-data">{User.Name}</td>
          <td className="py-2 px-3 border-b table-data">{User.Mobile_No}</td>
          <td className="py-2 px-3 border-b table-data">{User.Designation}</td>
          <td className="py-2 px-3 border-b table-data">{User.course}</td>
          <td className="py-2 px-3 border-b table-data">{User.Created_Date}</td>
     
          <td className="py-2 px-3 border-b ">
            {/* <div className="flex  space-x-4 lg:ml-3 ">
              <button
                className="p- bg-blue-600 rounded-3xl  w-[70px] text-white border-2"
               onClick={() => handleEditClick(User)}
              >
                Edit
              </button>
              <button
                className="button text-blue-500 "
                // onClick={() => UpdateStatus(List._id)}
              >
                Delete
              </button>
            
               
          
            </div> */}
          </td>
          <td className="py-2 px-3 border-b table-data"></td>
          <td className="py-2 px-3 border-b table-data"></td>
        </tr>
      )) : <div className="text-center text-2xl">No Employee created yet!!!</div>}
    </tbody>
  </table>
    </>
  )
}

export default ListTable
