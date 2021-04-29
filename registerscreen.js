import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "@firebase/app"; // Importação do componente do Firebase
import "@firebase/auth"; // Importação dos usuários do Firebase
import "@firebase/firestore"; // Importação do Banco de dados do firebase diferente do Storage que terá as fotos
import apiauth from "../Auth/apiauth"; // Importação do apiauth
import RNPickerSelect from "react-native-picker-select"; //Picker para escolha do pais
import RNPhoneCodeSelect from "react-native-phone-code-select";

export default class registerscreen extends Component {
  constructor(props) {
    // Existe a  possibiliade de usar o "bind" e outras funções
    super(props); // Necessidade do React Native versões mais antigas
    this.state = {
      user: {
        // As chaves são para acessar o Firebase em conjunto
        email: "", // Campos que usuário vai digitar
        password: "", // Campos que usuário vai digitar
        fullname: "", // Campos que usuário vai digitar
        country:""
      }, // Mandando para o Firebase um objeto tipo json
      countryModal: false,
      SelectedCountry: null,
      countryFlag: "Select Country",
      countryName: "",
    };
  }

  signup = () => {
    apiauth.shared.createuser(this.state.user);
  };

  checksignup = () => {
    if (this.state.user.fullname === "") {
      Alert.alert("Type your Fullname", "Please type your Fullname");
    }
    if (this.state.user.email === "") {
      Alert.alert("Type your Email", "Please type your Email");
    }
    if (this.state.user.password === "") {
      Alert.alert("Type your password", "Please type your password");
    }
    if (this.state.user.country === "") {
      Alert.alert("Choose your Contry", "Please Choose your Country");
    }

    if (
      this.state.user.fullname &&
      this.state.user.email &&
      this.state.user.password &&
      this.state.user.country != ""
    ) {
      this.signup();
      this.setState({user:{...this.state.user.countryFlag,}})
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar animated={true} hidden={false} />
        <ScrollView>
          <KeyboardAvoidingView
          behavior="padding">
        <View
          style={{ marginTop: 80, marginLeft: 30, flexDirection: "column" }}
        >
          <Text style={style.text1}>Create Account,</Text>
          <Text style={style.text2}>Sign in to get started !</Text>
        </View>
        <View>
          <View style={{ marginTop: 100, marginLeft: 30, marginRight: 30 }}>
            <TextInput
              mode="outlined"
              label="Full Name"
              placeholder="Your full name here"
              value={this.state.user.fullname} // Poderia passar sem o value tb mas ajuda na prevenção de erro
              onChangeText={(fullname) =>
                this.setState({ user: { ...this.state.user, fullname } })
              }
              theme={{
                roundness: 12,
                colors: {
                  placeholder: "gray",
                  text: "black",
                  primary: "#fa578e",
                  underlineColor: "#fa578e",
                  background: "white",
                },
              }}
            />
          </View>
          <View style={{ marginTop: 20, marginLeft: 30, marginRight: 30 }}>
            <TextInput
              mode="outlined"
              label="E-mail"
              placeholder="Your e-mail here"
              value={this.state.user.email} // Poderia passar sem o value tb mas ajuda na prevenão de erro
              autoCapitalize="none"
              onChangeText={(email) =>
                this.setState({ user: { ...this.state.user, email } })
              }
              theme={{
                roundness: 12,
                colors: {
                  placeholder: "gray",
                  text: "black",
                  primary: "#fa578e",
                  underlineColor: "#fa578e",
                  background: "white",
                },
              }}
            />
          </View>
          <View style={{ marginTop: 20, marginLeft: 30, marginRight: 30 }}>
            <TextInput
              mode="outlined"
              label="Password"
              placeholder="Your password here"
              value={this.state.user.password} // Poderia passar sem o value tb mas ajuda na prevenão de erro
              onChangeText={(password) =>
                this.setState({ user: { ...this.state.user, password } })
              }
              theme={{
                roundness: 12,
                colors: {
                  placeholder: "gray",
                  text: "black",
                  primary: "#fa578e",
                  underlineColor: "#fa578e",
                  background: "white",
                },
              }}
              secureTextEntry={true} // props para não mostrar a senha do usuário
            />
          </View>
          <View style={{ marginTop: 20, marginLeft: 30, marginRight: 30 }}>
            <View>
              <RNPhoneCodeSelect
                visible={this.state.countryModal}
                onDismiss={() => this.setState({ countryModal: false })}
                onCountryPress={(country) => {
                  this.setState({ countryFlag: country.flag });
                  this.setState({ countryName: country.name });
                  this.setState({user:{...this.state.user, country}})
                }}
                primaryColor="#f04a4a"
                secondaryColor="#000000"
                buttonText="Ok"
              />
              <TouchableOpacity
                onPress={() => this.setState({ countryModal: true })}
              >
                <View
                  style={{
                    flexDirection: "column",
                    width: 350,
                    height: 57,
                    borderRadius: 12,
                    borderColor: "gray",
                    borderWidth:1
                  }}
                >
                  <Text style={{ fontSize: 15, marginTop:15, marginLeft:10, color:"gray" }}>
                    {this.state.countryFlag} {this.state.countryName}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{ marginTop: 50, marginLeft: 30, flexDirection: "column" }}
        >
          <TouchableOpacity onPress={this.checksignup}>
            <View style={{ height: 50, width: 350 }}>
              <LinearGradient
                style={{
                  height: 60,
                  width: 350,
                  alignItens: "center",
                  justifyContent: "center",
                  borderRadius: 12,
                }}
                colors={["#fdaa8e", "#fa578e"]}
                start={{ x: 1, y: 0.5 }}
              >
                <Text
                  style={{ color: "white", textAlign: "center", fontSize: 16 }}
                >
                  Login
                </Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>

          <View
            style={{
              height: 60,
              width: 350,
              borderRadius: 12,
              backgroundColor: "#ebeef4",
              marginTop: 25,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="facebook" size={25} color="#3b5997" />
            <Text style={{ marginLeft: 10, color: "#3b5997" }}>
              Connect with Facebook
            </Text>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 20,
            alignSelf: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 14 }}>I´m already a member, </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("loginscreen")}
          >
            <Text style={{ fontSize: 14, color: "#fa578e", marginLeft: 3 }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  text1: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },

  text2: {
    color: "gray",
    fontSize: 24,
    fontWeight: "500",
  },
});
