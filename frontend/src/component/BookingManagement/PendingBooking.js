import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./booking.css";
import swal from "sweetalert";
import { useForm } from "react-hook-form";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import jsPDF from "jspdf";

export default function PendingBooking() {
    const [bookingview, setBooking] = useState([]);

    const [searchTerm, setsearchTerm] = useState("");

    const deletebooking = (id) => {
        swal({
            title: "Are you sure?",
            text: "Booking Will be permenatly remove from System",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`/booking/delete/${id}`).then(() => {
                    if (willDelete) {
                        swal("The Booking has been deleted!", { icon: "success" });
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    } else {
                        swal("Booking Is Not Deleted");
                    }
                });
            }
        });
    };

    useEffect(() => {
        const getbooking = async () => {
            const res = await axios.get("/booking/bookinguserview").then((res) => {

                setBooking(res.data);

                console.log(res.data)
            });
        };
        getbooking();
    }, []);


    //report
    function createPdf(pdfBody){

        var doc = new jsPDF('portrait','px','a3');
        var totalPagesExp = "{total_pages_count_string}"; //placeholder for total number of pages 
        doc.autoTable({
            didDrawPage: function (data) {

                // Header
                doc.setFontSize(14);
                var fileTitle = "Payment Report";
                var img = 'data';
                doc.text(fileTitle, 30, 60);
                doc.addImage(img, 'JPEG', 550, 10, 40, 40);

                // Footer
                var pageSize = doc.internal.pageSize;
                //jsPDF 1.4+ uses getHeight, <1.4 uses .height
                var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                // jsPDF 1.4+ uses getWidth, <1.4 uses .width
                var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();

                doc.autoTable({
                    html: '#my-table',
                    startY: pageHeight - 760,
                    theme: 'grid'
                });

                var str = "Page " + doc.internal.getNumberOfPages()
                // Total page number plugin only available in jspdf v1.0+
                if (typeof doc.putTotalPages === 'function') {
                    str = str + " of " + totalPagesExp;
                }
                doc.setFontSize(10);
                doc.text(str, data.settings.margin.left, pageHeight - 10);
            },
            margin: {
                bottom: 60, //this decides how big your footer area will be
                top: 40 //this decides how big your header area will be.
            }
        });
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPagesExp);
        }

        doc.save('bookingdetails.pdf'); //this downloads a copy of the pdf in your local instance.
    };



    //report

    // const generatePDF = (tickets) => {
    //   const doc = new jspdf();
    //   const tableColumn = ["Room Number", "Room Type", "Price"];
    //   const tableRows = [];

    //   tickets.map((ticket) => {
    //     const ticketData = [ticket.RoomId, ticket.RoomType, ticket.Price];
    //     tableRows.push(ticketData);
    //   });
    //   doc.text("All Rooms Report", 14, 15).setFontSize(12);
    //   const date = Date().split(" ");
    //   const dateStr = date[1] + "-" + date[2] + "-" + date[3];
    //   // right down width height
    //   doc.addImage(img, "JPEG", 170, 8, 25, 25);
    //   doc.autoTable(tableColumn, tableRows, {
    //     styles: { fontSize: 8 },
    //     startY: 35,
    //   });
    //   doc.text(`Report Genarated Date - ${dateStr}`, 14, 23);
    //   doc.save(`Room_report_.pdf`);
    // };

    return (



        <>

            <div className="Container">

                
                

                {bookingview.map(function (f) {
                    return (




                        <div className="mybookingview">

                            <div class="card mb-3" style={{ maxwidth: 540 + "px" }}>
                                <div class="row g-0">
                                    <div class="col-md-3">
                                        <h6 className="checkingdate">CHECK IN DATE</h6> <br />
                                        {f.CheckInDate} <br />
                                        <h6 className="checkingdate">CHECK OUT DATE</h6> <br />
                                        {f.CheckOutDate} <br />
                                        <br />
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card-body">

                                            <h5 class="card-title">{f.RoomType}</h5>
                                            <p class="card-text">Number of Rooms: {f.Rooms}</p>
                                            <p class="card-text">Number of Adults: {f.Adults}</p>
                                            <p class="card-text">Number of Children: {f.Children}</p>
                                        </div>
                                    </div>


                                    <div class="col-md-2">
                                        <Link to={"/updatebooking/" +f._id}>
                                        <button
                                            type="button"
                                            class="btn btn-success"
                                            id="bookingmybookingbtn"
                                        >
                                            UPDATE
                                        </button>
                                        </Link>


                                        <button
                                            type="button"
                                            class="btn btn-danger"
                                            id="bookingmybookincancelgbtn"
                                            onClick={() => deletebooking(f._id)}

                                        >
                                            DELETE
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
