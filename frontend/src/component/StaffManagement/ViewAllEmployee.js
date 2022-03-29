import React, { useEffect, useState} from "react";
import axios from "axios";
import { useHistory, Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import jspdf from 'jspdf'
import "jspdf-autotable"
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import logo from '../../Assets/Images/HotalLOGOLarge.png'
import imgDefault from '../../Assets/Images/postman.png'
import call from '../../Assets/Icons/call.png'
import job from '../../Assets/Icons/job.png'
import './viewallemployee.css'
import identity from '../../Assets/Icons/identity-card.png'
import img from '../../Assets/Images/HotalLOGOLarge.png'
import mail from '../../Assets/Icons/mail.png'


function ViewAllEmployee() {

    let history = useHistory();
    let path = '/public/login';
    const [searchTerm, setsearchTerm] = useState("");
    const [user, setUser] = useState([]);
    // const [pageNumber, setPageNumber] = useState(0);
    const [staff, setStaff] = useState([]);
    const [imageLoad, setImageLoad] = useState(true);

    useEffect(()=>{
        const getstaff = async()=>{
         const res = await axios.get('/staff/allstaff').then((res)=>{
            setStaff(res.data);
          }).catch(()=>{
            window.location.href = "/public/login"
            swal({title: "unauthorized",
            text: "Please Login First",
            icon: "warning"} ); 
        })
        }
        getstaff();
      }, []);


      const deleteStaff=(id) =>{
        swal({
            title: "Are you sure?",
            text: "Employee Will be permenatly remove from System",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
        axios.delete(`/staff/deletestaff/${id}`).then(()=>{
              
            if (willDelete) {
              swal("The Employee has been deleted!", 
              {icon :"success",});  
              setTimeout(function(){
              window.location.reload();
               },1000);
            } else {
              swal("Empoyee Is Not Deleted");}
          })
        }});
      }

        //generate PDF
  const generatePDF = tickets => {

    const doc = new jspdf();
    const tableColumn = ["Name", "Nic No", "Job Title", "Contact No","Email"];
    const tableRows = [];
    

    tickets.map(ticket => {
        const ticketData = [
            ticket.name,
            ticket.nic,
            ticket.jobtitle,
            ticket.contactNo,
            ticket.email        
        ];
        tableRows.push(ticketData);
    })
    doc.text("All Employee Report", 14, 15).setFontSize(12);
    const date = Date().split(" ");
    const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    


    // right down width height
    doc.addImage(img, 'JPEG', 170, 8, 25, 25);
    doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
    doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    doc.save(`Employee_report_.pdf`);
    
  };

  return (
    <>
    <br/>
    <div className="container filmpage customcon">
      <br/>
      <center><h1 style={{letterSpacing:"5px", fontSize:"30px" , fontWeight:"600"}}>ALL STAFF</h1></center>

    <input className="search sfocus"  type="text" placeholder="Search" aria-label="Search"  
      onChange={(e) => {
          setsearchTerm(e.target.value)
      }}/>


&nbsp;&nbsp;<Link to="/user/addstaff"><button type="submit" className="btn btn-outline-info allempreg" id="regsubmit">New Employee</button></Link>
&nbsp;&nbsp;<Link to="/testing"><button type="submit" className="btn btn-outline-info allempreg" id="regsubmit">Attendance</button></Link>
&nbsp;&nbsp;<button type="submit" className="btn btn-outline-info allempreg" id="regsubmit" onClick={()=> generatePDF(staff)}>Report</button>

<hr className="hrView"/>
{staff.length === 0?<> 

  <div className="card border-dark mb-3 emptycard">
                      <div className="row g-3">
                        <div className="column filmpage-imagecol">
                          <div className="filmimage">
                          <center><img src={logo} className="filmimg2"/> </center>
                          </div>
                          </div>
                       <div className="column filmpage-namecol">
                          <h3 style={{margin:"20px", fontWeight:"700"}}>Add Your First Employee!</h3>
                          <center><p><Link to="/staff/addstaff"><button type="submit" className="button-28" role="button" id="regsubmit">Add New Employee</button></Link></p></center>

                    
                    </div>
                    <div className="column filmpage-iconcol">
                    <div className="filmicon">
                         </div>
                    </div>
                    </div>
                    </div>
                    <br/>
                   </>:
      
                
                
        <div className="filmcard">
            {staff.filter((val) => {
                  if (searchTerm === "") {
                    return val
                  } else if (
                    val.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    val.nic
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                      val.jobtitle
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  ) {
                    return val
                  }
                }).map(function(f){
                  return (
                    <div className="card mb-2 filmcard1">
                      <div className="row g-3">
                        <div className="column filmpage-imagecol">
                          <div className="filmimage card">
                            <img src={f.profileImg} alt="Profile Img" className="filmimg" />
                          </div>
                          </div>
                       <div className="column filmpage-namecol">
                       <Link to={"/testing"}><h5 style={{marginTop:"20px",marginRight:"80px"}} className="filmpage-nameh5" >{f.name}</h5></Link>
                       <h6 style={{ marginTop:"2px"}}><img src={mail} style={{width: "25px"}}/> {f.email}</h6>

                          <h6 style={{ marginTop:"0px"}}><img src={identity} style={{width: "25px"}}/> {f.nic}</h6>
                          
                          <h6 style={{ marginTop:"0px"}}><img src={job} style={{width: "25px"}}/> {f.jobtitle}</h6>
                          <h6 style={{ marginTop:"0px"}}><img src={call} style={{width: "25px"}}/>{f.code}{f.contactNo}</h6>

   
                    
                    </div>
                    <div className="column filmpage-iconcol">
                    <div className="filmicon">
                    <Link to={"/testing"}>
      <IconButton  title="View Attendance" aria-label="delete">
                         <CalendarMonthIcon fontSize="medium" style={{ color: "lime" }}/> 
                         </IconButton></Link>
                    <Link to={"/staff/update/"+f._id}>
      <IconButton title="Edit Employee" aria-label="delete">
                         <EditIcon fontSize="medium" color="primary"/> 
                         </IconButton></Link>
                    <IconButton title="Delete Employee" aria-label="delete" onClick={() =>  deleteStaff(f._id)}>
                         <CancelRoundedIcon fontSize="large" color="secondary"/> 
                         </IconButton> 

                         </div>
                    </div>
                    </div>
                    </div>



         )
                })}
       </div>}
       <br/>
    </div>
    </>
  )
}

export default ViewAllEmployee