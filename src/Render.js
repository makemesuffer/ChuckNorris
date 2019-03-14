
const render = (data, i, array, callback) => {
  let note = document.createElement('div');
  note.classList.add('note');
  note.style.background = data.background;

  let content = document.createElement('div');
  content.classList.add('content');
  content.textContent = data.content;
  note.appendChild(content);

  let overlay = document.createElement('div');
  overlay.classList.add('overlay');
  note.appendChild(overlay);

  let editButton = document.createElement('button');
  editButton.classList.add('btn', 'btn-warning');
  editButton.textContent = 'edit ';
  overlay.appendChild(editButton);

  let deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.innerText = 'delete ';
  overlay.appendChild(deleteButton);

  editButton.onclick = () => {
    array[i].content = prompt("Введите новый контент", data.content);
    callback(array);
  };

  deleteButton.onclick = () => {
    array.splice(i, 1);
    callback(array);
  };

  return note;
};

export default render;