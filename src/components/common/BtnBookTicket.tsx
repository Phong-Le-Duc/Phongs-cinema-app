import { useNavigate } from "react-router";


export default function BtnBookTicket({ movieId }: { movieId: number }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/select-seats/${movieId}`);
    }

    return (
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded font-bold cursor-pointer"
            onClick={handleClick}
        >
            Book Ticket
        </button>
    );
}