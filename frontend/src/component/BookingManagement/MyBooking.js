import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./booking.css";
import swal from "sweetalert";
import {useForm} from "react-hook-form";

export default function MyBooking(){

    return (
        <>
        <div className="Container">
            <div className="mybookingview">
        <div class="card mb-3" style={{maxwidth: 540+'px'}}>
  <div class="row g-0">
    <div class="col-md-2" id="checkingdate">
        CHECK IN DATE <br/>
       2022/03/27 <  br/><br/> 
    </div>
    <div class="col-md-6">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>

    <div class="col-md-2"><button type="button" class="btn btn-success" id="bookingmybookingbtn">Success</button></div>

    </div>
  </div>
</div>
            </div>
        </>
    )
}