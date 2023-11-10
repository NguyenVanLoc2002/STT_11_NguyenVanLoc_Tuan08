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
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Screen2() {
  const navigation = useNavigation();
  const route = useRoute();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [tb, setTB] = useState("");

  const handleRegister = async () => {
    
    if (!username || !password || password != repassword) {
      setTB("Mật khẩu không khớp");
      alert("Vui lòng nhập đẩy đủ thông tin")
      return;
    }

    try {
      // Gửi yêu cầu POST đến API để thêm tài khoản mới
      const response = fetch(
        "https://653f4a739e8bd3be29e02cd7.mockapi.io/account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );
      if ((await response).ok) {
        // Đăng ký thành công
        alert("Đăng ký thành công!");
        // Chuyển hướng đến màn hình khác hoặc thực hiện các hành động khác
        navigation.navigate("Screen1",{username, password});
      } else {
        alert("Đăng ký không thành công. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu đăng ký: ", error);
      alert("Đã xảy ra lỗi khi đăng ký");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome name="arrow-left" size={20} style={{ marginTop: 20 }} />
        </TouchableOpacity>
        <Text style={{ fontSize: 30, fontWeight: "bold ", marginTop: 20 }}>
          Đăng kí tài khoản
        </Text>
      </View>
      <View style={styles.content}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Tài khoản:
          </Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Tài khoản"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Mật khẩu:
          </Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Mật khẩu"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Nhập lại mật khẩu:
          </Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Xác nhận mật khẩu"
            secureTextEntry={true}
            value={repassword}
            onChangeText={setRePassword}
          />
        </View>
        <Text style={{ color: "red" }}>{tb}</Text>
      </View>
      <View style={styles.footer}>
        <Button title="Đăng kí" onPress={handleRegister} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0FFFF",
  },
  txtInput: {
    width: 280,
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    marginTop: 20,
  },
  header: {
    flex: 1,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  content: {
    flex: 5,

    alignItems: "center",
  },
  footer: {
    flex: 2,
    margin: 10,
  },
});
