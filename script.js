const taskInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-btn');
const taskList = document.querySelector('#task-list');

async function loadTasks() {
  const response = await fetch('http://localhost:3000/api/tasks'); 
  const tasks = await response.json();
  taskList.innerHTML = '';
  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.textContent = task.text + ' ';

    // สร้างปุ่มลบ
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'ลบ';
    deleteBtn.onclick = () => deleteTask(task.id);

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

async function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;
  await fetch('http://localhost:3000/api/tasks', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: text })
  });
  taskInput.value = '';
  loadTasks();
}

// ฟังก์ชันสำหรับส่งคำขอลบไปยัง Backend
async function deleteTask(id) {
  await fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: 'DELETE'
  });
  loadTasks(); // โหลดรายการใหม่หลังจากลบสำเร็จ
}

addBtn.addEventListener('click', addTask);
loadTasks();