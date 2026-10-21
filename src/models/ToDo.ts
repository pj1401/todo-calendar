const ToDo = {
  task: '',
  completed: false,
  date: '',
  setTask: function (value: string) {
    ToDo.task = value
  },
  setCompleted: function (value: boolean) {
    ToDo.completed = value
  },
  setDate: function (value: string) {
    ToDo.date = value
  },
  canSubmit: function () {
    return ToDo.task.trim() !== ''
  },
  reset: function () {
    ToDo.task = ''
    ToDo.completed = false
    ToDo.date = ''
  },
}

export default ToDo
