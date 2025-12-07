const taskInput = document.getElementById('taskInput')
const addBtn = document.getElementById('addBtn')
const taskList = document.getElementById('taskList')

function createTaskElement(taskText, completed = false) {
  const li = document.createElement('li')
  li.className = 'task'

  const text = document.createElement('span')
  text.className = 'text'
  text.textContent = taskText
  li.appendChild(text)

  if (completed) li.classList.add('completed')

  li.addEventListener('click', () => {
    li.classList.toggle('completed')
    saveTasks()
  })

  const del = document.createElement('span')
  del.className = 'delete'
  del.textContent = '×'
  del.onclick = (e) => {
    e.stopPropagation()
    li.remove()
    saveTasks()
  }

  li.appendChild(del)
  return li
}

function loadTasks() {
  const tasks = window.electronAPI.getTasks()
  tasks.forEach(t => taskList.appendChild(createTaskElement(t.text, t.completed)))
}

function saveTasks() {
  const tasks = []
  taskList.querySelectorAll('li.task').forEach(li => {
    tasks.push({
      text: li.querySelector('.text').textContent,
      completed: li.classList.contains('completed')
    })
  })
  window.electronAPI.saveTasks(tasks)
}

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim()
  if (!text) return
  taskList.appendChild(createTaskElement(text))
  taskInput.value = ''
  saveTasks()
})

loadTasks()
