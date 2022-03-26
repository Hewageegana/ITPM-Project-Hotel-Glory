import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import "../StaffManagement/addemployee.css";
import "./rooms.css";

export default function AddRooms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();
  let path2 = "/testing";

  const [RoomId, setRoomID] = useState("");
  const [RoomType, setRoomType] = useState("");
  const [Price, setPrice] = useState("");
  const [description, setdescription] = useState("");
  const [Image, setImage] = useState("");

  const postDetails = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    // data.append("file",image)
    data.append("upload_preset", "movie-app");
    data.append("cloud_name", "padfoot");
    data.append("folder", "ITPM/room");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/padfoot/image/upload",
      {
        method: "post",
        body: data,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setImage(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function sendData(e) {
    const newRoom = {
      RoomId,
      RoomType,
      Price,
      description,
      Image,
    };
    axios
      .post("/rooms/add", newRoom)
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
      <div className="add-room">
        <br />
        <div className="container">
          <br />
          <center>
            <h1
              style={{
                letterSpacing: "5px",
                fontSize: "30px",
                fontWeight: "600",
              }}
            >
              <div className="headind-add-newroom">ADD NEW ROOM</div>
            </h1>
          </center>
          <div className="register">
            <div className="registerin" style={{ margin: "40px" }}>
              <form className="needs-validation" noValidate>
                <center>
                  <div className="col-md-6">
                    <label
                      for="floatingInput"
                      style={{ marginBottom: "10px", fontSize: "18px" }}
                    >
                      Image of Room
                    </label>
                    <br />
                    <label for="profile" style={{ marginBottom: "20px" }}>
                      <div className="card poster">
                        {Image === "" ? (
                          <center>
                            <h4 style={{ marginTop: "50px" }}>Preview</h4>
                          </center>
                        ) : (
                          <center>
                            <img
                              src={Image}
                              className="posterimg"
                              style={{ width: "150px" }}
                            />
                          </center>
                        )}
                      </div>
                    </label>
                    <br />
                    <input
                      type="file"
                      className="form-control logininput"
                      id="poster"
                      placeholder="Profile Image"
                      onChange={postDetails}
                      required
                    />
                  </div>
                </center>
                <br />
                <div className="add-room-form">
                  <div className="row g-2">
                    <div className="col-md-6 form-floating">
                      <input
                        type="text"
                        className="form-control logininput"
                        id="username"
                        placeholder="Employee Name"
                        onChange={(e) => {
                          setRoomID(e.target.value);
                        }}
                        required
                      />

                      <label for="floatingInput">Room Number</label>
                    </div>
                  </div>
                  <br />
                  <div className="row g-2">
                    <div className="col-md-6 form-floating">
                      <input
                        type="text"
                        className="form-control logininput"
                        id="nic"
                        placeholder="nic"
                        onChange={(e) => {
                          setRoomType(e.target.value);
                        }}
                        required
                      />
                      <label for="floatingInput">Room Type</label>
                    </div>
                  </div>
                  <br />
                  <div className="row g-2">
                    <div className="col-md-6 form-floating">
                      <input
                        type="text"
                        className="form-control logininput"
                        id="nic"
                        placeholder="nic"
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                        required
                      />
                      <label for="floatingInput">Price Per Night</label>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="col-md-6">
                    <textarea
                      rows="3"
                      className="form-control logininput"
                      id="address"
                      placeholder="Description"
                      onChange={(e) => {
                        setdescription(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <br />
                  <button
                    type="submit"
                    className="btnregister"
                    onClick={handleSubmit(sendData)}
                    id="regsubmit"
                  >
                    Submit
                  </button>
                  &nbsp;&nbsp;
                  <button type="reset" className="btnreset" id="regreset">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

          <br />
        </div>
        <br />
      </div>
    </>
  );
}
