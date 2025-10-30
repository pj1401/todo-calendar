document.addEventListener('DOMContentLoaded', () => {
  // Update the checkbox
  document.querySelectorAll('.todo-checkbox').forEach(cb => {
    cb.addEventListener('change', async (event) => {
      const container = event.target.closest('.todo-container')
      const id = container.dataset.id
      const completed = event.target.checked

      await fetch(`/${id}/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed })
      })
    })
  })

  // Stop default form submission.
  document.querySelectorAll('.todo-form').forEach(form => {
    form.addEventListener('submit', (e) => e.preventDefault())
  })
})
