import { db, getDocs, collection } from "../firebase/firabase-config";


export const loadNotes = async (uid) => {

    const notesSnap = await getDocs(collection(db, `${uid}/journal/notes`));

    const notes = notesSnap.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    });
    
    return notes;
}