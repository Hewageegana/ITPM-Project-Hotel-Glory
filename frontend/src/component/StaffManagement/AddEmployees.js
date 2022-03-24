import React,{useEffect,useState} from 'react'
import axios from "axios";
import { useHistory , useParams } from "react-router-dom";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import './addemployee.css'

function AddEmployees() {

    const { register, handleSubmit, formState: { errors }} = useForm();
    let history = useHistory();
    // let path = '/public/login';
    let path2 = '/testing';

    const [user,setUser] = useState([]);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [contactNo, setcontactNo] = useState("");
    const [nic, setNic] = useState("");
    const [profileImg, setProfileImg] = useState("");
    const [address, setAddress] = useState("");

    const [gender, setGender] = useState("");
    // const [image, setImage] = useState("");
    const [jobtitle,setJobtitle] = useState("");
    const [martialStatus,setMartialStatus] = useState("");
    const [age,setAge] = useState("");

    const postDetails = async e=>{
        const files = e.target.files
        const data = new FormData()
        data.append("file",files[0])
        // data.append("file",image)
        data.append("upload_preset","movie-app")
        data.append("cloud_name","padfoot")
        data.append("folder","ITPM/staff")
        const res = await
        fetch("https://api.cloudinary.com/v1_1/padfoot/image/upload",{
          method:"post",
          body:data 
        })
        .then(res=>res.json())
        .then(data=>{
            setProfileImg(data.url)
        })
        .catch(err=>{
          console.log(err)
        })
      }

    //   useEffect(()=>{
    //       const fetchUser = async ()=>{

    //       }
    //   })

    function sendData(e){

        const newEmployee ={
            name,
            contactNo,
            address,
            nic,
            gender,
            jobtitle,
            martialStatus,
            age,
            profileImg,
            email
        }
        axios.post('/staff/addstaff', newEmployee).then(()=>{
            swal({
                title: "Success!",
                text: "Your Successfully registered",
                icon: "success",
                button: "Ok",
            });history.push(path2);
        }).catch((e)=>{
            swal("Please fill Form correctly" +e);
        })
    };

  return (
    <>
    <br/>
    <div className="container">
      
    <br/>
    <center><h1 style={{letterSpacing:"5px", fontSize:"30px" , fontWeight:"600"}}>ADD NEW MEMBER</h1></center>
<div className="register">
<div className="registerin" style={{margin:"40px"}}>
 
      <form className="needs-validation" noValidate>
     <center> <div className="col-md-6">
         <label for="floatingInput" style={{marginBottom:"10px", fontSize:"18px"}}>Profile Image</label><br/>
          <label for="profile" style={{marginBottom:"20px"}}>
            <div className="card poster">
            
              {profileImg === ""?<center><h4 style={{marginTop:"50px"}}>Preview</h4></center>:<center><img src={profileImg} className="posterimg" style={{width: "150px"}}/></center>}  
                     
           </div> 
           </label> 
           <br/>
                    <input type="file" className="form-control logininput" id="poster" placeholder="Profile Image"
                      onChange={postDetails} required/>
 
          </div></center>
          <br/>
      <div className="row g-2">
      <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" id="username" placeholder="Employee Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      } } required/>
                      <label for="floatingInput">Employee Name</label>
                  </div>

          <div className="col-md-6 form-floating">
          <input type="text" className="form-control logininput" id="contact" placeholder="Contact Number"
              onChange={(e) => {setcontactNo(e.target.value);
              }} required/>
              <label for="floatingInput">Contact Number</label>
                  </div>
        </div>
        <br/>

        <div className="row g-2">
          <div className="col-md-6 form-floating">
          <input type="text" className="form-control logininput" id="nic" placeholder="nic"
                      onChange={(e) => {
                        setNic(e.target.value);
                      } } required/>
                      <label for="floatingInput">Nic Number</label>
              
          </div>

          <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" id="jobtitle" placeholder="Job Title"
                      onChange={(e) => {
                        setJobtitle(e.target.value);
                      } } required/>
                      <label for="floatingInput">Job Title</label>
                  </div>
        </div>
        <br/>

<div className="row g-2">
  <div className="col-md-6 form-floating">
  <input type="text" className="form-control logininput" {...register("email",{ pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/})} id="email" placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              } } required/>
              <label for="floatingInput">Email</label>
              {errors.email && (<p style={{ color:"red"}}>*email format is Incorrect</p> )}
      
  </div>

  <div className="col-md-6 form-floating">
              <input type="text" className="form-control logininput" id="age" placeholder="Age"
                      onChange={(e) => {
                        setAge(e.target.value);
                      } } required/>
                      <label for="floatingInput">Age </label>
              
          </div>
</div>

        <br/>
        <div className="row g-2">
        <div className="col-md-6">
        <select type="text" className="form-control logininput" id="martialstatus" placeholder="Martial Status"
              onChange={(e) => {
                setMartialStatus(e.target.value);
              } } required>      
              <option defaultValue>Select Martial Status...</option>
              <option>Single</option>
              <option>Married</option></select>
                                 
             
          </div>

          <div className="col-md-6">
          <select type="text" className="form-control logininput" id="gender" placeholder="gender"
              onChange={(e) => {
                setGender(e.target.value);
              } } required>      
              <option defaultValue>Select Gender...</option>
              <option>Male</option>
              <option>Female</option></select>
                  </div>

          </div>
          <br/>
          <div className="col-md-6">
                      &nbsp;&nbsp;<label for="floatingInput">Address</label> 
                      <textarea rows="3" className="form-control logininput" id="address" placeholder="Address"
              onChange={(e) => {setAddress(e.target.value);
              }} required/>
                                 
             
          </div>
          <br/>
   

      
      <button type="submit" className="btnregister" onClick={handleSubmit(sendData)} id="regsubmit">Submit</button>&nbsp;&nbsp;
      <button type="reset" className="btnreset" id="regreset">Reset</button>

      </form>     
       </div>
      </div>
      <br/>
    </div>
    <br/>
    </>
  )
}

export default AddEmployees