import { Text, ScrollView, View } from "react-native";
import ExpenseInfo from "../components/expense-info";
import * as SecureStore from 'expo-secure-store'
import { useQuery } from "@tanstack/react-query";

const AllExpenses = () => {

  const fetch_expense = async () => {
    const token = await SecureStore.getItemAsync('token')
    if (!token) return;
    const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/expense/get_expenses`, {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) throw new Error('error in the fetch expense API call')
    return res.json()
  }

  const { isSuccess, data: expense_data } = useQuery({
    queryKey: ['expenses'],
    queryFn: fetch_expense,
  });

  return (
    <ScrollView className="bg-primary p-8"
      contentContainerStyle={{
        gap:16
      }}
    >
      <View className="flex-row justify-between bg-blueish p-4 rounded-lg">
        <Text className="text-purple font-bold">
          All expenses
        </Text>
        <Text className="text-purple text-xl font-bold">
          $67.50
        </Text>
      </View>
      <View className="gap-4">
        {
          isSuccess &&
          expense_data.data.map(expense =>         
          <ExpenseInfo
            key={expense._id}
            name={expense.name}
            date={expense.date}
            price={expense.amount}
          />)
        }
      </View>
    </ScrollView>
  );
}

export default AllExpenses;