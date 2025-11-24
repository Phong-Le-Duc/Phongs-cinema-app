import SingleSeat from "../components/common/SingleSeat";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData } from "react-router";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaRegCalendarAlt } from "react-icons/fa";
import type { Cinema } from "../Types";
import { useBooking } from "../context/BookingContext";



export default function Seats() {
    const navigate = useNavigate();
    const { id: movieId } = useParams<{ id: string }>();
    const { cinemas, movie } = useLoaderData() as { cinemas: Cinema[]; movie: any };

    const { setBooking } = useBooking();

    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [showError, setShowError] = useState<boolean>(false);
    const [cinema, setCinema] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [errors, setErrors] = useState<{ cinema?: string; date?: string; time?: string }>({});

    function selectSeat(seatNumber: number) {
        // If seat is already picked, remove it
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
        } else {
            // Add seat to selected list
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
        setShowError(false);
    }

    function goToCheckout() {
        // Check if everything is filled out
        let newErrors: { cinema?: string; date?: string; time?: string } = {};

        if (!cinema) newErrors.cinema = 'Pick a cinema';
        if (!date) newErrors.date = 'Pick a date';
        if (!time) newErrors.time = 'Pick a time';

        setErrors(newErrors);

        // Check if seats are selected
        if (selectedSeats.length === 0) {
            setShowError(true);
            return;
        }

        // If there are errors, don't continue
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        // Set booking context
        setBooking({
            film: movie.title,
            date,
            seats: selectedSeats,
            location: cinema,
            payment: selectedSeats.length * 12, // or use your seatPrice variable
            order: Math.floor(1000000 + Math.random() * 9000000).toString(), // random 7-digit number
            time,
            movieId: movieId ?? "",
        });

        // Go to checkout page
        navigate("/checkout");
    }

    return (
        <>
            <title>Min Biograf - Select Seats</title>
            <div className="mb-4 text-lg text-white font-semibold">
                Booking for: <span className="text-blue-300">{movie.title}</span>
            </div>
            <div className="flex flex-col gap-2 mb-4">
                <label className="text-white">Cinema:</label>
                <select
                    className={`border-2 rounded-lg h-12 p-3 text-gray-400 ${errors.cinema ? 'border-red-500' : 'border-gray-300'}`}
                    style={{ backgroundColor: 'var(--color-primary_1)' }}
                    value={cinema}
                    onChange={(e) => setCinema(e.target.value)}
                >
                    <option value="">Choose a cinema</option>
                    {cinemas.map(c => (
                        <option key={c.id} value={c.name}>
                            {c.name}
                        </option>
                    ))}
                </select>
                {errors.cinema && <span className="text-red-500 text-sm">{errors.cinema}</span>}
            </div>

            <div className="flex gap-4 mb-4">
                <div className="flex gap-2 flex-col w-1/2 justify-center">
                    <label className="text-white">Date:</label>
                    <div className="relative">
                        <ReactDatePicker
                            selected={date ? new Date(date) : null}
                            onChange={d => setDate(d ? d.toISOString().slice(0, 10) : "")}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Choose a date"
                            className={`border-2 rounded-lg h-10 p-2 text-gray-400 w-full ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                        // style={{ backgroundColor: 'var(--color-primary_1)' }}
                        />
                        <FaRegCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
                </div>

                <div className="flex gap-2 flex-col w-1/2">
                    <label className="text-white">Time:</label>
                    <div className="relative">
                        <ReactDatePicker
                            selected={time ? new Date(`1970-01-01T${time}`) : null}
                            onChange={d => setTime(d ? d.toTimeString().slice(0, 5) : "")}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="HH:mm"
                            placeholderText="Choose a time"
                            className={`border-2 rounded-lg h-10 p-2 text-gray-400 w-full ${errors.time ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                            {/* Clock icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 1 .5.5v4h3a.5.5 0 0 1 0 1H8a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5z" /><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm0-1A7 7 0 1 1 8 1a7 7 0 0 1 0 14z" /></svg>
                        </span>
                    </div>
                    {errors.time && <span className="text-red-500 text-sm">{errors.time}</span>}
                </div>
            </div>

            <img src="../src/assets/screen.png" className="flex mx-auto mt-10" alt="cinema screen image" />

            {/* 6×8 Cinema seat grid */}
            <div className="Seat-grid-layout">
                {/* Row 1 (seats 1-8) */}
                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={1} id="box1">1</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={2} id="box2">2</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={3} id="box3">3</SingleSeat>

                </div>

                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={4} id="box6">4</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={5} id="box7">5</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={6} id="box8">6</SingleSeat>
                </div>

                {/* Row 2 (seats 9-16) */}
                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={7} id="box10">7</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={8} id="box11">8</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={9} id="box12">9</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={10} id="box13">10</SingleSeat>
                </div>

                {/* Row 3 (seats 17-24) */}
                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={11} id="box15">11</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={12} id="box16">12</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={13} id="box17">13</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={14} id="box18">14</SingleSeat>
                </div>
                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={15} id="box20">15</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={16} id="box21">16</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={17} id="box22">17</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={18} id="box23">18</SingleSeat>
                </div>

                {/* Row 4 (seats 25-32) */}
                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={19} id="box25">19</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={20} id="box26">20</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={21} id="box27">21</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={22} id="box28">22</SingleSeat>
                </div>
                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={23} id="box30">23</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={24} id="box31">24</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={25} id="box32">25</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={26} id="box33">26</SingleSeat>
                </div>

                {/* Row 5 (seats 33-40) */}
                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={27} id="box35">27</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={28} id="box36">28</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={29} id="box37">29</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={30} id="box38">30</SingleSeat>
                </div>

                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={31} id="box40">31</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={32} id="box41">32</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={33} id="box42">33</SingleSeat>
                </div>

                {/* Row 6 (seats 41-48) */}
                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={34} id="box44">34</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={35} id="box45">35</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={36} id="box46">36</SingleSeat>
                </div>
            </div>
            {/* Show error if no seats selected */}
            {showError && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <p>⚠️ Pick at least one seat first!</p>
                </div>
            )}

            <div className="mt-6">
                {selectedSeats.length > 0 ? (
                    <button onClick={goToCheckout} className="bg-blue-500 text-white px-4 py-3 rounded-lg w-full cursor-pointer">
                        Checkout ({selectedSeats.length} seats)
                    </button>
                ) : (
                    <button onClick={goToCheckout} className="bg-gray-400 text-gray-600 px-4 py-3 rounded-lg w-full cursor-pointer">
                        Pick Seats First
                    </button>
                )}
            </div>
        </>
    );
}