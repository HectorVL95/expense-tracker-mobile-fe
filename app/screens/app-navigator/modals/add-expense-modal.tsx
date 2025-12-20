import { Modal, View, Text, TextInput } from 'react-native';
import useModal from 'app/hooks/useModal';
import ShortButton from 'app/components/short-button';
import DateInput from '../components/date-input';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store'
import { useMutation } from '@tanstack/react-query';

const AddExpenseModal = () => {
  const { open_modal, reset_open_modal } = useModal()
  const [expense_input, set_expense_input] = useState({
    amount: '',
    date: '',
    name: '',
  })

  const create_expense = async () => {
    const token = await SecureStore.getItemAsync('token')
    if (!token) return;
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/expense/create_expense`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(expense_input)
    })

    if (!res.ok) throw new Error('Error seing the response')
    return await res.json()
  }

  const create_expense_mutation = useMutation({
    mutationFn: create_expense,
    onSuccess:() => {
      reset_open_modal()
      console.log('created expense')
      set_expense_input({
        amount: '',
        date: '',
        name: '',
      })
    },
    onError: (error) => {
      console.log(error.message)
    }
  })

  const handle_add_button = () => {
    create_expense_mutation.mutate()
  }

  const handle_cancel_button = () => {
    reset_open_modal()
    set_expense_input({
      amount: '',
      date: '',
      name: '',
      })
  }

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
                  value={expense_input.amount}
                  onChangeText={(text) => set_expense_input(prev => ({...prev, amount: text}))}
                />
              </View>
             <DateInput date_input={expense_input.date} set_date_input={set_expense_input}/>
            </View>
            <View className='w-full max-w-[360px] items-center'>
              <Text className='text-white text-left font-bold'>Name</Text>
              <TextInput 
                multiline
                numberOfLines={4}
                className='w-full font-bold bg-whiteish rounded-lg h-[120px] pl-2'
                textAlignVertical='top'
                value={expense_input.name}
                onChangeText={(text) => set_expense_input(prev => ({...prev, name: text}))}
              />
            </View>
          </View>
          <View className='justify-center items-center flex-row gap-8'>
            <ShortButton on_press={handle_cancel_button} text={'Cancel'}/>
            <ShortButton on_press={handle_add_button} text={'Add'} filled/>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default AddExpenseModal;