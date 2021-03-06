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
  let path2 = "/managerooms";

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
        <div className="container customcon">
          <br />
          <center>
            <h1
              style={{
                letterSpacing: "5px",
                fontSize: "30px",
                fontWeight: "600",
              }}
            >
              ADD A NEW ROOM
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
                            <img src={Image} className="posterimg" />
                          </center>
                        )}
                      </div>
                    </label>
                    <br />
                    <input
                      {...register("roomImg", {
                        required: true,
                      })}
                      type="file"
                      className="form-control logininput"
                      id="poster"
                      placeholder="Profile Image"
                      required
                      onChange={postDetails}
                    />
                    {errors?.roomImg?.type === "required" && (
                      <p style={{ color: "red" }}>*Image is Required</p>
                    )}
                  </div>
                </center>

                <br />
                <div className="add-room-form">
                  <div className="row g-2">
                    <div className="col-md-6 form-floating">
                      <input
                        {...register("roomNumber", {
                          pattern: /^\d{3}$/,
                          required: true,
                        })}
                        type="text"
                        className="form-control logininput"
                        id="username"
                        required
                        placeholder="Room Number"
                        onChange={(e) => {
                          setRoomID(e.target.value);
                        }}
                      />
                      <label for="floatingInput">Room Number</label>
                      {errors?.roomNumber?.type === "required" && (
                        <p style={{ color: "red" }}>*Room Number is Required</p>
                      )}
                      {errors?.roomNumber?.type === "pattern" && (
                        <p style={{ color: "red" }}>
                          *Room number should be 3 digit number
                        </p>
                      )}
                    </div>
                  </div>
                  <br />
                  <div className="row g-2">
                    <div className="col-md-6 form-floating">
                      <input
                        {...register("roomType", {
                          required: true,
                        })}
                        type="text"
                        className="form-control logininput"
                        id="nic"
                        placeholder="Room Type"
                        required
                        onChange={(e) => {
                          setRoomType(e.target.value);
                        }}
                      />
                      <label for="floatingInput">Room Type</label>
                      {errors?.roomType?.type === "required" && (
                        <p style={{ color: "red" }}>*Room Type is Required</p>
                      )}
                    </div>
                  </div>
                  <br />
                  <div className="row g-2">
                    <div className="col-md-6 form-floating">
                      <input
                        {...register("price", {
                          required: true,
                        })}
                        type="text"
                        className="form-control logininput"
                        id="nic"
                        required
                        placeholder="Price Per Night"
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                      <label for="floatingInput">Price Per Night</label>
                      {errors?.price?.type === "required" && (
                        <p style={{ color: "red" }}>*Price is Required</p>
                      )}
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="col-md-6">
                    <textarea
                      {...register("description", {
                        required: true,
                      })}
                      rows="7"
                      className="form-control logininput"
                      id="address"
                      required
                      placeholder="Description"
                      onChange={(e) => {
                        setdescription(e.target.value);
                      }}
                    />
                    {errors?.description?.type === "required" && (
                      <p style={{ color: "red" }}>*Description is Required</p>
                    )}
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
