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

  const [room, setRoom] = useState([]);
  const { id } = useParams();
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
      .put(`/rooms/update/${id}`, newRoom)
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
  useEffect(() => {
    axios
      .get(`/rooms/rooms/${id}`)
      .then((res) => {
        setRoomID(res.data.RoomId);
        setRoomType(res.data.RoomType);
        setPrice(res.data.Price);
        setdescription(res.data.description);
        setImage(res.data.Image);
      })
      .catch((e) => {
        // window.location.href = "/public/login";
        swal({
          title: "unauthorized",
          text: "Please Login First " + e,
          icon: "warning",
        });
      });
  }, []);

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
              UPDATE EXISTING ROOM DETAILS
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
                      type="file"
                      className="form-control logininput"
                      id="poster"
                      placeholder="Profile Image"
                      required
                      onChange={postDetails}
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
                        defaultValue={RoomId}
                        required
                        placeholder="Room Number"
                        onChange={(e) => {
                          setRoomID(e.target.value);
                        }}
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
                        placeholder="Room Type"
                        defaultValue={RoomType}
                        required
                        onChange={(e) => {
                          setRoomType(e.target.value);
                        }}
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
                        required
                        placeholder="Price"
                        defaultValue={Price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
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
                      required
                      placeholder="Description"
                      defaultValue={description}
                      onChange={(e) => {
                        setdescription(e.target.value);
                      }}
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
