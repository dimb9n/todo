export const lSAdd = function (key, arr, form, item) {
  const point = {
    name: form.input.value,
    done: false,
    id: item.id,
  };
  arr.push(point);
  localStorage.setItem(key, JSON.stringify(arr));
}

export const lSGet = function (key, arr) {
  const lsTodoList = localStorage.getItem(key);
  const todoList = JSON.parse(lsTodoList);
  if (todoList) {
    todoList.forEach(element => {
      arr.push(element);
    });
  }
}

export const btnDelete = function (item, arr, key) {
  const arrFilt = arr.filter(element => element.id !== item.id);
  arr.filter(element => element.id !== item.id);
  localStorage.setItem(key, JSON.stringify(arrFilt));
  arr.splice(0);
  arrFilt.forEach(element => arr.push(element))
}

export const btnDone = function (item, arr, key) {
  arr.map(element => {
    if (element.id === item.id) element.done = !element.done;
  });
  localStorage.setItem(key, JSON.stringify(arr));
  console.log(arr);
}

export const switcher = function (btn) {
  let status;
  const btnStatus = localStorage.getItem('switch');
  if (btnStatus) btn.textContent = btnStatus;
  else btn.textContent = 'LS';
  btn.addEventListener('click', () => {
    if (btn.textContent === 'LS') btn.textContent = 'API';
    else btn.textContent = 'LS';
    localStorage.setItem('switch', btn.textContent);
    location.reload();
  });

}
