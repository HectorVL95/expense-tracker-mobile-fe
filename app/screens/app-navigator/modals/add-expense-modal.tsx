import { Modal, View, Text, TextInput } from 'react-native';
import useModal from 'app/hooks/useModal';
import ShortButton from 'app/components/short-button';


const AddExpenseModal = () => {
  const { open_modal, reset_open_modal } = useModal()

  return (
    <Modal
      visible={open_modal}
      animationType='slide'
      onRequestClose={() => {
        console.log('closed modal, but it aint P!!!')
      }}
      transparent
    >
      <View  className='bg-secondary h-12 items-center justify-center rounded-t-12 overflow-hidden'>
        <Text className='text-white text-center font-bold'>Add expense</Text>
      </View>
      <View className='flex-1  items-center bg-primary p-8'>
        <View className='flex-col gap-2'>
          <View>
            <TextInput
              className='text-white font-bold'
              placeholder='text-white font-bold'
            />
            <View>

            </View>
          </View>
          <View className='flex-row gap-8'>
            <ShortButton on_press={reset_open_modal} text={'Cancel'}/>
            <ShortButton on_press={()=>{}} text={'Add'} filled/>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default AddExpenseModal;