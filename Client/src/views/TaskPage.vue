<template>
  <div>
    <h2>🧾 Task Dashboard</h2>
    <CreateTask />
    <TaskList />
  </div>
</template>

<script>
import CreateTask from '../components/CreateTask.vue'
import TaskList from '../components/TaskList.vue'

export default {
  components: {
    CreateTask,
    TaskList
  }
}
</script>
