import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import RecentExpenses from './screens/recent-expenses';
import AllExpenses from './screens/add-expense';
import { BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

const AppStack = createBottomTabNavigator()

const AppNavigator = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#07277cff'
        },
        headerStyle: {
          backgroundColor: '#07277cff'
        },
        headerTintColor: '#fff',
      }}
    >
      <AppStack.Screen 
        name='Recent Expenses' 
        component={RecentExpenses}
        options={{
          tabBarIcon: ({focused, color, size}) => <Ionicons name={focused ? 'time' : 'time-outline'} size={size} color={color}/>,
          headerRight: () => <Ionicons name={'add-outline'} size={40} color={'#fff'}/>
        }}
      />
      <AppStack.Screen 
        name='All Expenses' 
        component={AllExpenses}
        options={{
          tabBarIcon: ({focused, color, size}) => <Ionicons name={focused ? 'list': 'list-outline'} size={size} color={color} />
        }}
      />
    </AppStack.Navigator>
  );
}

export default AppNavigator;