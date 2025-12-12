import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './global.css';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
