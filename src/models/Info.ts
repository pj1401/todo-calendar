export interface InfoPanel {
  open: (taskId: string) => void
  close: () => void
  isInfoOpen: (taskId: string) => boolean
}

/**
 * Keeps track of which task has an open InfoPanel
 */
export default class Info implements InfoPanel {
  #openTaskId: string | null = null

  open = (taskId: string) => { this.#openTaskId = taskId }
  close = () => { this.#openTaskId = null }
  isInfoOpen = (taskId: string) => { return this.#openTaskId === taskId }
}
