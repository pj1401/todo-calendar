import m from 'mithril'

interface ModalAttrs {
  message: string
  confirmBtnText: string
  onConfirm: () => void
  onCancel: () => void
}

export const Modal: m.ClosureComponent<ModalAttrs> = () => {
  return {
    view: ({ attrs: { message, confirmBtnText, onConfirm, onCancel } }) => {
      return m('div', { class: 'modal' },
        m('span', message),
        m('div',
          m('button', { onclick: onConfirm }, confirmBtnText),
          m('button', { onclick: onCancel }, 'Cancel'),
        ),
      )
    },
  }
}
