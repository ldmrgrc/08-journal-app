import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startActiveNote, startDeleting } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset] = useForm(note);
  const { title, body } = formValues;
  const activeId = useRef(note.id);

  useEffect(() => {
    if (activeId.current !== note.id) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(startActiveNote(formValues.id, {...formValues}));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDeleting());
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          name="title"
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={handleInputChange}
        ></textarea>

        <div className="notes__image">
          <img
            src={note.imageUrl}
            alt="imagen"
          />
        </div>
      </div>
      <button className="btn btn-danger" onClick={handleDelete}> Delete </button>
    </div>
  );
};
