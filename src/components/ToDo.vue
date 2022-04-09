<template>
  <h1 class="task-h1">Vue ToDo List</h1>
  <div class="add-task">
     <input class="task-input" v-model="task" type="text" @keypress.enter="createTask">
     <img src="../assets/icon-plus.svg" @click="createTask" class="task-button">   
  </div>

  <task-list @checked="checked"></task-list> 
</template>

<script>
import TaskList from './TaskList.vue'

export default {
  components: {TaskList},
  data() {
    return {
      task: ''
    }    
  },
  methods: {
     checked(data) {
       this.$store.commit('updateTask', data)
    },      
    createTask() {
      const task = {
        id: Date.now(),
        taskName: this.task,
        completedTask: false   
      }
      this.$store.commit('addTasks', task) 
      this.task = ''     
    }
  }
}
</script>

<style lang="scss" scoped>
.task-h1 {
  text-align: center;
}
.add-task {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;     
}
.task-input {
  padding: 10px;
  width: 100%;
  border: none;
  border-bottom: 1px solid #272727;
  background-color: transparent;
  outline: none;
  color: black;
  margin-right: 5px;    
}
.task-button {
  padding: 5px;
  border-radius: 10px;
  border: none;
  background-color: rgb(218, 177, 218);
  &:hover {
    cursor: pointer;
    background-color: rgb(143, 114, 143);     
  }    
}
</style>