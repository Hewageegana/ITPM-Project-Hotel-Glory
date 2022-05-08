import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import jspdf from 'jspdf'
import "jspdf-autotable"
import img from "../../Assets/Images/HotalLOGOLarge.png";

export default function AdminPage() {

    let history = useHistory();
    let path = '/user/profile';
    const [searchTerm, setsearchTerm] = useState("");
    const [user, setUser] = useState([]);

      const deleteUser=(id) =>{
        swal({
            title: "Are you sure?",
            text: "The User Will be removed from System",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
        axios.delete(`/user/delete/${id}`).then(()=>{
          
            if (willDelete) {
              swal("The User has been deleted!", 
              {icon :"success",});  
              setTimeout(function(){
              window.location.reload();
               },1000);
            } else {
              swal("User Is Not Deleted");}
          })
      }
      })
    } 

    function myRefresh() {
        window.location.reload();
    }

    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get('/user/alluser/user').then((res) => {
                setUser(res.data);
            }).catch(() => {
                history.push(path);
                swal({
                    title: "Unauthorized",
                    text: "Your not an admin",
                    icon: "warning"
                });
            })
        }
        getUser();
    }, [])

    
//generate report
    const generatePDF = tickets => {

        const doc = new jspdf();
        const tableColumn = ["Name", "Email", "Username", "ContactNo", "Gender", "NIC", "DOB"];
        const tableRows = [];


        tickets.map(ticket => {
            const ticketData = [
                ticket.name,
                ticket.email,
                ticket.username,
                ticket.contactNo,
                ticket.gender,
                ticket.nic,
                ticket.dob,
            ];
            tableRows.push(ticketData);
        })
        doc.text("All Users Report", 14, 15).setFontSize(12);
        const date = Date().split(" ");
        const dateStr = date[1] + "-" + date[2] + "-" + date[3];



        // right down width height
        // doc.addImage(img, 'JPEG', 170, 8, 25, 15);
        doc.addImage(img, "JPEG", 170, 8, 25, 25);
        doc.autoTable(tableColumn, tableRows, { styles: { fontSize: 8, }, startY: 35 });
        doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
        doc.save(`allusers_report_.pdf`);

    };

    return (
        <>
            <br />
            <div className="container customcon2">
                <br />
                <center><h1 style={{ fontFamily: "be vietnam", fontSize: "30px", fontWeight: "800" }}>ALL CUSTOMERS</h1></center>
                <br />
                <input className="search" type="text" placeholder="Search" aria-label="Search"
                    onChange={(e) => {
                        setsearchTerm(e.target.value)
                    }} />
                    <br /><br />
                    
                <div className="reportbtn" style={{ padding: "10px" }}>
                    <button type="button" className="btnregister" onClick={() => generatePDF(user)}>GenerateReport</button>
                </div>
                <br /><br />

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>username</th>
                            <th>ContactNo</th>
                            <th>Gender</th>
                            <th>NIC</th>
                            <th>DOB</th>

                        </tr>
                    </thead>
                    <tbody>
                        {user.filter(val => {
                            if (searchTerm === '') {
                                return val;
                            } else if (
                                val.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                val.username.toLowerCase().includes(searchTerm.toLowerCase())
                            ) {
                                return val;
                            }
                        }).map((user, key) => (
                            <tr key={key}>
                                <td className="damfont">{user.name}</td>
                                <td className="damfont">{user.email}</td>
                                <td className="damfont">{user.username}</td>
                                <td className="damfont">{user.contactNo}</td>
                                <td className="damfont">{user.gender}</td>
                                <td className="damfont">{user.nic}</td>
                                <td className="damfont">{(String(user.dob))}</td>

                                <td><IconButton aria-label="delete" onClick={() => deleteUser(user._id)}>
                                    <DeleteForeverIcon fontSize="medium" color="secondary" />
                                </IconButton></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}