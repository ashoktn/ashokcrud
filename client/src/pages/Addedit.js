import React,{useState,useEffect} from "react";
import {useHistory,useParams,Link, useNavigate} from "react-router-dom";
import "./Addedit.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState={
    fname:"",
    lname:"",
    location:"",
    email:"",
    dob:"",
    education:"",
    about:"",
};



const Addedit =() =>{
    const [state,setState]=useState("initialState");

    const{fname,lname,location,email,dob,education,about} =state;

    const navigate=useNavigate();

    const{id}=useParams;

    useEffect(()=>{
        axios.get('http://localhost:5000/api/get/${id}') 
        .then((resp)=> setState({...resp.data[0] }));

    },[id])

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!fname || !lname || !location || !email || !dob || !education || !about) {
            toast.error("plese provide values in all the input feilds");
        } else {
           if(!id){
            axios
            .post("http://localhost:5000/api/post", {
                fname,
                lname,
                location,
                email,
                dob,
                education,
                about,
            }) 
            .then(()=>{
                setState({fname: "", lname: "", location: "", email: "", dob: "", education: "", about: "" });
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("information added successfully");

           } else{
            axios
            .put('http://localhost:5000/api/update/${id}', {
                fname,
                lname,
                location,
                email,
                dob,
                education,
                about,
            }) 
            .then(()=>{
                setState({fname: "", lname: "", location: "", email: "", dob: "", education: "", about: "" });
            })
            .catch((err) => toast.error(err.response.data));
            toast.success("information updated  successfully");



           }
            setTimeout(() => {
                navigate.push("/");
            },500);
        }
    };

    const handleInputChange=(e) =>{
        const{ name,value}=e.target;
        setState({...state, [name]: value});
    };
    return(
        <form style={{
            margin:"auto",
            alignContent:"center",
        }}
        onSubmit={handleSubmit}>
            <label>First Name</label>
            <input type="text" id="fname" name="fname" value={fname  ||""} placeholder="Enteryour Firstname" onChange={handleInputChange} />
            <label>Last Name</label>
            <input type="text" id="lname" name="lname" value={lname  ||""} placeholder="Enteryour Lastname" onChange={handleInputChange} />
            <label>Location</label>
            <input type="text" id="location" name="location" value={location  ||""} placeholder="Enteryour curent location" onChange={handleInputChange} />
            <label>Email</label>
            <input type={"email"} id="email" name="email" value={email  ||""} placeholder="Enteryour E-mail" onChange={handleInputChange} />
            <label>DOB</label>
            <input type="text" id="dob" name="dob" value={dob ||""} placeholder="Enteryour Date of Borth" onChange={handleInputChange} />
            <label>Education</label>
            <input type="text" id="education" name="education"value={education  ||""} placeholder="Education qualification"  onChange={handleInputChange} />
            <label>About</label>
            <input type="text" id="about" name="about" value={about  ||""} placeholder="Tell about Yourself" onChange={handleInputChange} />
            <input type="submit" value={id ? "update" : "save"}/>
            <Link to="/">
                <input type="button" value="go back"/>
            </Link>
            

        </form>
    )
}
export default Addedit;