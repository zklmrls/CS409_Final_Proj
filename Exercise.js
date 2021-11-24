import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-datepicker";

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      duration: "",
      calories: "",
      date: "",
    };
  }
  static navigationOptions = {
    title: "Add Exercise",
  };

  addActivity = () => {
    let name = this.state.name;
    let duration = this.state.duration;
    let calories = this.state.calories;

    let token = this.props.navigation.state.params.token;
    fetch("https://avigael-shop-fitness.herokuapp.com/activities", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "x-access-token": token,
        Connection: "keep-alive",
        "cache-control": "no-cache",
      },

      body: JSON.stringify({
        name: name,
        calories: calories,
        duration: duration,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.message === "Activity created!") {
          alert(result.message);
          this.props.navigation.navigate("Today", {
            username: this.props.navigation.state.params.username,
            token: this.props.navigation.state.params.token,
          });
        } else {
          alert(result.message);
        }
      });
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
        margin: 20
      },
      btn_text: {
        color: "#25191B",
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        fontStyle: "italic"
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.input_box}>
          <Text style={styles.input_title}>Exercise Name</Text>
          <TextInput
            placeholder={"Exercise Name"}
            style={styles.input_placeholder}
            value={this.state.name + ""}
            onChangeText={(input) => {
              this.setState({ name: input });
            }}
          />
        </View>
        <View style={styles.input_box}>
          <Text style={styles.input_title}>Duration</Text>
          <TextInput
            placeholder={"0"}
            style={styles.input_placeholder}
            value={this.state.duration + ""}
            onChangeText={(input) => {
              this.setState({ duration: input });
            }}
          />
        </View>
        <View style={styles.input_box}>
          <Text style={styles.input_title}>Calories</Text>
          <TextInput
            style={styles.input_placeholder}
            value={this.state.calories + ""}
            placeholder={"0"}
            onChangeText={(input) => {
              this.setState({ calories: input });
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.addActivity()}
          style={styles.btn_shape}
        >
          <Text style={styles.btn_text}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Login")}
          style={[styles.btn_shape, { backgroundColor: "red" }]}
        >
          <Text style={styles.btn_text}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Exercise;
