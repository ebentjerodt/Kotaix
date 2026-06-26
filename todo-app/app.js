let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
let filter = 'all';

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById('new-task');
  const text = input.value.trim();
  if (!text) return;
  tasks.unshift({ id: Date.now(), text, done: false });
  input.value = '';
  save();
  render();
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  save();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.done);
  save();
  render();
}

function setFilter(f, btn) {
  filter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render();
}

function render() {
  const list = document.getElementById('task-list');
  const empty = document.getElementById('empty-msg');

  const visible = tasks.filter(t => {
    if (filter === 'pending') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  list.innerHTML = visible.map(t => `
    <li class="task-item ${t.done ? 'done' : ''}">
      <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTask(${t.id})" />
      <span class="task-text">${t.text}</span>
      <button class="delete-btn" onclick="deleteTask(${t.id})">×</button>
    </li>
  `).join('');

  const pending = tasks.filter(t => !t.done).length;
  document.getElementById('stats-text').textContent =
    pending === 1 ? '1 tarea pendiente' : `${pending} tareas pendientes`;

  empty.style.display = visible.length === 0 ? 'block' : 'none';
}

// Mostrar fecha actual
const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const now = new Date();
document.getElementById('date').textContent =
  `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]} ${now.getFullYear()}`;

render();
