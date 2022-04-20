import React from "react";
import moment from "moment";

import { useDispatch } from "react-redux";
import { startActiveNote } from "../../actions/notes";

export const JournalEntry = (props) => {
  
  const { id, title, body, createdAt, imageUrl } = props;
  const date = moment(createdAt);
  const dispatch = useDispatch();

  const handleActiveNote = () => {
    dispatch(
      startActiveNote(id, { ...props })
    );
  };

  return (
    <div className="journal__entry pointer animate__animated animate__backInUp" onClick={handleActiveNote}>
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage: `${imageUrl ? `url(${imageUrl})` : "none"}`,
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>

      <div className="journal__entry-date-box">
        <span>{date.format("dddd")}</span>
        <h4>{date.format("Do")}</h4>
      </div>
    </div>
  );
};
