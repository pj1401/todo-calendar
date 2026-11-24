export interface InfoPanel {
  openTaskId: string | null
  open: (taskId: string) => void
  close: () => void
}
