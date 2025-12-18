import { create } from 'zustand'

type useModalType = {
  open_modal: boolean,
  set_open_modal: (boolean: boolean) => void,
  reset_open_modal: () => void
}

const useModal = create<useModalType>((set) =>({
  open_modal: false,
  set_open_modal: (boolean) => set({open_modal: boolean}),
  reset_open_modal: () => set({open_modal: false})
}))

export default useModal