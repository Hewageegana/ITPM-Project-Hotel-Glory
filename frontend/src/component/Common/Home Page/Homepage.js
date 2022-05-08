import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Home Page/homepage.css";
import img from "../../../Assets/Images/home3.jpg";
import img1 from "../../../Assets/Images/home2.jpg";
import img2 from "../../../Assets/Images/home1.jpg";

export default function HomePage() {
  return (
    <>
      <div className="">
        <div className="homepage">
          <div
            id="carouselExampleCaptions"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src={img}
                  class="d-block w-100"
                  id="ImgSliderHome"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h3>WELCOME TO HOTEL GLORY</h3>
                  <h5>LUXURY AT YOUR FINGERTIPS.</h5>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  src={img1}
                  class="d-block w-100"
                  id="ImgSliderHome"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h3>WELCOME TO HOTEL GLORY</h3>
                  <h5>UNTOLD BEAUTY AND EXPERIENCES</h5>
                </div>
              </div>
              <div class="carousel-item">
                <img
                  src={img2}
                  class="d-block w-100"
                  id="ImgSliderHome"
                  alt="..."
                />
                <div class="carousel-caption d-none d-md-block">
                  <h3>WELCOME TO HOTEL GLORY</h3>
                  <h5>PARTY EXPERTS WITH CREATIVE IDEAS.</h5>
                </div>
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
