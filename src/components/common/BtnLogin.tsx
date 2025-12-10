import { useNavigate } from "react-router-dom";

export default function BtnLogin() {
    const navigate = useNavigate();
    return (
        <button
            className="bg-secondary_1 px-2 pb-0.5 rounded-md text-white cursor-pointer"
            onClick={() => navigate("/login")}
        >
            Login
        </button>
    );
}