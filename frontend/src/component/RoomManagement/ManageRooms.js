import React, { useState, useEffect } from "react";
import axios from "axios";
import "./rooms.css";

import { Link, useHistory } from "react-router-dom";
// import { Input } from "antd";

export default function Rooms() {
  const [data, setData] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  let path = "/user/profile";
  const [searchTerm, setsearchTerm] = useState("");

  //retriew

  useEffect(() => {
    const getRoom = async () => {
      const res = await axios
        .get("/rooms/roomsview")
        .then((res) => {
          setRoomList(res.data);
        })
        .catch(() => {});
    };
    getRoom();
  }, []);

  return (
    <>
      {/* Search Bar */}
      <div className="room-search">
        <div class="container-fluid">
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                setsearchTerm(e.target.value);
              }}
            />
            <button class="btn btn-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Buttons for Add Room & Report */}
      <div className="btnAddRoomandReport">
        <button type="button" class="btn btn-primary btn-sm">
          ADD A NEW ROOM
        </button>
        &nbsp;
        <button type="button" class="btn btn-primary btn-sm">
          GENERATE REPORT
        </button>
      </div>

      {/* Card view for rooms  */}
      <div className="container roommanageList">
        <div className="card">
          {roomList.map((rooms) => (
            <div className="row">
              <div className="col-md-2" id="roommanagementIMG">
                <div key={rooms._Id}>
                  <img src={rooms.Image} className="img-fluid" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{rooms.RoomType}</h5>
                    <p className="card-text">{rooms.description}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        Price :- LKR.{rooms.Price}/= (Per Night)
                      </small>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div className="roommanagementBtn">
                  <button type="button" class="btn btn-success">
                    Success
                  </button>
                  <br />
                  <br />
                  <button type="button" class="btn btn-danger">
                    Danger
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
