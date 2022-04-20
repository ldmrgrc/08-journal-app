import moment from "moment";
import Swal from "sweetalert2";

import {
  db,
  addDoc,
  collection,
  updateDoc,
  doc,
  deleteDoc,
} from "../firebase/firabase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadHelpers";
import { types } from "../types/types";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const note = {
      title: "",
      body: "",
      createdAt: moment().format(),
      updatedAt: moment().format(),
      imageUrl: "https://res.cloudinary.com/dbjzts2r9/image/upload/v1650391975/cld-sample.jpg",
      userId: uid,
    };

    try {
      const docRef = await addDoc(collection(db, `${uid}/journal/notes`), note);

      dispatch(startActiveNote(docRef.id, note));
      dispatch(newNote(docRef.id, note));

    } catch (error) {
      console.log(error);
    }
  };
};

export const newNote = (id, note) => ({
  type: types.notesAddNew,
  payload: { id, ...note },
});

export const startActiveNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const startLoadNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const startUpdateNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    noteToFirestore.updatedAt = moment().format();

    const docRef = doc(db, `${uid}/journal/notes/${note.id}`);

    await updateDoc(docRef, noteToFirestore)
      .then(() => {
        dispatch(refreshNotes(note.id, noteToFirestore));
        Swal.fire("Saved!", "Your note has been saved", "success");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error!", "Your note has not been saved", "error");
      });
  };
};

export const refreshNotes = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: { id, ...note },
  },
});

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    Swal.fire({
      title: "Uploading...",
      text: "Please wait",
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);

    activeNote.imageUrl = fileUrl;

    dispatch(startUpdateNote(activeNote));

    Swal.close();
  };
};

export const startDeleting = () => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    const docRef = doc(
      db,
      `${activeNote.userId}/journal/notes/${activeNote.id}`
    );

    await deleteDoc(docRef)
      .then(() => {
        dispatch(deleteNote(activeNote.id));
        Swal.fire("Deleted!", "Your note has been deleted", "success");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error!", "Your note has not been deleted", "error");
      });
  };
};

export const deleteNote = (id) => ({
  type: types.notesRemove,
  payload: id,
});

export const clearNotes = () => ({
  type: types.notesClearNotes,
});
