import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'
import UserForm from "app/components/buttons/user-form/user-form";

const SignUp = () => {
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='items-center justify-center bg-primary '
 
    >
      <UserForm signup />
    </KeyboardAvoidingView>
  );
}

export default SignUp;