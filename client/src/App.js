import './App.css';
import React, { useState } from 'react';
import Axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [age,setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [newSalary, setNewSalary] = useState(0);
  //const [salary, newSalary] = useState(0);

  const addEmployee = () => {
    /*Axios.post("http://localhost:8000/create",JSON.stringify({
      name: name,
      age: age,
      country: country,
      position: position,
      salary: salary,
    }),{Headers:{"Content-Type":"application/x-www-form-urlencoded"}}).then(() =>{
      console.log("success");
    }).catch(err => {
      console.log('Oh noooo!!');
      console.log(err);
    });*/
    //post Request
    Axios({  
      method: 'post',  
      url: 'http://localhost:8000/create',  
      data: {  
        name: name,
        age: age,
        country: country,
        position: position,
        salary: salary,  
      }  
    });
    
  };
  //get Request
  const getEmployee = () => {
 Axios({
   method: 'get',
     url: 'http://localhost:8000/employees',
 }).then((response) =>{
  setEmployeeList(response.data);
}).catch(err => {
  console.log('Oh noooo!!');
  console.log(err);
});
  };
  //update Request
  const updateEmployeeSalary = (ID) =>{
    Axios({
    method: 'put',
    url: "http://localhost:8000/update",
     Salary: newSalary,
      ID: ID,
    }).then((response) =>{
      //console.log("Updated")
      alert("Updated");
      console.log("update successfully");
      console.log(newSalary);
      //console.log(salary);
    }).catch(err => {
      console.log('Oh noooo!!');
      console.log(err);
    });
    };
    //Delete Request
    const deleteEmployee = (ID) => {
      Axios({
      method: 'delete',
      url: `http://localhost:8000/delete/${ID}`
      }).then((response) => {
        alert("Deleted");
        console.log("Deleted");
      }).catch(err => {
        console.log('ohhhh noooo error');
        console.log('err');
      });
    };
  return (
    <div className="App">
     <div className="Information">
       
       <label>Name</label>
       <input type = "text" onChange={(event) =>{setName(event.target.value)}}/>
       <label>Age</label>
       <input type = "number" onChange={(event) =>{setAge(event.target.value)}}/>
       <label>Country</label>
       <input type = "text" onChange={(event) =>{setCountry(event.target.value)}}/>
       <label>Position</label>
       <input type = "text" onChange={(event) =>{setPosition(event.target.value)}}/>
       <label>Salary</label>
       <input type = "number" onChange={(event) =>{setSalary(event.target.value)}}/>
       <button onClick = {addEmployee}>Add Employee</button>
       
     </div>
     <div className='employees'>
     <button onClick={getEmployee}>Show Employee</button>
     {employeeList.map((val, key) =>{
       return(
         <div className='employeeSystem'>
           <div>
       <h3>Name:  {val.Name}</h3>
       <h3>Age:  {val.Age}</h3>
       <h3>Country:  {val.Country}</h3>
       <h3>Position:  {val.Position}</h3>
       <h3>Salary:  {val.Salary}</h3>
       </div>
       <div>
      {" "}
    <input 
    type="text"
    placeholder='2000....'
    onChange={(event) =>{
      setNewSalary(event.target.value);
    }}
    />
    <button onClick={() =>{updateEmployeeSalary(val.ID);
    }}
    >
      {" "}
      Update
      </button>
      <button onClick={() => {deleteEmployee(val.ID)}}>Delete</button>
    </div>
    </div>
       );
     })}

     </div>
     </div>
    
  
    
  );
}

export default App;
