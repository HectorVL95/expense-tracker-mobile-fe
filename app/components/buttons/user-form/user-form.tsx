import { View, Text, TextInput, Pressable } from 'react-native'
import LongButton from 'app/components/buttons/long-button';
import { useNavigation } from '@react-navigation/native';
import SignUp from 'app/screens/signup';
import { useState } from 'react';

type userFormTypes = {
  login?: boolean,
  signup?: boolean
}


const UserForm: React.FC<userFormTypes> = ({login, signup}) => {
  const [input_values, set_input_values] = useState({
    email: '',
    password: '',
    confirm_password: ''
  })

    const navigate = useNavigation()

    const go_to_sign_up = ({  }) => {
    console.log('Sign up screen')
    navigate.navigate('Sign Up')
  }

  console.log(input_values)

  return (
     <View className='bg-secondary justify-center gap-8 items-center max-w-[320px] rounded-lg p-8'>
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
            value={input_values.password}
            onChangeText={(text) => set_input_values(prev => ({...prev, password: text}))}
            className='w-full h-12 bg-tertiary rounded-lg'
          />
        </View>
        {
          signup &&
        <View className='w-full gap-2'>
          <Text className='text-white'>Confirm Password</Text>
          <TextInput
            value={input_values.confirm_password}
            onChangeText={(text) => set_input_values(prev => ({...prev, confirm_password: text}))}
            className='w-full h-12 bg-tertiary rounded-lg'
          />
        </View>
        }
        <LongButton text={(login && 'Log In') || (signup && 'Sign Up') }/>
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