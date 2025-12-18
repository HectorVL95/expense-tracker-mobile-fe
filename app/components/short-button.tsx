import { Pressable, Text } from 'react-native';

type ShortButtonTypes = {
  text: String
  filled?: boolean,
  on_press: () => void
}

const ShortButton: React.FC<ShortButtonTypes> = ({filled, text, on_press}) => {
  return (
    <Pressable className={`${filled ? 'bg-secondary' : '' } rounded-md py-2 px-12`} onPress={on_press}>
      <Text className={`${filled ? 'text-white' : 'text-purple'} text-lg`}>
        {text}
      </Text>
    </Pressable>
  );
}

export default ShortButton;