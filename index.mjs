/* eslint-disable import/extensions */

import createElement from './helpers/createHelper.js';

const toDoList = document.getElementById('result');
const createToDoButton = document.getElementById('button');
let toDoId = 0;
async function api(date) {
  const copyDate = date.slice(8, 10);
  const copyMonth = date.slice(5, 7);
  const response = await fetch(`http://numbersapi.com/${copyMonth}/${copyDate}/date`);
  const dateFact = await response.text();
  return dateFact;
}

function deleteElement(id) {
  document.getElementById(id).remove();
}

function removeButtons(id) {
  const toDo = document.getElementById(id);

  const acceptButton = toDo.querySelector('.acceptButton');
  acceptButton.remove();

  const denyButton = toDo.querySelector('.denyButton');
  denyButton.remove();
}
function accept(id) {
  const toDo = document.getElementById(id);

  removeButtons(id);

  const toDoNewSpan = createElement('span', 'toDoNewSpan');
  const editInput = toDo.querySelector('.editInput');
  toDoNewSpan.append(editInput.value);
  editInput.remove();
  toDo.prepend(toDoNewSpan);
}

function deny(id, toDoText) {
  const toDo = document.getElementById(id);

  removeButtons(id);

  const editInput = toDo.querySelector('.editInput');
  editInput.remove();

  const toDoNewSpan = createElement('span', 'toDoNewSpan');
  toDoNewSpan.append(toDoText);
  toDo.prepend(toDoNewSpan);
}

function editToDo(id) {
  const toDo = document.getElementById(id);

  const editButton = toDo.querySelector('.editButton');
  editButton.remove();

  const toDoSpan = toDo.querySelector('.toDo');
  const toDoText = toDoSpan.innerText;
  toDoSpan.remove();
  const editInput = createElement('input', 'editInput', { value: toDoText });

  const acceptButton = createElement('button', 'acceptButton');
  const checkIcon = createElement('i', 'fa fa-check');
  acceptButton.append(checkIcon);
  acceptButton.addEventListener('click', () => accept(id));

  const denyButton = createElement('button', 'denyButton');
  const xIcon = createElement('i', 'fa fa-times');
  denyButton.append(xIcon);
  denyButton.addEventListener('click', () => deny(id, toDoText));

  toDo.prepend(editInput, acceptButton, denyButton);
}

function createToDo({ toDoText, dateText, factText }, id) {
  const toDoWrapper = createElement('div', 'toDoWrapper', { id });

  const toDo = createElement('span', 'toDo');
  toDo.append(toDoText);

  const date = createElement('span', 'toDoDate');
  date.append(dateText);

  const fact = createElement('span', 'toDoFact');
  fact.append(factText);

  const editButton = createElement('button', 'editButton');
  const pencilIcon = createElement('i', 'fa fa-pencil');
  editButton.append(pencilIcon);
  editButton.addEventListener('click', () => editToDo(id));

  const deleteButton = createElement('button', 'deleteButton');
  deleteButton.append('remove');
  deleteButton.addEventListener('click', () => deleteElement(id));

  toDoWrapper.append(toDo, date, fact, deleteButton, editButton);
  return toDoWrapper;
}

createToDoButton.addEventListener('click', async () => {
  const toDoText = document.getElementById('name').value;
  const dateText = document.getElementById('date').value;
  const factText = await api(dateText);
  toDoId += 1;
  const toDo = createToDo({ toDoText, dateText, factText }, toDoId);
  toDoList.append(toDo);
});
