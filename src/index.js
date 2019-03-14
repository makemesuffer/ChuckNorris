import axios from 'axios';

import render from './Render';
import { loadStorage, saveStorage } from './storage';

const apiUrl        = 'https://api.chucknorris.io/jokes/random';
const btnAdd        = document.querySelector('#add_note');
const btnRemoveAll  = document.querySelector('#remove_notes');
const fieldSearch   = document.querySelector('.search-field');
const body          = document.querySelector('.notes-list');
let arrNotes = loadStorage();

const getRandNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getRandColor = () => {
    const r = getRandNumber(0, 256);
    const g = getRandNumber(0, 256);
    const b = getRandNumber(0, 256);
    return `rgb(${r},${g},${b})`;
};

const handleCut = (text, maxCount) => {
    return text.length > maxCount ? `${text.slice(0, maxCount)}...` : text;
};


btnAdd.onclick = () => {
  axios(apiUrl)
    .then(response => refillData(response.data));
};

const refillData = data => {
    const maxSymbolsCount = 150;
    const newNote = {
        content: handleCut(data.value, maxSymbolsCount),
        background: getRandColor(),
    };
    arrNotes.push(newNote);
    renderNotes(arrNotes);
};

const renderNotes = arr => {
    body.innerHTML = '';
    arr.forEach((data, i, array) => {
        let note = render(data, i, array, renderNotes);
        body.appendChild(note);
    });
    saveStorage(arrNotes);
};

btnRemoveAll.onclick = () => {
  arrNotes = [];
  renderNotes(arrNotes);
};


fieldSearch.oninput = () => {
  let searchText = fieldSearch.value.trim();
  let filterNotes = arrNotes.filter(note => note.content.toLowerCase().includes(searchText.toLowerCase()) );
  renderNotes(filterNotes);
};




renderNotes(arrNotes);