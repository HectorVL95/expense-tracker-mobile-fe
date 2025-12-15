import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import RecentExpense from './screens/recent-expenses';
import AllExpenses from './screens/add-expense';

const Tabs = createBottomTabNavigator()

const Expenses = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name='Recent Expenses' component={RecentExpense} />
      <Tabs.Screen name='All Expenses' component={AllExpenses} />
    </Tabs.Navigator>
  );
}

export default Expenses;