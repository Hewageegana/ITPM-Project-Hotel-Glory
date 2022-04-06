import React, { useState, useEffect } from "react";
import axios from "axios";

import img from "../../Assets/Images/img8.jpg";
import img1 from "../../Assets/Images/img10.jpg";
import img2 from "../../Assets/Images/img11.jpg";
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
      {/* Image Slider */}
      <div className="slider-position">
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src={img} className="img-slider" alt="Looking for job?" />
            </div>
            <div class="carousel-item">
              <img src={img1} className="img-slider" alt="Looking for job?" />
            </div>
            <div class="carousel-item">
              <img src={img2} className="img-slider" alt="Looking for job?" />
            </div>
          </div>
          {/* <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>

          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button> */}
        </div>
      </div>

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

      {/* Card view for rooms */}
      <div className="container roomcard">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {roomList
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.RoomType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.Price.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((rooms) => (
              <div className="cards-position">
                <div className="col">
                  <div className="container1">
                    <div className="card" style={{ width: 25 + "rem" }}>
                      <div className="card-body">
                        <img
                          src={rooms.Image}
                          className="img-fluid"
                          alt="Responsive image"
                        />

                        <div className="">
                          <div key={rooms._Id}>
                            <div className="card-title">
                              <h5>{rooms.RoomType}</h5>
                            </div>
                            <div className="card-text">
                              <p> {rooms.description}</p>
                            </div>
                            <div className="card-text">
                              <p>
                                <b>Price :- LKR.{rooms.Price}/= (Per Night) </b>
                              </p>
                            </div>

                            <div />
                          </div>
                        </div>
                        <div className="btn-book">
                          <a href="#" className="btn btn-primary">
                            Book Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
