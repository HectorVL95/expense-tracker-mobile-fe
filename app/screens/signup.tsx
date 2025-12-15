import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import UserForm from "app/components/buttons/user-form/user-form";

const SignUp = () => {
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className='flex-1 bg-primary '
    >
      <ScrollView 
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{alignItems: 'center', flex: 1, justifyContent: 'center'}}
      >
        <UserForm signup />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignUp;