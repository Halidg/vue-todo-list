<template>
  <ul class="task-list">
   <li v-for="task in allTasks" :key="task.id" class="task-list-item">
    <label class="task-input__label">
      <input class="task-input" @change="change(task.id)" :id='task.id'  type="checkbox" v-model="checked[task.id]">
      <span>{{task.taskName}}</span>
    </label>
   </li>   
  </ul>
  <div class="task-buttons">
    <button @click="filterChange('All')"  class="task-button all">Все</button>
    <button @click="filterChange('Completed')" class="task-button done">Выполненные</button>
    <button @click="filterChange('Active')" class="task-button active">Активные</button>
    <button @click="clearActive" class="task-button delete">Очистить Выполненные</button>  
  </div>  
  Активных задач: {{tasksLeft}}
</template>

<script>
export default {
  emits:['checked'],
  computed: {
    allTasks() {
      const allTasks = this.$store.getters.allTasks
      const activeTasks = this.$store.getters.undoneTasks
      const doneTasks = this.$store.getters.doneTasks

      switch (this.filter) {
        case 'Active':
          return activeTasks

        case 'Completed':
          return doneTasks

        default:
          return allTasks
    }
    },
    tasksLeft() {
      return  this.$store.getters.undoneTasks.length
    }
  },
  data() {
    return {
      checked: {},
      filter: ''
    }    
  },
  methods: {
    change(id) {
      const data = {
        id,
        checked: this.checked[id]  
      }
        this.$emit('checked', data) 
    },
    filterChange(status) {
      this.filter = status
    },
    clearActive() {
      this.$store.commit('clearActiveTasks')
    }
  },
  mounted() {
    const tasks = this.$store.getters.allTasks
    tasks.forEach(task => {
      this.checked[task.id] = task.completedTask
    })
  }
}
</script>

<style lang="scss" scoped>
.task-list {
  list-style: none;
  padding: 0;    
}
.task-list-item {
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 25px;
  margin-bottom: 20px;
}
.task-input {
  width: 16px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #272727;
  transition: 0.2s;
  margin-right: 8px;
  margin-bottom: 1px;
  &:checked + span {
    text-decoration: line-through;    
  }
  &__label {
    display: flex;
    align-items: flex-start;
    margin-right: 8px;
    cursor: pointer;    
  }
}
.task-buttons {
  padding: 10px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.task-button {
  padding: 10px;
  border-radius: 10px;
  border: none;
  color: white;
  &:hover{
    cursor: pointer;
    background-color: #777171;
    transition: 0.2s;  
  }
  @media (max-width: 430px) {
   padding: 2px;
   font-size: 15px;
   margin-right: 5px;  
  }   
  @media (max-width: 360px) {
   padding: 2px;
   font-size: 10px;
   margin-right: 5px;  
  }   
}
</style>