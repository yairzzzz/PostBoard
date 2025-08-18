import type { CommentProps } from "../types/types";

const Comment = ({ name, email, body, index }: CommentProps) => {
  return (
    <div className="">
      <li className="list-row">
        <div className="text-4xl font-thin opacity-30 tabular-nums">
          {index + 1}
        </div>

        <div className="list-col-grow">
          <h3>{name}</h3>
          <div className="text-xs uppercase font-semibold opacity-60">
            {body}
          </div>
          <span className="text-sm opacity-80">
            <a href={`mailto:${email}`} className="link link-hover">
              {email}
            </a>
          </span>
        </div>
      </li>
    </div>
  );
};

export default Comment;
