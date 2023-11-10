import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Screen1() {
  const navigation = useNavigation();
  const route = useRoute();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Kiểm tra xem route.params có tồn tại và có giá trị không
    if (route.params && route.params.username && route.params.password) {
      // Nếu có dữ liệu từ route.params, cập nhật state
      setUsername(route.params.username);
      setPassword(route.params.password);
    }
  }, [route.params]); // Sử dụng route.params là dependency của useEffect

  const handleUserNameChange = (text) => {
    setUsername(text);
  };

  const handlePassWordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    if (!username || !password) {
      alert("Vui lòng nhập tên người dùng và mật khẩu");
      return;
    }
    // Gửi yêu cầu GET đến API để lấy danh sách người dùng
    fetch("https://653f4a739e8bd3be29e02cd7.mockapi.io/account")
      .then((response) => response.json())
      .then((data) => {
        // Kiểm tra xem có người dùng nào khớp với thông tin đăng nhập không
        const userFound = data.find(
          (user) => user.username === username && user.password === password
        );

        if (userFound) {
          alert("Đăng nhập thành công!");
          navigation.navigate("Screen3");
        } else {
          alert("Tên người dùng hoặc mật khẩu không đúng");
        }
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu lấy danh sách người dùng:", error);
        alert("Đã xảy ra lỗi khi kiểm tra đăng nhập");
      });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FBCB00", "#BF9A00"]}
        locations={[0, 0.85, 1]}
        style={{ flex: 1 }}
      >
        <View style={styles.view1}>
          <Text style={styles.textView1}>LOGIN</Text>
        </View>

        <View style={styles.view2}>
          <View style={styles.view2Input}>
            <View style={styles.viewInput1}>
              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_640.png",
                }}
                style={{ marginLeft: 5, width: 30, height: 40 }}
              ></Image>
              <TextInput
                style={styles.input1}
                placeholder="Name"
                value={username}
                onChangeText={handleUserNameChange}
              />
            </View>

            <View style={styles.viewInput2}>
              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2023/06/05/09/12/security-8041759_640.png",
                }}
                style={{ marginLeft: 5, width: 30, height: 43 }}
              ></Image>
              <TextInput
                style={styles.input2}
                placeholder="Password"
                value={password}
                secureTextEntry={true}
                onChangeText={handlePassWordChange}
              />

              <TouchableOpacity>
                <FontAwesome name="eye" size={50} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.view3}>
          <TouchableOpacity style={styles.touch} onPress={handleLogin}>
            <View style={styles.viewTouch}>
              <Text style={styles.textTouch}>LOGIN</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Screen2")}>
          <View style={styles.view4}>
            <Text style={{ fontWeight: "bold", fontSize: 30, color: "black" }}>
              CREATE ACCOUNT
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0FFFF",
  },
  view1: {
    flex: 2,
    justifyContent: "flex-end",
    marginLeft: 40,
  },
  view2: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "space-around",
    marginTop: 50,
  },
  view3: {
    flex: 4,
    flexDirection: "column",
    alignItems: "center",
  },
  view4: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "flex-start",
    marginBottom: 60,
  },
  textView1: {
    fontWeight: "bold",
    fontSize: 40,
  },
  view2Input: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input1: {
    width: 320,
    height: 50,
    marginLeft: 10,
  },
  viewInput1: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5DB53",
    width: 320,
    height: 50,
    borderWidth: 1,
    borderColor: "white",
  },
  input2: {
    marginLeft: 10,
    width: 270,
    height: 50,
  },
  viewInput2: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5DB53",
    width: 320,
    height: 50,
    borderWidth: 1,
    borderColor: "white",
  },
  touch: {
    marginTop: 80,
    width: 320,
    height: 45,
    backgroundColor: "black",
    borderRadius: 5,
  },
  viewTouch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textTouch: {
    fontWeight: "bold",
    color: "white",
  },
});
