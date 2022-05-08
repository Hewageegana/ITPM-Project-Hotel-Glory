import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./booking.css";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import img from "../../Assets/Images/HotalLOGOLarge.png";

export default function MyBooking() {
  const [bookingview, setBooking] = useState([]);

  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [ContactNumber, setContactNumber] = useState("");
  const [Country, setCountry] = useState("");
  const [Location, setLocation] = useState("");
  const [CheckInDate, setCheckInDate] = useState("");
  const [CheckOutDate, setCheckOutDate] = useState("");
  const [Rooms, setRooms] = useState("");
  const [RoomType, setRoomType] = useState("");
  const [Nights, setNights] = useState("");
  const [Adults, setAdults] = useState("");
  const [Children, setChildren] = useState("");
  const [userId, setUserId] = useState("");

  const [searchTerm, setsearchTerm] = useState("");

  const acceptBooking = (id, booked) => {
    swal({
      title: "Are you sure?",
      text: "Accept This Booking",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willAccept) => {
      if (willAccept) {
        // axios.get(`/booking/booking/${id}`).then((res)=>{
        //   setUserId(res.data.userId)
        //   setFullName(res.data.FullName)
        //   setEmail(res.data.Email)
        //   setContactNumber(res.data.ContactNumber)
        //   setCountry(res.data.Country)
        //   setLocation(res.data.Location)
        //   setCheckInDate(res.data.CheckInDate)
        //   setCheckOutDate(res.data.CheckOutDate)
        //   setRooms(res.data.Rooms)
        //   setRoomType(res.data.RoomType)
        //   setNights(res.data.Nights)
        //   setAdults(res.data.Adults)
        //   setChildren(res.data.Children)
        //   console.log(res.data.userId)

        const newBooking = {
          FullName: booked.FullName,
          Email: booked.Email,
          ContactNumber: booked.ContactNumber,
          Country: booked.Country,
          Location: booked.Location,
          CheckInDate: booked.CheckInDate,
          CheckOutDate: booked.CheckOutDate,
          Rooms: booked.Rooms,
          RoomType: booked.RoomType,
          Nights: booked.Nights,
          Adults: booked.Adults,
          Children: booked.Children,
          userId: booked.userId,
        };

        axios.post("/booking/addacceptedbooking", newBooking).then(() => {
          axios.delete(`/booking/delete/${id}`).then(() => {
            swal({
              title: "Success!",
              text: "Successfully accepted booking",
              icon: "success",
              button: "Ok",
            });

            setTimeout(function () {
              window.location.reload();
            }, 1000);
          })
        })
        // }).catch((e)=>{
        //   alert(e+" 1111111");
        // })
      } else {
        swal("Booking Is Not Deleted");

      }
    })
  }

  const declinedBooking = (id, booked) => {
    swal({
      title: "Are you sure?",
      text: "Decline This Booking",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDecline) => {
      if (willDecline) {


        const newBooking = {
          FullName: booked.FullName,
          Email: booked.Email,
          ContactNumber: booked.ContactNumber,
          Country: booked.Country,
          Location: booked.Location,
          CheckInDate: booked.CheckInDate,
          CheckOutDate: booked.CheckOutDate,
          Rooms: booked.Rooms,
          RoomType: booked.RoomType,
          Nights: booked.Nights,
          Adults: booked.Adults,
          Children: booked.Children,
          userId: booked.userId,

        };

        axios.post("/booking/adddeclinedbooking", newBooking).then(() => {
          axios.delete(`/booking/delete/${id}`).then(() => {
            swal({
              title: "Success!",
              text: "Successfully added to declined booking",
              icon: "success",
              button: "Ok",
            });

            setTimeout(function () {
              window.location.reload();
            }, 1000);
          }).catch((e) => {
            alert(e + " 333333");
          })
        }).catch((e) => {
          alert(e + " 22222");
        })

      } else {
        swal("Booking Is Not Deleted");

      }
    })
  }

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

  const generatePDF = (tickets) => {
  const doc = new jsPDF();
  const tableColumn = ["Full Name", "Room Type", " Rooms","Nights"];
  const tableRows = [];

  tickets.map((ticket) => {
  const ticketData = [ticket.FullName, ticket.RoomType, ticket.Rooms, ticket.Nights];
  tableRows.push(ticketData);
  });
  doc.text("All Booking Report", 14, 15).setFontSize(12);
  const date = Date().split(" ");
  const dateStr = date[1] + "-" + date[2] + "-" + date[3];
  // right down width height
  doc.addImage(img, "JPEG", 170, 8, 25, 25);
  doc.autoTable(tableColumn, tableRows, {
  styles: { fontSize: 8 },
  startY: 35,
  });
  doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
  doc.save(`Booking_report_.pdf`);
   };

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
          onClick={() => generatePDF(bookingview)}

        >
          Generate Report
        </button>

        {bookingview.filter((val) => {
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
                  <div class="row g-0">
                    <div class="col-md-3">
                      <h6 className="checkingdate">CHECK IN DATE</h6> <br />
                      {f.CheckInDate} <br />
                      <h6 className="checkingdate">CHECK OUT DATE</h6> <br />
                      {f.CheckOutDate} <br />
                      <br />
                    </div>
                    <div class="col-md-6">
                      <div class="card-body">
                      <h5 class="card-title">{f.RoomType}</h5>
                      <p class="card-text">Full Name: {f.FullName}</p>
                      <p class="card-text">Email: {f. Email}</p>
                      <p class="card-text">Contact Number: {f.ContactNumber}</p>
                      <p class="card-text">Rooms: {f.Rooms}</p>
                      </div>
                    </div>


                    <div class="col-md-2">
                      <button
                        type="button"
                        onClick={() => acceptBooking(f._id, f)}
                        class="btn btn-success"
                        id="bookingmybookingbtn"
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        id="bookingmybookincancelgbtn"

                      >
                        Cancel
                        <button
                          type="button"
                          class="btn btn-danger"
                          id="bookingmybookincancelgbtn2"
                          onClick={() => declinedBooking(f._id, f)}
                        ></button>
                      </button>
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
