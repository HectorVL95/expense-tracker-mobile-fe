import { Text, ScrollView, View } from "react-native";
import ExpenseInfo from "../components/expense-info";

const AllExpenses = () => {

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
        <ExpenseInfo
          name={'A book'}
          date={'09-20-2024'}
          price={'40.99'}
        />
        <ExpenseInfo
          name={'A book'}
          date={'09-20-2024'}
          price={'40.99'}
        />
      </View>
    </ScrollView>
  );
}

export default AllExpenses;