import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./booking.css";
import swal from "sweetalert";
import {useForm} from "react-hook-form";

export default function MyBooking(){

    const [bookingview, setBooking] = useState([]);

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
            {bookingview.map(function(f){
                return(
                    <div className="mybookingview">
                    <div class="card mb-3" style={{maxwidth: 540+'px'}}>
              <div class="row g-0">
                <div class="col-md-2" id="checkingdate">
                    CHECK IN DATE <br/>
                   {f.CheckInDate} <  br/><br/> 
                </div>
                <div class="col-md-6">
                  <div class="card-body">
                    <h5 class="card-title">{f.FullName}</h5>
                    <p class="card-text">{f.Email}</p>
                    <p class="card-text">{f.ContactNumber}</p>
                    
                  </div>
                </div>
            
                <div class="col-md-2"><button type="button" class="btn btn-success" id="bookingmybookingbtn">Success</button></div>
            
                </div>
              </div>
            </div>
                )
            })}

            </div>
        </>
    )
}