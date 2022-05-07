import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./booking.css";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export default function MyBooking() {
  const [bookingview, setBooking] = useState([]);

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
                    <br />
                  </div>
                  <div class="col-md-6">
                    <div class="card-body">
                      <h5 class="card-title">{f.FullName}</h5>
                      <p class="card-text">Email: {f.Email}</p>
                      <p class="card-text">Contact: {f.ContactNumber}</p>
                    </div>
                  </div>
                

                  <div class="col-md-2">
                    <button
                      type="button"
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
                       id="bookingmybookincancelgbtn"
                            onClick={() => deletebooking(f._id)}
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
