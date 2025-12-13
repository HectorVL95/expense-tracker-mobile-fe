import { View } from 'react-native'
import UserForm from "app/components/buttons/user-form/user-form";

const SignUp = () => {
  
  return (
    <View className='flex-1 pt-24 bg-primary'>
      <UserForm signup />
    </View>
  );
}

export default SignUp;