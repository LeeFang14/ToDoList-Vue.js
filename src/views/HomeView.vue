<script setup>
import { onMounted, ref } from 'vue'
import { useTaskStore } from '@/stores/task'
const taskStore = useTaskStore()

onMounted(() => {
  taskStore.fetchTaskList('MyTasks')
})

const editState = ref(false)
const showPopup = ref(false)
const popupMessage = ref('')
const popupType = ref('')

function showNotification(message, type) {
  popupMessage.value = message
  popupType.value = type
  showPopup.value = true

  setTimeout(() => {
    hideNotification()
  }, 3000)
}

function hideNotification() {
  showPopup.value = false
  popupMessage.value = ''
  popupType.value = ''
}

async function getTask(taskId) {
  const state = await taskStore.fetchTask(taskId)
  if (state === 200) {
    editState.value = true
  }
}

async function handleTaskSubmit(taskID) {
  try {
    showNotification('修改中...', 'loading')
    const state = await taskStore.updateTask(taskID, { fields: taskStore.task.fields })
    if (state === 200) {
      showNotification('操作成功', 'success')
      taskStore.fetchTaskList('')
      taskStore.task = {}
    } else {
      throw new Error('API請求失敗')
    }
  } catch (error) {
    console.error('API請求失敗:', error)
    showNotification('操作失敗', 'error')
  }
}

async function toggleFinished(taskID) {
  try {
    showNotification('修改中...', 'loading')
    const found = taskStore.taskList.find((item) => item.id === taskID)
    const currentForm = { ...found }
    currentForm.fields.doneState = !currentForm.fields.doneState
    const state = await taskStore.updateTask(currentForm.id, {
      fields: currentForm.fields
    })
    if (state === 200) {
      showNotification('操作成功', 'success')
      taskStore.fetchTaskList('')
      taskStore.task = {}
    } else {
      throw new Error('API請求失敗')
    }
  } catch (error) {
    console.error('API請求失敗:', error)
    showNotification('操作失敗', 'error')
  }
}

async function toggleImportant(taskID) {
  try {
    showNotification('修改中...', 'loading')
    const found = taskStore.taskList.find((item) => item.id === taskID)
    const currentForm = { ...found }
    currentForm.fields.subscribeState = !currentForm.fields.subscribeState
    const state = await taskStore.updateTask(currentForm.id, {
      fields: currentForm.fields
    })
    if (state === 200) {
      showNotification('操作成功', 'success')
      taskStore.fetchTaskList('')
      taskStore.task = {}
    } else {
      throw new Error('API請求失敗')
    }
  } catch (error) {
    console.error('API請求失敗:', error)
    showNotification('操作失敗', 'error')
  }
}

function cancelEditState() {
  editState.value = false
  taskStore.task = {}
}

function getFileDetail(e) {
  const selectedFile = e.target.files
  if (selectedFile.length) {
    taskStore.task.fields.fileName = selectedFile[0].name
    taskStore.task.fields.fileUploadDate = getCurrentDate()
  }
}

function getCurrentDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>
<template>
  <div v-if="showPopup" class="popup" :class="popupType">
    {{ popupMessage }}
  </div>
  <div class="task-list">
    <div
      class="task-item-content"
      :class="{
        finished: titleItem.fields.doneState,
        important: titleItem.fields.subscribeState
      }"
      v-for="titleItem in taskStore.taskList"
      :key="titleItem.id"
    >
      <form
        v-if="taskStore.task.id !== titleItem.id"
        :id="titleItem.id"
        class="task-title"
      >
        <div class="task-header">
          <div>
            <button type="button" class="check" @click="toggleFinished(titleItem.id)">
              <i class="fa-solid fa-check"></i>
            </button>
          </div>
          <div>
            <div class="title-dashboard">
              <input
                type="text"
                name="title"
                placeholder="Typing something Here..."
                v-model="titleItem.fields.title"
                disabled
                required
              />
              <button
                type="button"
                class="subscribe"
                @click="toggleImportant(titleItem.id)"
              >
                <i class="fa-star fa-regular"></i>
              </button>
              <button type="button" class="edit" @click="getTask(titleItem.id)">
                <i class="fa-pen fa-light"></i>
              </button>
            </div>
            <div class="content-status">
              <span>
                <i class="fa-solid fa-calendar-days"></i
                >{{ titleItem.fields.deadlineDate }}
              </span>
              <i class="fa-light fa-file" v-if="titleItem.fields.fileName"></i>
              <i class="fa-regular fa-comment-dots" v-if="titleItem.fields.comment"></i>
            </div>
          </div>
        </div>
      </form>

      <form
        v-if="taskStore.task.id === titleItem.id"
        :id="taskStore.task.id"
        class="task-item editing"
        @reset.prevent="cancelEditState(taskStore.task.id)"
        @submit.prevent="handleTaskSubmit(taskStore.task.id)"
      >
        <div class="task-header">
          <div>
            <button type="button" class="check" disabled>
              <i class="fa-solid fa-check"></i>
            </button>
          </div>
          <div class="title-dashboard">
            <input
              type="text"
              name="title"
              placeholder="Typing something Here..."
              v-model="taskStore.task.fields.title"
              required
            />
            <button type="button" class="subscribe" disabled>
              <i class="fa-star fa-regular"></i>
            </button>
            <button type="button" class="edit" :disabled="editState">
              <i class="fa-pen fa-light"></i>
            </button>
          </div>
        </div>
        <div>
          <div class="task-body">
            <div class="deadline">
              <div class="title-icon">
                <i class="fa-solid fa-calendar-days"></i>
              </div>
              <div>
                <p class="title">Deadline</p>
                <div class="deadline-content">
                  <input
                    name="date"
                    type="date"
                    v-model="taskStore.task.fields.deadlineDate"
                    required
                  />
                  <input
                    name="time"
                    type="time"
                    v-model="taskStore.task.fields.deadlineTime"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="file">
              <div class="title-icon">
                <i class="fa-light fa-file"></i>
              </div>
              <div>
                <p class="title">File</p>
                <div class="file-content">
                  <div class="file-detail" v-show="taskStore.task.fields.fileName">
                    <p class="name">{{ taskStore.task.fields.fileName }}</p>
                    <p class="upload-date">
                      uploaded {{ taskStore.task.fields.fileUploadDate }}
                    </p>
                  </div>
                  <label :for="`file-${taskStore.task.id}`" class="add-file">
                    <i class="fa-light fa-plus"></i>
                    <input
                      :id="`file-${taskStore.task.id}`"
                      type="file"
                      name="file"
                      @input="getFileDetail($event)"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div class="comment">
              <div class="title-icon">
                <i class="fa-regular fa-comment-dots"></i>
              </div>
              <div>
                <p class="title">Comment</p>
                <div class="comment-content">
                  <textarea
                    name="comment"
                    rows="5"
                    placeholder="Type your memo here…"
                    v-model="taskStore.task.fields.comment"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="task-footer">
            <button type="reset">
              <i class="fa-light fa-xmark"></i>
              <span>Cancel</span>
            </button>
            <button type="submit">
              <i class="fa-light fa-plus"></i>
              <span>Save</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <p class="task-counter">{{ taskStore.taskList.length }} tasks</p>
</template>
