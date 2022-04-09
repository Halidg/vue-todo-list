import { createStore } from 'vuex'

export default createStore({
  state: {
    tasks: JSON.parse(localStorage.getItem('tasksInfo')) ?? [] 
  },
  mutations: {
    addTasks(state, task) {
      state.tasks.push(task)
      localStorage.setItem('tasksInfo', JSON.stringify(state.tasks))
    },
    updateTask(state, data) {
      state.tasks.forEach(task => {
        if (task.id === data.id) {
          task.completedTask = data.checked  
        }  
      })
      localStorage.setItem('tasksInfo', JSON.stringify(state.tasks))     
    },
    clearActiveTasks(state) {
     state.tasks = state.tasks.filter(el => !el.completedTask)
    }  
  },
  actions: {
  },
  getters: {
    allTasks(state) {
      return state.tasks
    },
    undoneTasks(state) {
      return state.tasks.filter(el => !el.completedTask)  
    },
    doneTasks(state) {
      return state.tasks.filter(el => el.completedTask)  
    }  
  }
})
