import { Link, useNavigate } from "react-router-dom";
import closeIcon from "../../assets/xmark-solid.svg";

export default function BaseModal({ children }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={(e) => navigate("/")}
      className="fixed inset-0 bg-slate-700/75 flex justify-center items-center z-10 "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-20 bg-slate-50 text-slate-900 h-screen w-full dark:bg-slate-700"
      >
        <Link to="/" className="absolute top-2 right-2">
          <img src={closeIcon} alt="close icon" className="w-7 h-7" />
        </Link>
        {children}
      </div>
    </div>
  );
}
