
import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function ListTable({data, ondelete }) {
console.log(data)

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

async function DeleteEmp(id){
  const deleted = await axios.delete(`http://localhost:5000/Employee/${id}`,{ 
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }
  });
  ondelete(id);
// console.log(deleted);
alert(deleted.data.message)


}

      const navigate = useNavigate(); // useNavigate hook for navigation

  const handleEditClick = (user, id) => {
    console.log(user,id)
    // Navigate to the CreateOrEditUser component and pass user data as state
    navigate("/edit_employee", { state: { selectedUser: user, id } });
  };
  return (
    <>
      
      <table className="min-w-full bg-white">
    <thead className=" lg:table-header-group ">
      <tr className="bg-blue-100">
        <th className="py-3 px-4 border-b table-heading2">Unique Id</th>
        <th className="py-2 px-4 border-b table-heading2">Image</th>
        <th className="py-2 px-4 border-b table-heading2">Email</th>
        <th className="py-2 px-5 border-b table-heading2">Name</th>
        <th className="py-2 px-4 border-b table-heading2 ">Mobile No</th>
        <th className="py-2 px-4 border-b table-heading2">Designation</th>
        <th className="py-2 px-4 border-b table-heading2">Gender</th>
        <th className="py-2 px-4 border-b table-heading2">course</th>
        <th className="py-2 px-4 border-b table-heading2">Created Date</th>
        <th className="py-2 px-5  border-b table-heading2 ">Action</th>
      
        <th className="py-2 px-3 border-b"></th>
        <th className="py-2 px-3 border-b"></th>
        
      </tr>
    </thead>
    <tbody>
      {data ? data.map((User,index) => (
        <tr key={User._id} className=" lg:table-row">
          <td className="py-2 px-3 border-b">
            <div className="table-heading2">{index}</div>
           
          </td>
          <td className="py-2 px-3 border-b table-data">{User.img}</td>
          <td className="py-2 px-3 border-b table-data">{User.email}</td>
          <td className="py-2 px-3 border-b table-data">{User.name}</td>
          <td className="py-2 px-3 border-b table-data">{User.mobileNumber}</td>
          <td className="py-2 px-3 border-b table-data">{User.designation}</td>
          <td className="py-2 px-3 border-b table-data">{User.gender}</td>
          <td className="py-2 px-3 border-b table-data">{User.course[0]}</td>
          <td className="py-2 px-3 border-b table-data">{formatDate(User.createdAt)}</td>
     
          <td className="py-2 px-3 border-b ">
            <div className="flex  space-x-4 lg:ml-3 ">
              <button
                className="p- bg-blue-600 rounded-3xl  w-[70px] text-white border-2"
               onClick={() => handleEditClick(User, User._id)}
              >
                Edit
              </button>
              <button
                className="button text-blue-500 "
                onClick={() => DeleteEmp(User._id)}
              >
                Delete
              </button>
            
               
          
            </div>
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
