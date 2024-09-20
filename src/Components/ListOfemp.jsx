import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import ListTable from './ListTable';
import axios from 'axios';


function ListOfemp() {
  // console.log(users);
    const [data, setData] = useState([]);
    const [searchItem, setSearchItem] = useState("");
    const [searchResult, setSearchResult] = useState([""]);
    const [sortField, setSortField] = useState("");
    const [currentPage ,setCurrentPage]= useState(1);
    const recordsPerPage = 7;

    useEffect(() => {
      async function Get() {
        try {
      
            const response = await axios.get(
              `http://localhost:5000/Employee`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
              }
            );
            console.log(response)
            setData(response.data);
            setSearchResult(response.data);
  
            // setLoading(false);
          
        } catch (error) {
          console.log(error.response.data.message);
         
        }
      }
  
      Get();
    }, []);
   
    useEffect(() => {
      async function handleSortSearch () {
        // console.log(data,"data")
        let sortedData = data;
      // console.log(sortField)
        if (sortField) {
          sortedData = [...data].sort((a, b) => {
            if (a[sortField] < b[sortField]) return -1;
            if (a[sortField] > b[sortField]) return 1;
            return 0;
          });
          // console.log(sortedData);
        }
         if (searchItem) {
          const result =  await axios.get(
            `http://localhost:5000/Employee/search?query=${searchItem.toString()} `,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            })
           
          sortedData =result.data ;
        // console.log(sortedData);
        }
        // console.log(sortedData);
        const lastIndex = currentPage * recordsPerPage;
      const firstIndex = lastIndex - recordsPerPage;
      const paginatedData = sortedData.slice(firstIndex, lastIndex);
  // console.log(paginatedData)
        setSearchResult(paginatedData);
      };
  
      handleSortSearch();
  
    },[sortField, searchItem, data,currentPage ]);
    
    const npages = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);
  

 
  function prePage(){
    if(currentPage > 1){
      setCurrentPage(currentPage-1);
    }
}
function changepage(id){
 
setCurrentPage(id);

}
function nextPage(){
        if(currentPage < npages){
                    setCurrentPage(currentPage + 1);
        }
}
const handleDeleteUser = (id) => {
  // Filter out the deleted user from the data state
  setData(data.filter((user) => user._id !== id));
};

  return (
    <div>
        <Navbar/>
        <div className="flex flex-col   lg:rectangle lg:ml-4 Sm:mb-12  lg:absolute  md:absolute md:mt-5 Sm:mt-10 lg:bg-white   rounded-xl lg:top-[5rem] sm:top-[11rem] ">
        <div className="flex flex-col sm:flex-row Sm:flex-row lg:justify-between  lg:mb-2">
          <div className="flex items-center box-border  border-b border-gray-400  m-3 ">
            <div className="mt-5 p-1 Sm:mt-1 text-gray-300 lg:block  ">
              {/* <FaSearch /> */}
              {/* Search */}
            </div>
            <input
              type="text"
              placeholder="Search"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              className="p-1 text-xl rounded-l text-gray-700 lg:bg-white Sm:bg-gray-100 border-none  Sm:m-0"
            />
          </div>
          <div className="flex lg:flex-row   items-center p-2">
          <label className="mr-2 Sm:hidden lg:block ">Sort By : </label>
          {/* <button className="filter-icon-button">
          <span className="Sm:text-3xl Sm:mt-2 ml-[-7px] Sm:text-gray-400 lg:hidden Sm:block" onClick={toggleDropdown}><BsFilterLeft/></span>
        </button> */}
            <select
              id="reason"
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="p-1 border-b-2 Sm:hidden lg:block "
            >
              <option>fields</option>
              <option>name</option>
              <option>id</option>
              <option>email</option>
              <option>createdAt</option>
              
            </select>
        
           
          </div>
        </div>
        <ListTable data={ searchItem || sortField ? searchResult : data }
              // onUpdateStatus={""}
              ondelete={handleDeleteUser}
              />

<nav className="bg-gray-100">
          <ul className="flex items-center justify-center space-x-2  ">
            <li className="page-item ">
              <button className="page-link p-1 bg-blue-300 rounded-xl mb-3" onClick={prePage}>Prev</button>
            </li>
            {numbers.map((n, i) => (
              <li key={i} className={`page-item p-4 ${currentPage === n ? "active" : ""}`}>
                <button className="page-link mb-3" onClick={() => { return changepage(n) }}>
                  {n}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button className="page-link p-1 bg-blue-300 mb-3  rounded-xl" onClick={nextPage}>Next</button>
            </li>
          </ul>
        </nav>
</div>
    </div>
  )
}

export default ListOfemp
