import { Link } from "react-router-dom";
import type { CardProps } from "../types/types";

const Card = ({ title, body, to, onClick }: CardProps) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="card card-dash bg-base-300 rounded-lg shadow-md cursor-pointer hover:opacity-100 hover:scale-105 transition duration-200"
    >
      <div className="card-body">
        <h2 className="card-title text-primary">{title}</h2>
        <p>{body}</p>
      </div>
    </Link>
  );
};

export default Card;
