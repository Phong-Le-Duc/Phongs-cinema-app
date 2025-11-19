import SingleSeat from "../components/common/SingleSeat";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData } from "react-router";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaRegCalendarAlt } from "react-icons/fa";
import type { Cinema } from "../Types";



export default function Seats() {
    const navigate = useNavigate();
    const { id: movieId } = useParams<{ id: string }>();
    const { cinemas, movie } = useLoaderData() as { cinemas: Cinema[]; movie: any };

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

        // Go to checkout page with all the info
        navigate(`/Checkout?seats=${selectedSeats.join(",")}&cinema=${cinema}&date=${date}&time=${time}&movieId=${movieId}`);
    }

    return (
        <>
            <title>Min Biograf - Select Seats</title>
            <div className="mb-4 text-lg text-white font-semibold">
                Booking for: <span className="text-blue-300">{movie.title}</span>
            </div>
            <div className="flex flex-col gap-2">
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

            {/* 6×8 Cinema seat grid */}
            <div className="Seat-grid-layout">
                {/* Row 1 (seats 1-8) */}
                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={1} id="box1">1</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={2} id="box2">2</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={3} id="box3">3</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={4} id="box4">4</SingleSeat>
                </div>

                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={5} id="box5">5</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={6} id="box6">6</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={7} id="box7">7</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={8} id="box8">8</SingleSeat>
                </div>

                {/* Row 2 (seats 9-16) */}
                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={9} id="box9">9</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={10} id="box10">10</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={11} id="box11">11</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={12} id="box12">12</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={13} id="box13">13</SingleSeat>
                </div>

                {/* Row 3 (seats 17-24) */}
                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={14} id="box14">14</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={15} id="box15">15</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={16} id="box16">16</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={17} id="box17">17</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={18} id="box18">18</SingleSeat>
                </div>
                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={19} id="box19">19</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={20} id="box20">20</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={21} id="box21">21</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={22} id="box22">22</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={23} id="box23">23</SingleSeat>
                </div>

                {/* Row 4 (seats 25-32) */}
                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={24} id="box24">24</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={25} id="box25">25</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={26} id="box26">26</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={27} id="box27">27</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={28} id="box28">28</SingleSeat>
                </div>
                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={29} id="box29">29</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={30} id="box30">30</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={31} id="box31">31</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={32} id="box32">32</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={33} id="box33">33</SingleSeat>
                </div>

                {/* Row 5 (seats 33-40) */}
                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={34} id="box34">34</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={35} id="box35">35</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={36} id="box36">36</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={37} id="box37">37</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={38} id="box38">38</SingleSeat>
                </div>

                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={39} id="box39">39</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={40} id="box40">40</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={41} id="box41">41</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={42} id="box42">42</SingleSeat>
                </div>

                {/* Row 6 (seats 41-48) */}
                <div className="row">
                    <SingleSeat handleSelect={selectSeat} SeatNumber={43} id="box43">43</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={44} id="box44">44</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={45} id="box45">45</SingleSeat>
                    <SingleSeat handleSelect={selectSeat} SeatNumber={46} id="box46">46</SingleSeat>
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
                    <button onClick={goToCheckout} className="bg-blue-500 text-white px-4 py-3 rounded-lg w-full">
                        Checkout ({selectedSeats.length} seats)
                    </button>
                ) : (
                    <button onClick={goToCheckout} className="bg-gray-400 text-gray-600 px-4 py-3 rounded-lg w-full">
                        Pick Seats First
                    </button>
                )}
            </div>
        </>
    );
}