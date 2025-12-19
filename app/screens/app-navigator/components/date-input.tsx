import { useState, Dispatch } from 'react';
import { Pressable, View, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'

type DateInputType = {
  date_input: String
  set_date_input: React.Dispatch<React.SetStateAction<{
    amount: string,
    date: string,
    name: string
  }>>
}

const DateInput: React.FC<DateInputType> = ({date_input, set_date_input}) => {
  const [show, set_show] = useState(false)
  const [date, set_date] = useState<Date | null>(null)

  const format_date = (date: Date) => {
    return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${date.getFullYear()}`
  }

  return (
    <View className='w-full max-w-[180px]  justify-center'>
      <Text className='text-white text-left'>Date</Text>
      <Pressable 
        onPress={() => {set_show(true)}}
        className='bg-whiteish w-full justify-center pl-2 rounded-lg h-11'>
        <Text className='text-black'>
          {date ? format_date(date) : 'Selected date'}
        </Text>
      </Pressable>
      {show && 
      <DateTimePicker
        value={date ?? new Date()}
        mode='date'
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        onChange={(event, selected_date) => {
          set_show(false)
          if (selected_date) {
            const formatted = format_date(selected_date)
            set_date(selected_date)
            set_date_input(prev => ({
              ...prev,
              date: formatted
            }))
          }
        }}
      />}
    </View>
  );
}

export default DateInput;