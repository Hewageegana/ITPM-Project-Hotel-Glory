import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import "./booking.css";
import swal from "sweetalert";
import { useForm } from "react-hook-form";


export default function AddBooking() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    let history = useHistory();
    let path2 = "/testing";
    const {id} = useParams();

    const [user, setUser] = useState([]);
    const [room, setRoom] = useState([]);


    useEffect(()=>{
        axios.get(`/rooms/rooms/${id}`).then((res)=>{
            setRoom(res.data.staff)
            setRoomType(res.data.RoomType)
        }).catch((e)=>{
          window.location.href = "/public/login"
          swal({title: "unauthorized",
          text: "Please Login First "+e,
          icon: "warning"} ); 
      })
    }, [])
    

    useEffect(() => {
        axios.get('/user/userprofile').then((res) => {
            setUser(res.data)
        }).catch((e) => {
            // window.location.href = "/public/login"
            swal({
                title: "unauthorized",
                text: "Please Login First " +e,
                icon: "warning"
            });
        })
    }, [])

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

    useEffect(() => {
        axios.get('/user/userprofile').then((res) => {
            setUser(res.data)
            setUserId(res.data._id)
        }).catch((e) => {
            // window.location.href = "/public/login"
            swal({
                title: "unauthorized",
                text: "Please Login First " +e,
                icon: "warning"
            });
        })
    }, [])


    //   const postDetails = async (e) => {
    //     const files = e.target.files;
    //     const data = new FormData();
    //     data.append("file", files[0]);
    //     // data.append("file",image)
    //     data.append("upload_preset", "movie-app");
    //     data.append("cloud_name", "padfoot");
    //     data.append("folder", "ITPM/room");
    //     const res = await fetch(
    //       "https://api.cloudinary.com/v1_1/padfoot/image/upload",
    //       {
    //         method: "post",
    //         body: data,
    //       }
    //     )
    //       .then((res) => res.json())
    //       .then((data) => {
    //         setImage(data.url);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   };

    function sendData(e) {
        const newBooking = {
            FullName,
            Email,
            ContactNumber,
            Country,
            Location,
            CheckInDate,
            CheckOutDate,
            Rooms,
            RoomType,
            Nights,
            Adults,
            Children,
            userId


        };
        axios
            .post("/booking/add", newBooking)
            .then(() => {
                swal({
                    title: "Success!",
                    text: "Successfully added the room",
                    icon: "success",
                    button: "Ok",
                });
                history.push(path2);
            })
            .catch((e) => {
                swal("Please fill Form correctly" + e);
            });
    }




    return (
        <>


            <div className="bookingform">
                <center>
                    <div className="add-booking-form">
                        <div className="bookingtopic"><h1>ADD NEW BOOKING</h1></div>
                        <br />
                        <form method="get" className="addbookingform">
                            <div class="row">

                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Full name" aria-label="First name"
                                        onChange={(e) => {
                                            setFullName(e.target.value);
                                        }} />
                                </div>

                                <div class="col">
                                    <input type="text" class="form-control" placeholder="Contact Number" aria-label="Contact Number"
                                        onChange={(e) => {
                                            setContactNumber(e.target.value);
                                        }} />
                                </div>
                            </div><br />


                            <div class="mb-3">
                                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" aria-describedby="emailHelp" onChange={(e) => {
                                    setEmail(e.target.value);
                                }} />
                            </div>

                            <div class="mb-3">
                                <input type="country" class="form-control" id="exampleInputCountry" placeholder="Country" aria-describedby="CountryHelp" onChange={(e) => {
                                    setCountry(e.target.value);
                                }} />
                            </div>

                            <div class="mb-3">
                                <input type="location" class="form-control" id="exampleInputLocation" placeholder="Location" aria-describedby="LocationHelp" onChange={(e) => {
                                    setLocation(e.target.value);
                                }} />
                            </div>






                            <div class="row">
                                <div class="col" >
                                    <label>Check In Date
                                    </label>
                                    <input type="date" class="form-control" placeholder="Check In Date"
                                        onChange={(e) => {
                                            setCheckInDate(e.target.value);
                                        }} />
                                </div>

                                <div class="col">
                                    <label>Check Out Date
                                    </label>
                                    <input type="date" class="form-control" placeholder="Check Out Date"
                                        onChange={(e) => {
                                            setCheckOutDate(e.target.value);
                                        }} />
                                </div>
                            </div><br />

                            <div class="row">
                                <div class="col">
                                    <select class="form-select" aria-label="Default select example"
                                        onChange={(e) => {
                                            setRooms(e.target.value);
                                        }} >
                                        <option selected>Rooms</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        <option value="4">Four</option>
                                        <option value="5">Five</option>
                                    </select>
                                </div>

                                <div class="col">
                                    <select class="form-select" aria-label="Default select example"
                                        onChange={(e) => {
                                            setNights(e.target.value);
                                        }} >
                                        <option selected>Nights</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        <option value="4">Four</option>
                                        <option value="5">Five</option>
                                    </select>
                                </div>

                                <div class="col">
                                    <input type="text" class="form-control" aria-label="Default select example" defaultValue={RoomType} disabled placeholder="Room Type" onChange={(e) => {
                                        setRoomType(e.target.value);
                                    }} />
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col">
                                    <select class="form-select" aria-label="Default select example"
                                        onChange={(e) => {
                                            setAdults(e.target.value);
                                        }}>
                                        <option selected>Adults</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        <option value="4">Four</option>
                                        <option value="5">Five</option>
                                    </select>
                                </div>

                                <div class="col">
                                    <select class="form-select" aria-label="Default select example"
                                        onChange={(e) => {
                                            setChildren(e.target.value);
                                        }}>
                                        <option selected>Children</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                        <option value="4">Four</option>
                                        <option value="5">Five</option>
                                    </select>
                                </div>

                            </div>
                            <br />
                            <div className="bookingform">
                                <button type="button" class="btn btn-primary" id="booking-confirm" onClick={handleSubmit(sendData)}>Confirm</button>&nbsp;


                                <button type="button" class="btn btn-primary">Cancel</button>
                            </div>

                        </form>
                    </div>
                </center>
            </div>
        </>
    )
}