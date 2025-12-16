import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import SignUp from './screens/signup';

const AuthStack = createNativeStackNavigator()

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#07277cff',  
        },
        headerTintColor: '#fff'
      }}
    >
      <AuthStack.Screen name="Login" component={Login}/>
      <AuthStack.Screen name="Sign Up" component={SignUp}/>
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;

