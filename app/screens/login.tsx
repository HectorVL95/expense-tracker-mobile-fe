import { View } from "react-native";
import UserForm from "app/components/buttons/user-form/user-form"

const Login = () => {

  return (
    <View className='w-full h-full bg-primary pt-24  '>
     <UserForm login/>
    </View>
  );
}

export default Login;