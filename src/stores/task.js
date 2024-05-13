import { ref } from 'vue'
import { defineStore } from 'pinia'
import { API } from '@/API/axiosAPI.js'

export const useTaskStore = defineStore('task', () => {
  const task = ref({})
  const taskList = ref([])

  async function createTask(taskData) {
    try {
      const response = await API.post('/task', taskData)
      return response.status
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async function fetchTaskList(viewName) {
    try {
      const response = await API.get(`task?view=${viewName}`)
      taskList.value = response.data.records.sort(
        (a, b) => b.fields.created - a.fields.created
      )
      return response.status
    } catch (error) {
      console.log(error)
      return null
    }
  }

  async function fetchTask(taskID) {
    const response = await API.get(`/task/${taskID}`, taskID)
    task.value = response.data
    return response.status
  }

  async function updateTask(taskID, taskData) {
    try {
      const response = await API.patch(`/task/${taskID}`, taskData)
      return response.status
    } catch (error) {
      console.log(error)
      return null
    }
  }

  return { task, taskList, createTask, fetchTaskList, fetchTask, updateTask }
})
