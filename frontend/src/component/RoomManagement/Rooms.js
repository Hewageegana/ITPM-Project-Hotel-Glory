import React, { useState, useEffect } from "react";
import axios from "axios";
import twinroom from "../../Assets/Images/twin.jpg";
import img from "../../Assets/Images/img.jpg";
import img1 from "../../Assets/Images/img1.jpg";
import img2 from "../../Assets/Images/img2.jpg";
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
          <button
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
          </button>
        </div>
      </div>

      {/* Card view for rooms */}

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {roomList.map((rooms) => (
          <div className="cards-position">
            <div className="col">
              <div className="container">
                <div className="card" style={{ width: 25 + "rem" }}>
                  <div className="card-body">
                    <img
                      src={twinroom}
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
                          <p>{rooms.price} </p>
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
    </>
  );
}
