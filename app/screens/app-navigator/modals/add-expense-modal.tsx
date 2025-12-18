import { Modal, View, Text, TextInput } from 'react-native';
import useModal from 'app/hooks/useModal';
import ShortButton from 'app/components/short-button';
import DateInput from '../components/date-input';
import { useState } from 'react';

const AddExpenseModal = () => {
  const { open_modal, reset_open_modal } = useModal()
  const [expense_input, set_expense_input] = useState({

  })

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
      <View className='flex-1 items-center bg-primary p-8'>
        <View className='flex-col gap-2'>
          <View className='flex-col justify-center items-center gap-2 '>
            <View className='flex-row gap-2'>
              <View className='w-full max-w-[180px]'>
                <Text className='text-whiteish font-bold'>Amount</Text>
                <TextInput
                  className='font-bold bg-whiteish rounded-lg pl-2'
                  keyboardType='numeric'
                />
              </View>
             <DateInput/>
            </View>
            <View className='w-full max-w-[360px] items-center'>
              <Text className='text-white text-left font-bold'>Name</Text>
              <TextInput 
                multiline
                numberOfLines={4}
                className='w-full font-bold bg-whiteish rounded-lg h-[120px] pl-2'
                textAlignVertical='top'
              />
            </View>
          </View>
          <View className='justify-center items-center flex-row gap-8'>
            <ShortButton on_press={reset_open_modal} text={'Cancel'}/>
            <ShortButton on_press={()=>{}} text={'Add'} filled/>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default AddExpenseModal;