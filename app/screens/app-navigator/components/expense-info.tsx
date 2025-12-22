import { View, Text, Pressable } from 'react-native';
import useModal from 'app/hooks/useModal';

type ExpenseInfo = {
  id: string
  name: String,
  date: Date,
  price: String
}

const ExpenseInfo: React.FC<ExpenseInfo> = ({ id, name, date, price }) => {
  const { set_open_modal } = useModal()

  return (
    <Pressable onPress={() => set_open_modal(true, 'edit', id)} className="flex-row items-center justify-between bg-secondary w-full rounded-xl p-4 max-h-[120px]">
      <View className="gap-4">
        <Text className="text-white font-bold">
          {name}
        </Text>
        <Text className="text-whiteish font-bold">
          {new Date(date).toLocaleDateString('en-CA')}
        </Text>
      </View>
      <View className="bg-white p-4 justify-center rounded-lg">
        <Text className="text-purple font-bold text-lg">
          ${price}
        </Text>
      </View>
    </Pressable>
  );
}

export default ExpenseInfo;