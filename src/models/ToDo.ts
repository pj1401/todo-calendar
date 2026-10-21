const date: Date | null = null

const ToDo = {
  task: '',
  completed: false,
  date: date,
  setTask: function (value: string) {
    ToDo.task = value
  },
  setCompleted: function (value: boolean) {
    ToDo.completed = value
  },
  setDate: function (value: Date) {
    ToDo.date = value
  },
  canSubmit: function () {
    return ToDo.task.trim() !== ''
  },
  reset: function () {
    ToDo.task = ''
    ToDo.completed = false
    console.log(ToDo.task)
  },
}

export default ToDo
