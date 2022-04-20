import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesAddNew:
      return {
        ...state,
        active: action.payload,
        notes: [action.payload, ...state.notes],
      };

    case types.notesRemove:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };

    case types.notesUpdated:
      return {
        ...state,
        active: null,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };

    case types.notesActive:
      return {
        ...state,
        active: { ...action.payload },
      };

    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };

    case types.notesClearNotes:
      return {
        ...state,
        notes: [],
        active: null,
      };

    default:
      return state;
  }
};
