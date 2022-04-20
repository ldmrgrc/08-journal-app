import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startUpdateNote, startUploading } from "../../actions/notes";
import moment from "moment";

export const NotesAppBar = () => {
  const dispatch = useDispatch();

  const { active } = useSelector((state) => state.notes);

  const { updatedAt } = active;

  const handleSaveNote = () => {
    dispatch(startUpdateNote(active));
  };

  const handleAddPicture = () => {
    document.querySelector("#fileSelected").click();
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      dispatch(startUploading(file));
    }
  };

  return (
    <div className="notes__appbar">
      <span>last Update: {moment(updatedAt).fromNow()}</span>

      <input
        id="fileSelected"
        type="file"
        style={{ display: "none" }}
        onChange={handlePictureChange}
      />

      <div>
        <button className="btn" onClick={handleAddPicture}>
          Picture
        </button>

        <button className="btn" onClick={handleSaveNote}>
          Save
        </button>
      </div>
    </div>
  );
};
