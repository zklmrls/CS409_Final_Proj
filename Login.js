import * as React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import base64 from "base-64";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
    };
  }

  static navigationOptions = {
    title: "Log In",
  };

  logIn = () => {
    this.setState({ loading: true });
    fetch("https://avigael-shop-fitness.herokuapp.com/login", {
      method: "GET",
      headers: {
        "cache-control": "no-cache",
        Connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate",
        "Cache-Control": "no-cache",
        Accept: "*/*",
        Authorization: `Basic ${base64.encode(
          `${this.state.username}:${this.state.password}`
        )}`,
      },
    })
      .then((response) => {
        this.setState({ loading: false });
        return response.json();
      })
      .then((response) => {
        if (response.token) {
          this.props.navigation.navigate("Today", {
            username: this.state.username,
            token: response.token,
          });
        } else alert("Username or Password is Incorrect!");
      });
  };

  signUp = () => {
    this.props.navigation.navigate("Signup");
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#234E6F"
      },
      TitleText: {
        color: "#FFC74D",
        fontSize: 110,
        margin: 40,
        fontWeight: "bold",
        fontFamily: "sans-serif",
        textAlign: "center",
      },
      input_box: {
        width: "75%",
        height: 40,
        marginBottom: 25,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
      },
      
      input_title: {
        color: "#fff",
        marginTop: -20,
      },
      input_placeholder: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        color: "#121212",
        backgroundColor: "rgba(230,230,230,1)",
      },
      btn_box: {
        flexDirection: "row",
        width: "75%",
        justifyContent: "center",
      },
      btn_shape: {
        backgroundColor: "#FFC74D",
        borderRadius: 10,
        width: "40%",
        height: 40,
        marginHorizontal: 5,
        justifyContent: "center",
      },
      btn_text: {
        color: "#25191B",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        fontStyle: "italic"
      },
      loading: {
        padding: 25,
      },
    });

    return (
      <View style={styles.container}>
        <Text style={styles.TitleText}>Flexed</Text>
        <View style={styles.input_box}>
          <Text style={styles.input_title}>Username</Text>
          <TextInput
            style={styles.input_placeholder}
            autoCapitalize="none"
            placeholder="Username"
            onChangeText={(input) => {
              this.setState({ username: input });
            }}
          />
        </View>
        <View style={styles.input_box}>
          <Text style={styles.input_title}>Password</Text>
          <TextInput
            secureTextEntry={true}
            autoCorrect={false}
            style={styles.input_placeholder}
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(input) => {
              this.setState({ password: input });
            }}
          />
        </View>
        <View style={styles.btn_box}>
          <TouchableOpacity
            onPress={() => this.logIn()}
            style={styles.btn_shape}
          >
            <Text style={styles.btn_text}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.signUp()}
            style={[
              styles.btn_shape,
              { backgroundColor: "#92BDDD" },
            ]}
          >
            <Text style={styles.btn_text}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <ActivityIndicator
          animating={this.state.loading}
          style={styles.loading}
          size="large"
        />
      </View>
    );
  }
}

export default Login;
