const ToDo = {
  task: '',
  completed: false,
  setTask: function (value: string) {
    ToDo.task = value
  },
  setCompleted: function (value: boolean) {
    ToDo.completed = value
  },
  canSubmit: function () {
    return ToDo.task !== ''
  },
}

module.exports = ToDo
