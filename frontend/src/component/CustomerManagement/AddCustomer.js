import React,{useEffect,useState} from 'react'
import axios from "axios";
import { useHistory , useParams } from "react-router-dom";
import swal from "sweetalert";
import { useForm } from "react-hook-form";


export default function AddCustomer() {

    const { register, handleSubmit, formState: { errors }} = useForm();
    let history = useHistory();
    let path2 = '/public/login';
    //let path2 = '/testing';

    const [name,setname] = useState("");
    const [email, setEmail] = useState("");
    const [contactNo, setcontactNo] = useState("");
    const [gender, setgendero] = useState("");
    const [nic, setnic] = useState("");
    const [dob, setdob] = useState("");
    const [image, setimage] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");


    const postDetails = async e=>{
        const files = e.target.files
        const data = new FormData()
        data.append("file",files[0])
        // data.append("file",image)
        data.append("upload_preset","movie-app")
        data.append("cloud_name","padfoot")
        data.append("folder","ITPM/customer")
        const res = await
        fetch("https://api.cloudinary.com/v1_1/padfoot/image/upload",{
          method:"post",
          body:data 
        })
        .then(res=>res.json())
        .then(data=>{
            setimage(data.url)
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

        const newCustomer ={
            name,
            email,
            contactNo,
            gender,
            nic,
            dob,
            image,
            username,
            password,  
        }
        axios.post('/user/register', newCustomer).then(()=>{
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
        <center><h1 style={{letterSpacing:"5px", fontSize:"30px" , fontWeight:"600"}}>CUSTOMER REGISTRATION</h1></center>
    <div className="register">
    <div className="registerin" style={{margin:"40px"}}>
     
          <form className="needs-validation" noValidate>
         <center> <div className="col-md-6">
             <label for="floatingInput" style={{marginBottom:"10px", fontSize:"18px"}}>Profile Image</label><br/>
              <label for="profile" style={{marginBottom:"20px"}}>
                <div className="card poster">
                
                  {image === ""?<center><h4 style={{marginTop:"50px"}}>Preview</h4></center>:<center>
                      <img src={image} className="posterimg" style={{width: "150px"}}/></center>}  
                         
               </div> 
               </label> 
               <br/>
                        <input type="file" className="form-control logininput" id="poster" placeholder="Profile Image"
                          onChange={postDetails} required/>
     
              </div></center>
              <br/>
          <div className="row g-2">
          <div className="col-md-6 form-floating">
                        <input type="text" className="form-control logininput" {...register("name",{ required:true})}  id="username" placeholder="Customer Name"
                          onChange={(e) => {
                            setname(e.target.value);
                          } } required/>
                          <label for="floatingInput">Customer Name</label>
                          {errors?.name?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)}
                      </div>
    
              <div className="col-md-6 form-floating">
              <input type="text" className="form-control logininput" id="contact" placeholder="Contact Number"
                  onChange={(e) => {
                      setcontactNo(e.target.value);
                  }} required/>
                  <label for="floatingInput">Contact Number</label>
                      </div>
            </div>
            <br/>
    
            <div className="row g-2">
              <div className="col-md-6 form-floating">
              <input type="text" className="form-control logininput" {...register("nic",{pattern:/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/, required:true})} id="nic" placeholder="nic"
                          onChange={(e) => {
                            setnic(e.target.value);
                          } } required/>
                          <label for="floatingInput">Nic Number</label>
                          {errors?.nic?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)}
                          {errors?.nic?.type === "pattern"  && (<p style={{ color:"red"}}>*Invalid Nic Number</p>)}
              </div>
    
              <div className="col-md-6 form-floating">
                        <input type="date" className="form-control logininput" id="dob" placeholder="Date of Birth"
                          onChange={(e) => {
                            setdob(e.target.value);
                          } } required/>
                          <label for="floatingInput">Date of Birth</label>
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
    
              <div className="col-md-6 ">
              <select type="text" className="form-control logininput" id="gender" placeholder="gender"
                  onChange={(e) => {
                    setgendero(e.target.value);
                  } } required>      
                  <option defaultValue>Select Gender...</option>
                  <option>Male</option>
                  <option>Female</option></select>
                      </div>
                      <br/>

            <div className="row g-2">
             <div className="col-md-6 form-floating">
                <input type="text" className="form-control logininput" id="username" placeholder="Customer username"
                          onChange={(e) => {
                            setusername(e.target.value);
                          } } required/>
                          <label for="floatingInput">Customer Username</label>
                      </div>


             <div className="col-md-6 form-floating">
                <input type="password" className="form-control logininput" id="password" placeholder="Password"
                          onChange={(e) => {
                            setpassword(e.target.value);
                          } } required/>
                          <label for="floatingInput">Password</label>
                      </div>  
                      </div>        
    
              </div>
              <br/>
            
          
          <button type="submit" className="btnregister" onClick={handleSubmit(sendData)} id="regsubmit">Register</button>&nbsp;&nbsp;
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
    
