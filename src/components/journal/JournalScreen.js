import React from "react";
import { Sidebar } from "./Sidebar";
import { NoteScreen } from "../notes/NoteScreen";
import { useSelector } from "react-redux";
import { NothingSelected } from './NothingSelected';

export const JournalScreen = () => {

  const activeNote = useSelector((state) => state.notes.active);

  return (
    <div className='journal__main-content animate__animated animate__fadeIn'>
      <Sidebar />

      <main>

        {activeNote ? <NoteScreen /> : <NothingSelected />}

      </main>
    </div>
  );
};
