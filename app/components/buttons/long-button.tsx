import {View, Pressable, Text} from 'react-native'

type LongButtonType = {
  text: text,
  on_press: () => void
}

const LongButton: React.FC<LongButtonType> = ({ text, on_press }) => {
  return (
    <Pressable  className="w-full justify-center items-center py-4 bg-primary rounded-lg active:bg-tertiary" onPress={on_press}>
      <View>
        <Text className='text-white text-center'>{text}</Text>
      </View>
    </Pressable>
  );
}

export default LongButton;