import { create } from 'zustand'

type useModalType = {
  open_modal: boolean,
  modal_type: string,
  modal_id: string
  set_open_modal: (boolean: boolean, type: string, id: string) => void,
  reset_open_modal: () => void
}

const useModal = create<useModalType>((set) =>({
  open_modal: false,
  modal_type: '',
  modal_id: '',
  set_open_modal: (boolean, type, id) => set({open_modal: boolean, modal_type: type, modal_id: id}),
  reset_open_modal: () => set({open_modal: false, modal_type: '', modal_id: ''})
}))

export default useModal