const { contextBridge, app } = require('electron')
const fs = require('fs')
const path = require('path')

const dataPath = path.join(app.getPath('userData'), 'tasks.json')

contextBridge.exposeInMainWorld('electronAPI', {
  getTasks: () => {
    if (fs.existsSync(dataPath)) {
      return JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    }
    return []
  },
  saveTasks: (tasks) => {
    fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2))
  }
})
