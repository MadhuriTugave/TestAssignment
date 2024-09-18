
import React, { useEffect, useState } from 'react'
import Navbar from './navbar';

function CreateOrEditUser({ selectedUser, onSubmit }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [designation, setDesignation] = useState("");
    const [gender, setGender] = useState("");
    const [course, setCourse] = useState([]);
    const [img, setImg] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
  
    useEffect(() => {
      // If selectedUser is passed (i.e., edit mode), populate form with user data
      if (selectedUser) {
        setIsEditMode(true);
        setName(selectedUser.Name);
        setEmail(selectedUser.email);
        setMobileNumber(selectedUser.mobileNumber);
        setDesignation(selectedUser.designation);
        setGender(selectedUser.gender);
        setCourse(selectedUser.course || []);
        setImg(selectedUser.img || null);
      } else {
        // Reset form if not in edit mode
        setIsEditMode(false);
        setName("");
        setEmail("");
        setMobileNumber("");
        setDesignation("");
        setGender("");
        setCourse([]);
        setImg(null);
      }
    }, [selectedUser]);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        setImg(file);
        setErrorMessage("");
      } else {
        setErrorMessage("Please upload a valid JPEG or PNG image.");
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = {
        Name,
        email,
        mobileNumber,
        designation,
        gender,
        course,
        img
      };
  
      // Call onSubmit with the form data (parent handles create or update)
      onSubmit(formData, isEditMode);
    };
  
    const handleChange = (e) => {
      const value = e.target.value;
      setCourse((prev) =>
        e.target.checked ? [...prev, value] : prev.filter((item) => item !== value)
      );
    };
  
    return (
        <>
        <Navbar/>
         <div className='w-full h-full flex justify-center rounded-2xl'>
        <form onSubmit={handleSubmit} className="space-y-5 mt-5 shadow-xl p-5">
          <div className="flex flex-col justify-between mb-7">
            <label className="text-stone-500 text-sm">Name
              <input
                id="Name"
                type="text"
                className="w-full bg-white p-2 rounded-md text-black border border-1 border-slate-500"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
  
            <label className="text-stone-500 text-sm">Email
              <input
                id="Email"
                type="text"
                className="w-full bg-white p-2 rounded-md text-black border border-1 border-slate-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
  
            <label className="text-stone-500 text-sm">Mobile Number
              <input
                id="MobileNumber"
                type="text"
                className="w-full bg-white p-2 rounded-md text-black border border-1 border-slate-500"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </label>
  
            <label className="text-sm text-gray-500">Designation
              <select
                id="reason"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full bg-white p-2 text-gray-500 rounded-md text-black border border-1 border-slate-500"
              >
                <option>Select designation</option>
                <option>Hr</option>
                <option>Manager</option>
                <option>Sales</option>
              </select>
            </label>
  
            <div onChange={(e) => setGender(e.target.value)} className='text-gray-500 text-sm'>
              Gender:
              <div className='space-x-4 text-gray-500 text-sm ml-14'>
                <input type="radio" checked={gender === 'MALE'} value="MALE" name="gender" /> Male
                <input type="radio" checked={gender === 'FEMALE'} value="FEMALE" name="gender" /> Female
              </div>
            </div>
  
            <div className='text-gray-500 text-sm'>
              Course:
              <div className='ml-16'>
                <div>
                  <input value="MCA" type="checkbox" checked={course.includes("MCA")} onChange={handleChange} />
                  <span> MCA </span>
                </div>
                <div>
                  <input value="BCA" type="checkbox" checked={course.includes("BCA")} onChange={handleChange} />
                  <span> BCA </span>
                </div>
                <div>
                  <input value="BSC" type="checkbox" checked={course.includes("BSC")} onChange={handleChange} />
                  <span> BSC </span>
                </div>
              </div>
            </div>
  
            <div className='mb-0'>
              <label className="text-stone-500 text-sm">Upload Photo
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                  className="w-full bg-white p-2 rounded-md text-black border border-1 border-slate-500"
                />
              </label>
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </div>
          </div>
  
          <div className='mt-4'>
            <button
              type="submit"
              className="w-full rounded-full text-white text-lg bg-blue-600 hover:bg-blue-500 transition-duration-300 p-1"
            >
              {isEditMode ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div></>
     
    );
  }
  
  export default CreateOrEditUser;