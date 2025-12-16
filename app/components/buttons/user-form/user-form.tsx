import { View, Text, TextInput, Pressable } from 'react-native'
import LongButton from 'app/components/buttons/long-button';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query'
import * as SecureStore from 'expo-secure-store'
import { useAuth } from 'app/hooks/useAuth';

type userFormTypes = {
  login?: boolean,
  signup?: boolean
}

const UserForm: React.FC<userFormTypes> = ({ login, signup} ) => {
  const [input_values, set_input_values] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  })
  const { log_user_in } =  useAuth()
  
  const navigation = useNavigation()

  const go_to_sign_up = () => {
    navigation.navigate('Sign Up')
  }

  const handle_form = async () => {
    const body = login ? {
      email: input_values.email,
      password: input_values.password
    } : input_values

    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/user/${login ? 'login_user' : 'create_user' }`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const response_data = await res.json()
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message ||'Error in the handle button press')
    } 
    return response_data
  }

  const form_mutation = useMutation({
    mutationFn: handle_form,
    onSuccess: async (data) => {
     const token = await SecureStore.setItemAsync('auth_token', data.token)
      console.log('token saved')
      set_input_values({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
      })
      console.log(token)
      log_user_in()
    },
    onError: (error: any) => {
      console.log('Mutation error', error.message)
    }
  })

  const handle_press_btn = () => {
    form_mutation.mutate()
  }

  return (
     <View className='bg-secondary justify-center gap-8 items-center w-full max-w-[320px] rounded-lg p-8'>
        {
          signup &&
          <>
            <View className='w-full gap-2'>
              <Text className='text-white'>Nombre</Text>
              <TextInput
                value={input_values.first_name}
                onChangeText={(text) => set_input_values(prev => ({...prev, first_name: text}))}
                className='w-full h-12 bg-tertiary rounded-lg text-white'
              />
            </View>
            <View className='w-full gap-2'>
              <Text className='text-white'>Apellido</Text>
              <TextInput
                value={input_values.last_name}
                onChangeText={(text) => set_input_values(prev => ({...prev, last_name: text}))}
                className='w-full h-12 bg-tertiary rounded-lg text-white'
              />
            </View>
          </>
        }
        <View className='w-full gap-2'>
          <Text className='text-white'>Email Address</Text>
          <TextInput
            value={input_values.email}
            onChangeText={(text) => set_input_values(prev => ({...prev, email: text}))}
            className='w-full h-12 bg-tertiary rounded-lg text-white'
          />
        </View>
        <View className='w-full gap-2'>
          <Text className='text-white'>Password</Text>
          <TextInput 
            secureTextEntry
            value={input_values.password}
            onChangeText={(text) => set_input_values(prev => ({...prev, password: text}))}
            className='w-full h-12 bg-tertiary rounded-lg text-white'
            autoCapitalize='none'
          />
        </View>
        {
          signup &&
        <View className='w-full gap-2'>
          <Text className='text-white'>Confirm Password</Text>
          <TextInput
            secureTextEntry
            value={input_values.confirm_password}
            onChangeText={(text) => set_input_values(prev => ({...prev, confirm_password: text}))}
            className='w-full h-12 bg-tertiary rounded-lg text-white'
            autoCapitalize='none'
          />
        </View>
        }
        <LongButton on_press={handle_press_btn} text={(login && 'Log In') || (signup && 'Sign Up') }/>
        {
          login &&
          <Text className='text-white' onPress={go_to_sign_up}>
            Create new user
          </Text>
        }
      </View>
  );
}

export default UserForm;