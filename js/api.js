export const apiGetTodos = async function (owner) {
  const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
  return await response.json();
}

export const apiCteateTodo = async function (name, owner) {
  const response = await fetch(`http://localhost:3000/api/todos`, {
    method: 'POST',
    headers: { 'content-Type': 'appLication/json' },
    body: JSON.stringify({
      name: name.input.value,
      owner,
    }),
  });
  return await response.json()

}

export const apiDelete = async function (item) {
  const response = await fetch(`http://localhost:3000/api/todos/${item.id}`, {
    method: 'DELETE'
  });
}

export const apiDone = async function (item) {
  let status;
  if (item.classList.contains('list-group-item-success')) status = true;
  else status = false;
  const response = await fetch(`http://localhost:3000/api/todos/${item.id}`, {
    method: 'PATCH',
    headers: { 'content-Type': 'appLication/json' },
    body: JSON.stringify({ done: status })
  });
}
