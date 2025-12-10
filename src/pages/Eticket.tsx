import { useBooking } from "../context/BookingContext";
import jsPDF from "jspdf";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Eticket() {
    const { booking } = useBooking();
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    const handleDownloadPDF = () => {
        setShowSuccess(true);
        setTimeout(() => {
            const doc = new jsPDF();
            doc.text("Cinema E-Ticket", 10, 10);
            doc.text(`Film: ${booking?.film || "-"}`, 10, 20);
            doc.text(`Date: ${booking?.date || "-"}`, 10, 30);
            doc.text(`Time: ${booking?.time || "-"}`, 10, 40);
            doc.text(`Seats: ${booking?.seats?.join(", ") || "-"}`, 10, 50);
            doc.text(`Location: ${booking?.location || "-"}`, 10, 60);
            doc.text(`Payment: $${booking?.payment || "-"}`, 10, 70);
            doc.text(`Order: ${booking?.order || "-"}`, 10, 80);
            doc.save("e-ticket.pdf");
        }, 2000);
    };


    return (
        <>
            <h1>instruction</h1>
            <p className="text-gray-400 ">Come to the cinema, show and scan the barcode to the space provided. Continue to comply with health protocols.</p>

            <section className="bg-white p-8 rounded-lg mt-4 text-black flex flex-col gap-4 relative">

                <div className="grid grid-cols-2 items-center mb-2">
                    <h2>Film: {booking?.film}</h2>
                    <p className="text-red-600 text-right">e-ticket</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p>Date</p>
                        <p>{booking?.date}</p>
                    </div>
                    <div className="text-right">
                        <p>Seats</p>
                        <p>{booking?.seats?.join(", ")}</p>
                        {/* Only show the PDF download success popup */}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p>Location</p>
                        <p>{booking?.location}</p>
                    </div>
                    <div className="text-right">
                        <p>Payment</p>
                        <p>${booking?.payment}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p>Order</p>
                        <p>{booking?.order}</p>
                    </div>
                    <div className="text-right">
                        <p>Time</p>
                        <p>{booking?.time}</p>
                    </div>
                </div>

                {/* separation line */}
                <div className="relative mt-4 flex items-center">
                    {/* Left rounded edge */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2" style={{ left: '-32px' }}>
                        <div className="bg-primary_1 rounded-r-full w-5 h-8"></div>
                    </div>
                    {/* Dotted line */}
                    <div className="border-t-2 border-dotted border-primary_2 w-full"></div>
                    {/* Right rounded edge */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2" style={{ right: '-32px' }}>
                        <div className="bg-primary_1 rounded-l-full w-5 h-8"></div>
                    </div>
                </div>

                <figure className="mx-auto mt-4">
                    <img src="../src/assets/Barcode.png" alt="" />
                </figure>
                <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                    onClick={handleDownloadPDF}
                >
                    Download E-ticket
                </button>
            </section>


            {showSuccess && (
                <div
                    className="fixed bottom-18 left-1/2 transform -translate-x-1/2 p-4 rounded-md bg-secondary_1 text-white text-center font-semibold animate-slideup-bounce z-50 shadow-lg"
                    style={{ minWidth: 300, maxWidth: 400 }}
                >
                    <div className="mt-10">
                        <p>Your e-ticket PDF was downloaded!</p>
                        <p>Thank you for your purchase!</p>
                        <p>Enjoy your movie at {booking?.location}</p>
                    </div>
                    <button
                        className="p-4 bg-black w-full rounded cursor-pointer mt-4"
                        onClick={() => {
                            setShowSuccess(false);
                            navigate("/");
                        }}
                    >
                        Home
                    </button>
                    <figure
                        className="absolute"
                        style={{
                            top: '-40px',
                            left: '50%',
                            transform: 'translate(-50%, 0)',
                            margin: 0,
                            padding: 0,
                        }}
                    >
                        <img src="../src/assets/Icon-Success.png" alt="success icon" className="w-20 h-20" />
                    </figure>
                </div>
            )}


        </>
    );
}