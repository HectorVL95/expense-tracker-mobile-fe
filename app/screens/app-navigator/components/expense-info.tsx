import { View, Text } from "react-native";

type ExpenseInfo = {
  name: String,
  date: String,
  price: String
}

const ExpenseInfo: React.FC<ExpenseInfo> = ({name, date, price}) => {
  return (
    <View className="flex-row items-center justify-between bg-secondary w-full rounded-xl p-4 max-h-[120px]">
      <View className="gap-4">
        <Text className="text-white font-bold">
          {name}
        </Text>
        <Text className="text-whiteish font-bold">
          {date}
        </Text>
      </View>
      <View className="bg-white p-4 justify-center rounded-lg">
        <Text className="text-purple font-bold text-lg">
          {price}
        </Text>
      </View>
    </View>
  );
}

export default ExpenseInfo;