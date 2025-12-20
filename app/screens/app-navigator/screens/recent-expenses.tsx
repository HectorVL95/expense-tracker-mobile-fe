import { ScrollView, Text, View } from "react-native";
import ExpenseInfo from "../components/expense-info";
import { useQuery } from "@tanstack/react-query";
import * as SecureStore from 'expo-secure-store'

const RecentExpenses = () => {

  const fetch_expense = async () => {
    const token = await SecureStore.getItemAsync('token')
    if (!token) return;
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/expense/get_expenses`, {
      method: 'GET',
      headers:{ 
        'Content-Type':'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) throw new Error('ERROR ')
    return res.json()
  }

  const { isSuccess, data: expenses_data } = useQuery({
    queryKey: ['expense'],
    queryFn: fetch_expense,
  })

  return (
    <ScrollView className="bg-primary p-8"
      contentContainerStyle={{
        gap:16
      }}
    >
      <View className="flex-row justify-between bg-blueish p-4 rounded-lg">
        <Text className="text-purple font-bold">
          Last 7 Days
        </Text>
        <Text className="text-purple text-xl font-bold">
          $67.50
        </Text>
      </View>
          <View className="gap-4">
      {
        isSuccess &&
        expenses_data.data.map(expense => 
        <ExpenseInfo
          name={expense.name}
          date={expense.date}
          price={expense.amount}
        />
        )
      }
      </View>
  
 
    </ScrollView>
  );
}

export default RecentExpenses;