import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5";

export default class loadingscreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/imagebackground.png")}
          style={style.ImageBackground}
        >
          <View
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              opacity: 0.5,
            }}
          >
            <LinearGradient
              style={{ height: "100%", width: "100%" }}
              colors={["#5D93FF", "#2AFFCD"]}
            ></LinearGradient>
          </View>

          <View
            style={{
              alignSelf: "center",
              alignItems: "center",
              flexDirection: "column",
              margintop: 250,
            }}
          >
            <Image style={style.logo} source={require("../assets/logo.png")} />
            <Text style={style.text}> Building of the day </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("loginscreen")}
            >
              <View style={style.button1}>
                <Text style={style.text2}> Login </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("registerscreen")}
            >
              <View style={style.button2}>
                <Text style={style.text2}> Create Account </Text>
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 40, flexDirection: "row" }}>
              <TouchableOpacity
              >
                <Icon name="facebook" size={40} color="white" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="google"
                  size={40}
                  color="white"
                  style={{ marginLeft: 20 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const { height, width } = Dimensions.get("screen"); // Essa função possibilita que a imagem se ajuste a tela toda
const style = StyleSheet.create({
  ImageBackground: {
    height: height,
    width: width,
  },

  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },

  text2: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  logo: {
    resizeMode: "cover",
    width: 120,
    height: 143,
    alignSelf: "center",
    marginTop: 200,
  },

  button1: {
    height: 60,
    width: 350,
    borderWidth: 1,
    borderColor: "white",
    marginTop: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },

  button2: {
    height: 60,
    width: 350,
    borderWidth: 1,
    borderColor: "white",
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
});
