import React,{useEffect,useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import './addemployee.css'
import { Link , useParams } from "react-router-dom";
import { useForm } from "react-hook-form";


function UpdateEmployee() {

    let history = useHistory();
    let path = '/public/login';
    let path2 = '/user/viewallstaff'
    const {id} = useParams();
    const { register, handleSubmit, formState: { errors }} = useForm();


    const [user,setUser] = useState([]);
    const [staff,setStaff] = useState([]);
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

    useEffect(()=>{
        axios.get(`/staff/getStaff/${id}`).then((res)=>{
            setStaff(res.data.staff)
            setEmail(res.data.staff.email)
            setcontactNo(res.data.staff.contactNo)
            setCODE(res.data.staff.code)
          setName(res.data.staff.name)
          setNic(res.data.staff.nic)
          setProfileImg(res.data.staff.profileImg)
          setAddress(res.data.staff.address)
          setGender(res.data.staff.gender)
          setMartialStatus(res.data.staff.martialStatus)
          setAge(res.data.staff.age)
          setJobtitle(res.data.staff.jobtitle)
        }).catch((e)=>{
          window.location.href = "/public/login"
          swal({title: "unauthorized",
          text: "Please Login First "+e,
          icon: "warning"} ); 
      })
    }, [])

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

      function sendData(e){
  
          const updateEmployee ={
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
          axios.put(`/staff/staffupdate/${id}`, updateEmployee).then(()=>{
              swal({
                  title: "Success!",
                  text: "Employee Updated Successfully ",
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
                    <input type="file" defaultValue={staff.profileImg} className="form-control logininput" id="poster" placeholder="Profile Image"
                      onChange={postDetails}/>
                      {/* {errors?.profileImg?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)} */}
 
          </div></center>
          <br/>
      <div className="row g-3">
      <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" defaultValue={staff.name} id="username" placeholder="Employee Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      } } required/>
                      <label for="floatingInput">Employee Name</label>
                      {/* {errors?.name?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)} */}

                  </div>

          <div className="col-md-1 form-floating">
          <input type="text" className="form-control logininput" id="contact" placeholder="+94" defaultValue={staff.code}
              onChange={(e) => {setCODE(e.target.value);
              }} required/>
              <label for="floatingInput">  Code</label>
              {/* {errors?.code?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)} */}

                  </div>

          <div className="col-md-4 form-floating">
          <input type="text" className="form-control logininput" defaultValue={staff.contactNo} id="contact" {...register("contact",{ pattern:/^\d{9}$/})} placeholder="Contact Number"
              onChange={(e) => {setcontactNo(e.target.value);
              }} required/>
              <label for="floatingInput">Contact Number</label>
              {errors?.contact?.type === "pattern"  && (<p style={{ color:"red"}}>*Invalid Contact Number</p>)}

                  </div>
        </div>
        <br/>

        <div className="row g-2">
          <div className="col-md-6 form-floating">
          <input type="text" className="form-control logininput" defaultValue={staff.nic} {...register("nic",{pattern:/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/, required:true})} id="nic" placeholder="nic"
                      onChange={(e) => {
                        setNic(e.target.value);
                      } } required/>
                      <label for="floatingInput">Nic Number</label>
                      {errors?.nic?.type === "pattern"  && (<p style={{ color:"red"}}>*Invalid Nic Number</p>)}

              
          </div>

          <div className="col-md-6 form-floating">
                    <input type="text" className="form-control logininput" defaultValue={staff.jobtitle} id="jobtitle" placeholder="Job Title"
                      onChange={(e) => {
                        setJobtitle(e.target.value);
                      } } required/>
                      <label for="floatingInput">Job Title</label>
                      {/* {errors?.jobtitle?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)} */}

                  </div>
        </div>
        <br/>

<div className="row g-2">
  <div className="col-md-6 form-floating">
  <input type="text" className="form-control logininput" defaultValue={staff.email} {...register("email",{ pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/})} id="email" placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              } } required/>
              <label for="floatingInput">Email</label>
              {errors?.email?.type === "pattern" && (<p style={{ color:"red"}}>*email format is Incorrect</p> )}
              {/* {errors?.email?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)} */}

      
  </div>

  <div className="col-md-6 form-floating">
              <input type="text" className="form-control logininput" defaultValue={staff.age} id="age" placeholder="Age"
                      onChange={(e) => {
                        setAge(e.target.value);
                      } } required/>
                      <label for="floatingInput">Age </label>
                      {/* {errors?.age?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)} */}

              
          </div>
</div>

        <br/>
        <div className="row g-2">
        <div className="col-md-6">
        <select type="text" className="form-control logininput" defaultValue={staff.martialStatus} id="martialstatus" placeholder="Martial Status"
              onChange={(e) => {
                setMartialStatus(e.target.value);
              } }>      
              <option defaultValue>{staff.martialStatus}</option>
              {staff.martialStatus === "Single"?<option>Single</option>:<option>Married</option>}
              </select>
              {/* {errors?.martialstatus?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)} */}

                                 
             
          </div>

          <div className="col-md-6">
          <select type="text" className="form-control logininput"  defaultValue={staff.gender} id="gender" placeholder="gender"
              onChange={(e) => {
                setGender(e.target.value);
              } }>      
              <option defaultValue>{staff.gender}</option>
              {staff.gender === "Male"? <option>Female</option>: <option>Male</option>}
              </select>
              {/* {errors?.gender?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)} */}

                  </div>

          </div>
          <br/>
          <div className="col-md-6">
                      &nbsp;&nbsp;<label for="floatingInput">Address</label> 
                      <textarea rows="3" className="form-control logininput" defaultValue={staff.address} id="address" placeholder="Address"
              onChange={(e) => {setAddress(e.target.value);
              }} required/>
             {/* {errors?.address?.type === "required"  && (<p style={{ color:"red"}}>*Required</p>)} */}

                                 
             
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

export default UpdateEmployee