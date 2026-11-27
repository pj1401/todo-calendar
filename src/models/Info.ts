export interface InfoPanel {
  openTaskId: string | null
  open: (taskId: string) => void
  close: () => void
}

export default class Info implements InfoPanel {
  openTaskId: string | null
  constructor () {
    this.openTaskId = null
  }

  open (taskId: string) { this.openTaskId = taskId }
  close () { this.openTaskId = null }
}
