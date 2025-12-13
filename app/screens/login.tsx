import { View } from "react-native";
import UserForm from "app/components/buttons/user-form/user-form"

const Login = () => {

  return (
    <View className='flex-1 justify-center items-center bg-primary '>
      <View className="w-full translate-y-6">

        <UserForm login/>
      </View>
    </View>
  );
}

export default Login;