
export const saveStorage = arrNotes => {
  let jsonNotes = JSON.stringify(arrNotes);
  localStorage.setItem('notes', jsonNotes);
};


export const loadStorage = () => {
  const savedNotes = localStorage.getItem('notes');
  return savedNotes ? JSON.parse(savedNotes) : [];
};