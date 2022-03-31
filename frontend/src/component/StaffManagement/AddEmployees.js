import React,{useEffect,useState} from 'react'
import axios from "axios";
import { Link, useHistory , useParams } from "react-router-dom";
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
    const [code,setCODE] = useState("+94");




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
            code,
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
    <div className="container customcon">
      
    <br/>
    <center><h1 style={{letterSpacing:"5px", fontSize:"30px" , fontWeight:"600"}}>ADD NEW MEMBER</h1></center>
<div className="register">
<div className="registerin" style={{margin:"40px"}}>
 
      <form className="needs-validation" noValidate>
     <center> <div className="col-md-6">
         <label for="floatingInput" style={{marginBottom:"10px", fontSize:"18px"}}>Profile Image</label><br/>
          <label for="profile" style={{marginBottom:"20px"}}>
            <div className="card poster">
            
              {profileImg === ""?<center><h4 style={{marginTop:"50px"}}>Preview</h4></center>:<center><img src={profileImg} className="posterimg"/></center>}  
                     
           </div> 
           </label> 
           <br/>
                    <input type="file" {...register("profileImg",{ required:true})} className="form-control logininput" id="poster" placeholder="Profile Image"
                      onChange={postDetails} required/>
                      {errors?.profileImg?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)}
 
          </div></center>
          <br/>
      <div className="row g-3">
      <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" {...register("name",{ required:true})} id="username" placeholder="Employee Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      } } />
                      <label for="floatingInput">Employee Name</label>
                      {errors?.name?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)}

                  </div>

          <div className="col-md-1 form-floating">
          <input type="text" className="form-control logininput" {...register("code",{ required:true})} id="contact" placeholder="+94" defaultValue="+94"
              onChange={(e) => {setCODE(e.target.value);
              }} required/>
              <label for="floatingInput">  Code</label>
              {errors?.code?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)}

                  </div>

          <div className="col-md-4 form-floating">
          <input type="text" className="form-control logininput" id="contact" {...register("contact",{ pattern:/^\d{9}$/, required:true})} placeholder="Contact Number"
              onChange={(e) => {setcontactNo(e.target.value);
              }} required/>
              <label for="floatingInput">Contact Number</label>
              {errors?.contact?.type === "pattern"  && (<p style={{ color:"red"}}>*Invalid Contact Number</p>)}
              {errors?.contact?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)}

                  </div>
        </div>
        <br/>

        <div className="row g-2">
          <div className="col-md-6 form-floating">
          <input type="text" className="form-control logininput" {...register("nic",{pattern:/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/, required:true})} id="nic" placeholder="nic"
                      onChange={(e) => {
                        setNic(e.target.value);
                      } } required/>
                      <label for="floatingInput">Nic Number</label>
                      {errors?.nic?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)}
                      {errors?.nic?.type === "pattern"  && (<p style={{ color:"red"}}>*Invalid Nic Number</p>)}

              
          </div>

          <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" {...register("jobtitle",{ required:true})} id="jobtitle" placeholder="Job Title"
                      onChange={(e) => {
                        setJobtitle(e.target.value);
                      } } required/>
                      <label for="floatingInput">Job Title</label>
                      {errors?.jobtitle?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)}

                  </div>
        </div>
        <br/>

<div className="row g-2">
  <div className="col-md-6 form-floating">
  <input type="text" className="form-control logininput" {...register("email",{ pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, required:true})} id="email" placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              } } required/>
              <label for="floatingInput">Email</label>
              {errors?.email?.type === "pattern" && (<p style={{ color:"red"}}>*email format is Incorrect</p> )}
              {errors?.email?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)}

      
  </div>

  <div className="col-md-6 form-floating">
              <input type="text" className="form-control logininput" {...register("age",{ required:true})} id="age" placeholder="Age"
                      onChange={(e) => {
                        setAge(e.target.value);
                      } } required/>
                      <label for="floatingInput">Age </label>
                      {errors?.age?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)}

              
          </div>
</div>

        <br/>
        <div className="row g-2">
        <div className="col-md-6">
        <select type="text" className="form-control logininput" id="martialstatus" {...register("martialstatus",{ required:true})} placeholder="Martial Status"
              onChange={(e) => {
                setMartialStatus(e.target.value);
              } } required>      
              <option defaultValue>Select Martial Status...</option>
              <option>Single</option>
              <option>Married</option></select>
              {errors?.martialstatus?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)}

                                 
             
          </div>

          <div className="col-md-6">
          <select type="text" className="form-control logininput" id="gender" {...register("gender",{ required:true})} placeholder="gender"
              onChange={(e) => {
                setGender(e.target.value);
              } } required>      
              <option defaultValue>Select Gender...</option>
              <option>Male</option>
              <option>Female</option></select>
              {errors?.gender?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)}

                  </div>

          </div>
          <br/>
          <div className="col-md-6">
                      &nbsp;&nbsp;<label for="floatingInput">Address</label> 
                      <textarea rows="3" className="form-control logininput" {...register("address",{ required:true})} id="address" placeholder="Address"
              onChange={(e) => {setAddress(e.target.value);
              }} required/>
             {errors?.address?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)}

                                 
             
          </div>
          <br/>
   

      
      <button type="submit" className="btnregister" onClick={handleSubmit(sendData)} id="regsubmit">Submit</button>&nbsp;&nbsp;&nbsp;&nbsp;
      <button type="reset" className="btnreset" id="regreset">Reset</button>&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/user/viewallstaff"><button type="button" className="btnreset" id="regreset">Cancel</button></Link>
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