import React,{useState,useEffect} from "react";
import{Link} from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";


const Home= ()=>{
    const[data,setData]=useState([]);

    const loadData=async ()=>{
        const response= await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(()=>{
        loadData();
    },[]);

    const deleteContact=(id)=>{
        if(window.confirm("ARe you sure that delete this information ?")) {
            axios.delete('http://localhost:5000/api/remove/${id}');
            toast.success("Information deleted successfully")
            setTimeout(()=> loadData(),500);
        }
    }
    return(
        <div style={{marginTop:"150px"}}>
            <Link to="/addcontact">
                <button>Add information</button>
            </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{textAlign:"center"}}>ID</th>
                        <th style={{textAlign:"center"}}>First NAme</th>
                        <th style={{textAlign:"center"}}>Last Name</th>
                        <th style={{textAlign:"center"}}>Location</th>
                        <th style={{textAlign:"center"}}>Email</th>
                        <th style={{textAlign:"center"}}>DOB</th>
                        <th style={{textAlign:"center"}}>Education</th>
                        <th style={{textAlign:"center"}}>About</th>
                        <th style={{textAlign:"center"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item,index) =>{
                        return(
                            <tr key={item.id}>
                                <th scope="row">{index+1}</th>
                                <td>{item.fname}</td>
                                <td>{item.lname}</td>
                                <td>{item.location}</td>
                                <td>{item.email}</td>
                                <td>{item.dob}</td>
                                <td>{item.education}</td>
                                <td>{item.about}</td>
                                <td>
                                    <Link to={'/update/${item.id}'}>
                                        <button className="btn btn-edit">Edit</button>
                                    </Link>
                                    <button className="btn btn-delete" onClick={()=>deleteContact(item.id)}>Delete</button>
                                    <Link to={'/view/${item.id}'}>
                                        <button className="btn btn-view">View</button>

                                    </Link>
                                </td>
                            
                            </tr>
                            
                        )

                    })}
                </tbody>
            </table>
           
        </div>
    )
}
export default Home;