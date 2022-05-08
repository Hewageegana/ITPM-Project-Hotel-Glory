import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./booking.css";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export default function DeclineBooking() {
  const [declinedBooking, setBooking] = useState([]);

  const [searchTerm, setsearchTerm] = useState("");

  const deletebooking = (id) => {
    swal({
      title: "Are you sure?",
      text: "Booking Will be permenatly remove from System",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/booking/delete/${id}`).then(() => {
          if (willDelete) {
            swal("The Booking has been deleted!", { icon: "success" });
            setTimeout(function () {
              window.location.reload();
            }, 1000);
          } else {
            swal("Booking Is Not Deleted");
          }
        });
      }
    });
  };

  useEffect(() => {
    const getbooking = async () => {
      const res = await axios.get("/booking/bookingview").then((res) => {
        setBooking(res.data);
      });
    };
    getbooking();
  }, []);


  //report

  // const generatePDF = (tickets) => {
  //   const doc = new jspdf();
  //   const tableColumn = ["Room Number", "Room Type", "Price"];
  //   const tableRows = [];

  //   tickets.map((ticket) => {
  //     const ticketData = [ticket.RoomId, ticket.RoomType, ticket.Price];
  //     tableRows.push(ticketData);
  //   });
  //   doc.text("All Rooms Report", 14, 15).setFontSize(12);
  //   const date = Date().split(" ");
  //   const dateStr = date[1] + "-" + date[2] + "-" + date[3];
  //   // right down width height
  //   doc.addImage(img, "JPEG", 170, 8, 25, 25);
  //   doc.autoTable(tableColumn, tableRows, {
  //     styles: { fontSize: 8 },
  //     startY: 35,
  //   });
  //   doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
  //   doc.save(`Room_report_.pdf`);
  // };

  return (


     
    <>

      <div className="Container">
        
      <input 
        
              className="searchsfocus1"
              type="text"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                setsearchTerm(e.target.value);
              }}
           />
  <button
                      type="button"
                      class="btn btn-primary"
                      id="bookingmybookingbtn1"
                     
                    >
                      Generate Report
                    </button>

        {declinedBooking.filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.FullName.toLowerCase().includes(searchTerm.toLowerCase()) 
                
                ) {
                  return val;
                }
              })

              


        .map(function (f) {
          return (
            
            
            <div className="mybookingview">
            
              <div class="card mb-3" style={{ maxwidth: 540 + "px" }}>
                <div class="row g-2">
                  <div class="col-md-6">
                    <h6 className="checkingdate">CHECK IN DATE</h6> <br />
                    {f.CheckInDate} <br />
                    <h6 className="checkingdate">CHECK OUT DATE</h6> <br />
                    {f.CheckOutDate} <br />
                    <br />
                  </div>
                  <div class="col-md-6">
                    <div class="card-body" id="bookingdetails">
                      <h5 class="card-title">{f.RoomType}</h5>
                      <p class="card-text">Number of Rooms: {f.Rooms}</p>
                      <p class="card-text">Number of Adults: {f.Adults}</p>
                      <p class="card-text">Number of Children: {f.Children}</p>
                    </div>
                  </div>
                

                  
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
