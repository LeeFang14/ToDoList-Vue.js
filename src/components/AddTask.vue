<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/task'
const taskStore = useTaskStore()

const initialFormData = {
  doneState: false,
  title: '',
  subscribeState: false,
  deadlineDate: '',
  deadlineTime: '',
  fileName: '',
  fileUploadDate: '',
  comment: ''
}

const newFormData = ref({ ...initialFormData })
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

async function handleNewTaskSubmit() {
  try {
    showNotification('修改中...', 'loading')
    const state = await taskStore.createTask({ records: [{ fields: newFormData.value }] })
    if (state === 200) {
      showNotification('操作成功', 'success')
      newFormData.value = { ...initialFormData }
      editState.value = !editState.value
      taskStore.fetchTaskList('')
    } else {
      throw new Error('API請求失敗')
    }
  } catch (error) {
    console.error('API請求失敗:', error)
    showNotification('操作失敗', 'error')
  }
}

function toggleFormVisibility() {
  editState.value = !editState.value
  newFormData.value = { ...initialFormData }
}

const fileDetailState = ref(false)
function getFileDetail(e) {
  const selectedFile = e.target.files
  if (selectedFile.length) {
    fileDetailState.value = true
    newFormData.value.fileName = selectedFile[0].name
    newFormData.value.fileUploadDate = getCurrentDate()
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
  <div
    class="task-add"
    :class="{
      editstate: editState
    }"
  >
    <button class="add-icon" @click="editState = !editState">
      <i class="fa-light fa-plus"></i>Add Task
    </button>
    <div
      class="task-item-content"
      :class="{
        finished: newFormData.doneState,
        important: newFormData.subscribeState
      }"
    >
      <form
        class="task-item editing"
        @submit.prevent="handleNewTaskSubmit"
        @reset="toggleFormVisibility"
      >
        <div class="task-header">
          <div>
            <button
              type="button"
              class="check"
              @click="newFormData.doneState = !newFormData.doneState"
            >
              <i class="fa-solid fa-check"></i>
            </button>
          </div>
          <div>
            <div class="title-dashboard">
              <input
                type="text"
                name="title"
                placeholder="Typing something Here..."
                v-model="newFormData.title"
                required
              />
              <button
                type="button"
                class="subscribe"
                @click="newFormData.subscribeState = !newFormData.subscribeState"
              >
                <i class="fa-star fa-regular"></i>
              </button>
              <button
                type="button"
                class="edit"
                :disabled="editState"
                @click="toggleFormVisibility"
              >
                <i class="fa-pen fa-light"></i>
              </button>
            </div>
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
                    v-model="newFormData.deadlineDate"
                    required
                  />
                  <input
                    name="time"
                    type="time"
                    v-model="newFormData.deadlineTime"
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
                  <div class="file-detail" v-show="fileDetailState">
                    <p class="name">{{ newFormData.fileName }}</p>
                    <p class="upload-date">uploaded {{ newFormData.fileUploadDate }}</p>
                  </div>
                  <label for="file-upload" class="add-file">
                    <i class="fa-light fa-plus"></i>
                    <input
                      id="file-upload"
                      type="file"
                      name="file"
                      @input="getFileDetail"
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
                    v-model="newFormData.comment"
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
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-add {
  margin-bottom: 12px;
  @include breakpoint($lg) {
    margin-bottom: 24px;
  }
  .task-item {
    display: none;
  }
}

.task-add.editstate {
  .add-icon {
    display: none;
  }
  .task-item {
    display: block;
    border-radius: 5px;
  }
}

.add-icon {
  width: 100%;
  padding: 17px 32px 16.5px;
  background: $white;
  @include AddIcon;
  cursor: pointer;
  border: 2px solid $gray-300;
  border-radius: 5px;
  &:hover {
    border: 2px solid $light-blue;
  }
  .fa-light.fa-plus {
    margin-right: 5px;
  }
}
</style>
