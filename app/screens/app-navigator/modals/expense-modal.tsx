import useModal from 'app/hooks/useModal';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getItemAsync } from 'expo-secure-store';
import { useQuery } from '@tanstack/react-query';
import ShortButton from 'app/components/short-button';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal, View, Text, TextInput, Pressable, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'


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
  const [image, set_image] = useState<File | null | string>(null)

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
    set_image(expense_data.data.photo)
  }, [expense_data])

  const format_date = (date: Date) => {
    return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${date.getFullYear()}`
  }

  const handle_pick_image = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8
    })

     if (!result.canceled) {
      set_image(result.assets[0].uri)
     }
  }

  console.log(expense_input.amount)
  console.log(typeof expense_input.amount)

  const create_expense = async () => {
    const token = await SecureStore.getItemAsync('token')
    const form_data = new FormData()
    form_data.append('name', expense_input.name)
    form_data.append('amount', expense_input.amount)
    form_data.append('date', expense_input.date)

    if (image) {
      form_data.append('photo', {
        uri: image,
        name: 'expense,jpg',
        type: 'image/jpeg'
      } as any)
    }
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/expense/create_expense`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form_data
    })

    if (!res.ok) throw new Error('Error seing the response')
    return await res.json()
  }

  const create_expense_mutation = useMutation({
    mutationFn: create_expense,
    onSuccess:() => {
      queryClient.invalidateQueries({queryKey: ['all_expenses']})
      queryClient.invalidateQueries({queryKey: ['recent_expenses']})
      
      reset_open_modal()
      console.log('created expense')
      set_expense_input({
        amount: '',
        date: '',
        name: '',
      })
      set_date(null)
      set_image(null)
    },
    onError: (error) => {
      console.log(error.message)
    }
  })

  const edit_expense = async () => {
    const token = await SecureStore.getItemAsync('token')
    const form_data = new FormData()

    form_data.append('name', expense_input.name)
    form_data.append('amount', expense_input.amount)
    form_data.append('date', expense_input.date)

    if (image) {
      form_data.append('photo', {
        uri: image,
        name: 'expense.jpg',
        type: 'image/jpeg'
      } as any) 
    }

    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/expense/edit_expense/${modal_id}`, {
      method: 'PATCH',
      headers: {
        Authorization : `Bearer ${token}`
      },
      body: form_data
    })

    if (!res.ok) throw new Error('Error in your edit expense API call')

    return await res.json()  
  }

  const edit_expense_mutation = useMutation({
    mutationFn: edit_expense,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['all_expenses']})
      queryClient.invalidateQueries({queryKey: ['recent_expenses']})
      reset_open_modal()
      set_expense_input({
        name: '',
        date: '',
        amount: ''
      })
      set_date(null)
      set_image(null)
    },
    onError: (error) => {
      console.error(error.message)
    }
  })

  const delete_expense = async () => {
    const token = await SecureStore.getItemAsync('token')
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/expense/delete_expense/${modal_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    if (!res.ok) throw new Error('Error in your delete expednse API call')
    return await res.json()
  }

  const delete_expense_mutation = useMutation({
    mutationFn: delete_expense,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['all_expenses']})
      queryClient.invalidateQueries({queryKey:['recent_expenses']})
      set_expense_input({
        name: '',
        date: '',
        amount: ''
      })
      set_date(null)
      reset_open_modal()
      console.log('Expense deleted')
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const handle_add_button = () => {
    create_expense_mutation.mutate()
  }

  const handle_update_button = () => {
    edit_expense_mutation.mutate()
  }

  const handle_delete_button = () => {
    delete_expense_mutation.mutate()
  }

  const handle_cancel_button = () => {
    reset_open_modal()
    set_expense_input({
      amount: '',
      date: '',
      name: '',
    })
    set_image(null)
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
        <View className='flex-col max-w-[360px] w-full justify-center items-center  gap-2'>
          <View className='flex-col w-full justify-center items-center gap-2 '>
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
                {
                  show && 
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
                  />
                }
              </View>
            </View>
            <View className='w-full items-center'>
              <Text className='text-white text-left font-bold'>Name</Text>
              <TextInput 
                multiline
                numberOfLines={4}
                className=' font-bold bg-whiteish w-full rounded-lg h-[120px] pl-2'
                textAlignVertical='top'
                value={expense_input.name}
                onChangeText={(text) => set_expense_input(prev => ({...prev, name: text}))}
              />
            </View>
          </View>
          <Pressable className='justify-center items-center bg-whiteish w-full justify-center items-center rounded-lg' onPress={handle_pick_image}>
            <Ionicons color={'#fff'}  name='camera-outline' size={40}/>
          </Pressable>
          {
            image && 
            <Image source={{uri: image}} className='w-full h-[200px]'/>
          }
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
            style={{height: 1, backgroundColor: '#3a3a3a', width: '100%'}}
          />
         {
            modal_type !== 'add' && <View className='justify-center items-center'>
            <Pressable onPress={handle_delete_button}>
              <Ionicons size={40} color={'#ec0505ff'} className='bg-secondary p-4 rounded-lg' name='trash-outline' />
            </Pressable>
            </View>
          }
        </View>
      </View>
    </Modal>
  );
}

export default ExpenseModal;