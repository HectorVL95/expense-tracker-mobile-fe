import { View, StyleSheet } from "react-native";
import UserForm from "app/components/buttons/user-form/user-form"

const Login = () => {

  return (
    <View  className="flex-1 items-center bg-primary pt-40">
      <UserForm login/>
    </View>
  );
}

export default Login;

