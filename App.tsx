import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './global.css';
import Login from 'app/screens/login';
import SignUp from 'app/screens/signup';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <View className='flex-1 bg-primary'>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#07277cff'
          },
          headerTintColor: '#fff'
        }}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Sign Up' component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
