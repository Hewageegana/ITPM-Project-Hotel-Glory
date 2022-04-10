import React, { useState, useEffect } from "react";
import axios from "axios";
import "./rooms.css";
import swal from "sweetalert";
import jspdf from "jspdf";
import "jspdf-autotable";
import { useHistory } from "react-router-dom";

export default function RoomReport() {
  const [data, setData] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  let path = "/user/profile";
  const [searchTerm, setsearchTerm] = useState("");

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
      <div className="container">
        <center>
          <table class="table table-dark table-hover">
            <tr>
              <th>Room Number</th>
              <th>Room Type</th>
              <th>Room Price</th>
            </tr>
            {roomList.map((rooms) => (
              <tr>
                <td>{rooms.RoomId}</td>
                <td>{rooms.RoomType}</td>
                <td>LKR. {rooms.Price}/=</td>
              </tr>
            ))}
          </table>
        </center>
      </div>
    </>
  );
}
