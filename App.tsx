import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './global.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useAuth } from 'app/hooks/useAuth';
import AppNavigator from 'app/screens/app-navigator/app-navigator';
import AuthNavigator from 'app/screens/auth-navigator/auth-navigator';
import { PaperProvider } from 'react-native-paper'

const Stack = createNativeStackNavigator()
const queryClient = new QueryClient

export default function App() {
  const { is_authenticated } = useAuth()

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar style='light'/>
            {
              is_authenticated ? <AppNavigator/> : <AuthNavigator/>
            }
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}