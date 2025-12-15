import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './global.css';
import Login from 'app/screens/login';
import SignUp from 'app/screens/signup';
import Expenses from 'app/screens/expenses-screens/expenses';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const Stack = createNativeStackNavigator()
const queryClient = new QueryClient

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#07277cff'
          },
          headerTintColor: '#fff'
        }}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Sign Up' component={SignUp} />
          <Stack.Screen name='Expenses' component={Expenses} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}