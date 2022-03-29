import { lSAdd, lSGet, btnDelete, btnDone, switcher } from './localStorege.js';
import { apiGetTodos, apiCteateTodo, apiDelete, apiDone } from './api.js'


let todoListArr = [];

function createAppTitle(title) {
  const block = document.createElement('div');
  const appTitle = document.createElement('h2');
  const btnSwitch = document.createElement('button');
  block.classList.add('header-block');
  btnSwitch.classList.add('btn', 'btn-success', 'btn-switch');
  btnSwitch.style.marginBottom = '10px';
  appTitle.innerHTML = title;
  block.append(appTitle, btnSwitch);
  const status = switcher(btnSwitch);
  return block;
}

function createTodoItemForm() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const buttonWrapper = document.createElement('div');
  const button = document.createElement('button');


  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';


  buttonWrapper.append(button);
  form.append(input, buttonWrapper);

  return {
    form,
    input,
    button,
  };
}

function createTodoList() {
  const list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

function createTodoItem(name, element, key) {
  const btnSwitch = document.querySelector('.btn-switch');
  const item = document.createElement('li');
  const buttonGroup = document.createElement('div');
  const doneButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-item-center');
  if (!name) {
    item.textContent = element.name;
    item.id = element.id;
  } else {
    item.textContent = name;
    const randomId = Math.random() * 10 ** 17;
    item.id = randomId;
  }


  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';


  doneButton.addEventListener('click', function () {
    item.classList.toggle('list-group-item-success');
    if (btnSwitch.textContent === 'LS') btnDone(item, todoListArr, key);
    if (btnSwitch.textContent === 'API') apiDone(item);
  });


  deleteButton.addEventListener('click', function () {
    if (confirm('Вы уверены?')) {
      item.remove();
      if (btnSwitch.textContent === 'LS') btnDelete(item, todoListArr, key);
      if (btnSwitch.textContent === 'API') apiDelete(item);
    }

  });
  buttonGroup.append(doneButton, deleteButton);
  item.append(buttonGroup);

  return item;

}

export async function createTodoApp(container, title = 'Список дел', key) {
  const todoAppTitle = createAppTitle(title);
  container.append(todoAppTitle);
  const todoItemForm = createTodoItemForm();
  const todoList = createTodoList();
  const btnSwitch = document.querySelector('.btn-switch');
  console.log(btnSwitch.textContent);

  if (btnSwitch.textContent === 'LS') {
    lSGet(key, todoListArr);
    if (todoListArr) {
      todoListArr.forEach(element => {
        const list = createTodoItem(false, element, key);
        if (element.done) list.classList.add('list-group-item-success');
        todoList.append(list);
      });
    }
  };
  if (btnSwitch.textContent === 'API') {
    const apiTodoItems = await apiGetTodos(key);
    apiTodoItems.forEach(element => {
      const list = createTodoItem(false, element, key);
      if (element.done) list.classList.add('list-group-item-success');
      todoList.append(list);
    })
    console.log(apiTodoItems);
  }

  container.append(todoItemForm.form);
  container.append(todoList);

  todoItemForm.button.setAttribute('disabled', 'disabled')
  todoItemForm.input.addEventListener('input', function () {
    if (todoItemForm.input.value) {
      todoItemForm.button.removeAttribute('disabled', 'disabled')
    } else {
      todoItemForm.button.setAttribute('disabled', 'disabled')
    }
  })


  todoItemForm.form.addEventListener('submit', async function (e) {

    e.preventDefault();

    if (!todoItemForm.input.value) {
      return;
    }
    const todoItem = createTodoItem(todoItemForm.input.value, false, key);

    todoList.append(todoItem);

    if (btnSwitch.textContent === 'LS') lSAdd(key, todoListArr, todoItemForm, todoItem);
    if (btnSwitch.textContent === 'API') {
      const apiItem = await apiCteateTodo(todoItemForm, key);
      todoItem.id = apiItem.id;
    }

    todoItemForm.input.value = '';
    todoItemForm.button.setAttribute('disabled', 'disabled');
  });

}
