import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { useState } from "react";
import { format } from 'date-fns';


export default function Screen3() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <View style={styles.container}>
      <Text>NOTE</Text>
      <Text>Ngày login:</Text>
      <Text>{format(selectedDate, 'dd/MM/yyyy')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0FFFF",
  },
});
