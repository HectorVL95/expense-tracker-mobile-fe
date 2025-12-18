import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'
import AllExpenses from './screens/all-expenses';
import RecentExpenses from './screens/recent-expenses';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import useModal from 'app/hooks/useModal';
import AddExpenseModal from './modals/add-expense-modal';

const AppStack = createBottomTabNavigator()

const AppNavigator = () => {
  const { open_modal, set_open_modal } = useModal()
  console.log(open_modal)

  return (
    <>
      <AddExpenseModal/>
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
            headerRight: () => <Ionicons onPress={() => set_open_modal(true)} name={'add-outline'} size={40} color={'#fff'}/>
          }}
        />
        <AppStack.Screen 
          name='All Expenses' 
          component={AllExpenses}
          options={{
            tabBarIcon: ({focused, color, size}) => <Ionicons name={focused ? 'list': 'list-outline'} size={size} color={color} />,
            headerRight: () => <Ionicons onPress={() => set_open_modal(true)} name={'add-outline'} size={40} color={'#fff'}/>
            
          }}
        />
      </AppStack.Navigator>
    </>
  );
}

export default AppNavigator;