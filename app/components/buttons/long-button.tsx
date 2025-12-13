import {View, Pressable, Text} from 'react-native'

type LongButtonType = {
  text: text
}

const LongButton: React.FC<LongButtonType> = ({ text }) => {
  return (
    <Pressable className="w-full justify-center items-center py-4 bg-primary rounded-lg" onPress={() => {}}>
      <View>
        <Text className='text-white text-center'>{text}</Text>
      </View>
    </Pressable>
  );
}

export default LongButton;