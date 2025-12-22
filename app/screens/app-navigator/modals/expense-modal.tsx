import useModal from 'app/hooks/useModal';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getItemAsync } from 'expo-secure-store';
import { useQuery } from '@tanstack/react-query';
import ShortButton from 'app/components/short-button';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, View, Text, TextInput, Pressable, Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const ExpenseModal = () => {
  const queryClient = useQueryClient()
  const { open_modal, reset_open_modal, modal_type, modal_id } = useModal()
  const [expense_input, set_expense_input] = useState({
    amount: '',
    date: '',
    name: '',
  })
  const [date, set_date] = useState<Date | null>(null)
  const [show, set_show] = useState(false)


  const get_single_expense = async () => {
    const token = await getItemAsync('token')
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/expense/get_single_expense/${modal_id}`, {
      method: 'GET',
      headers:{
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) throw new Error('Error in API call to get a single expense')
    return await res.json()
  }
  
  const { isLoading, data: expense_data } = useQuery({
    queryKey: ['single_expense', modal_id],
    queryFn: get_single_expense,
    enabled: modal_type !== 'add' && !!modal_id,
  })

  useEffect(() => {
    if(!expense_data) return;
    set_expense_input({
      amount: String(expense_data.data.amount),
      date: expense_data.data.date,
      name: expense_data.data.name,
    })
    set_date(new Date(expense_data.data.date))
    console.log(expense_data.data)
    console.log(expense_input)
  }, [expense_data])

  const format_date = (date: Date) => {
    return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${date.getFullYear()}`
  }

  const is_recent_expense = (date: string) => {
    const expense_date = new Date(date)
    const seven_days_ago = new Date()
    seven_days_ago.setDate(seven_days_ago.getDate() - 7)

    return expense_date >= seven_days_ago
  }

  const create_expense = async () => {
    const token = await SecureStore.getItemAsync('token')
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
      queryClient.invalidateQueries({queryKey: ['all_expenses']})

      if (is_recent_expense(expense_input.date)) {
        queryClient.invalidateQueries({queryKey: ['recent_expenses']})
      }
      reset_open_modal()
      console.log('created expense')
      set_expense_input({
        amount: '',
        date: '',
        name: '',
      })
      set_date(null)
    },
    onError: (error) => {
      console.log(error.message)
    }
  })

  const edit_expense = async () => {
    const token = await SecureStore.getItemAsync('token')
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/expense/edit_expense/${modal_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json',
        Authorization : `Bearer ${token}`
      },
      body: JSON.stringify(expense_input)
    })

    if (!res.ok) throw new Error('Error in your edit expense API call')

    return await res.json()  
  }

  const edit_expense_mutation = useMutation({
    mutationFn: edit_expense,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['all_expenses']})

      if (is_recent_expense(expense_input.date)) {
        queryClient.invalidateQueries({queryKey: ['recent_expenses']})
      }
      reset_open_modal()
      set_expense_input({
        name: '',
        date: '',
        amount: ''
      })
      set_date(null)
    },
    onError: (error) => {
      console.error(error.message)
    }
  })

  const handle_add_button = () => {
    create_expense_mutation.mutate()
  }

  const handle_update_button = () => {
    edit_expense_mutation.mutate()
  }

  const handle_cancel_button = () => {
    reset_open_modal()
    set_expense_input({
      amount: '',
      date: '',
      name: '',
    })
    set_date(null)
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
        <Text className='text-white text-center font-bold'>{modal_type === 'add' ? 'Add expense' : 'Edit expense'}</Text>
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
              <View className='w-full max-w-[180px]  justify-center'>
                <Text className='text-white text-left'>Date</Text>
                <Pressable 
                  onPress={() => {set_show(true)}}
                  className='bg-whiteish w-full justify-center pl-2 rounded-lg h-11'>
                  <Text className='text-black'>
                    {date ? format_date(date) : 'Selected date'}
                  </Text>
                </Pressable>
                {show && 
                <DateTimePicker
                  value={date ?? new Date()}
                  mode='date'
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selected_date) => {
                    set_show(false)
                    if (selected_date) {
                      const formatted = format_date(selected_date)
                      set_date(selected_date)
                      set_expense_input(prev => ({
                        ...prev,
                        date: formatted
                      }))
                    }
                  }}
                />}
              </View>
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
            {
              modal_type === 'add' ? 
              <ShortButton on_press={handle_add_button} text={'Add'} filled/>
              : 
              <ShortButton on_press={handle_update_button} text={'Update'} filled/>
            }
          </View>
          <View
            style={{height: 16, backgroundColor: '#3a3a3a', width: '100%'}}
          />
         {modal_type !== 'add' && <View className='justify-center items-center'>
            <Pressable>
              <Ionicons size={40} color={'#ec0505ff'} className='bg-secondary p-4 rounded-lg' name='trash-outline' />
            </Pressable>
          </View>}
        </View>
      </View>
    </Modal>
  );
}

export default ExpenseModal;