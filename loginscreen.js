import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "@firebase/app"; // Importação do componente do Firebase
import "@firebase/auth"; // Importação dos usuários do Firebase
import "@firebase/firestore"; // Importação do Banco de dados do firebase diferente do Storage que terá as fotos
import apiauth from "../Auth/apiauth"; // Imprtação da API de autenticação
import * as Facebook from "expo-facebook";
import Modal from "react-native-modal";

export default class loginscreen extends Component {
  state = { email: "", password: "", resetpasswordmodal: false, emailreset:"" };

  //Funções:
  async loginFacebook() {
    try {
      await Facebook.initializeAsync({
        appId: "2260278024107209",
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "user_location", "email"],
      });

      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?acess_token=${token}`
        );
        Alert.alert("Login Sucessfull", `Hi, ${(await response.json()).name} `);
      }
    } catch ({ message }) {
      Alert.alert(`Facebook login Erro: ${message}`);
    }
  }

  async loginUser() {
    // Função para fazer login e senha do Usuário veja que a estrutura já foi utilzada
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(function (user) {
          this.props.navigation.navigate("navigator");
          console.log(user);
        })
        .catch((error) => {
          // Aqui se coloca os possiveis erros na hora do login por isso "catch"
          let errorCode = error.code;
          if (errorCode == "auth/invalid-email") {
            // o erroCode é definido previamente pelo FireBase auth/invalid-email"
            Alert.alert("Email Not Found", "Please try again");
          }
          if (errorCode == "auth/invalid-password") {
            // o erroCode é definido previamente pelo FireBase "auth/invalid-password"
            Alert.alert("Password Invalid", "Please try again");
          }
          if (errorCode == "auth/user-not-found") {
            // o erroCode é definido previamente pelo FireBase "auth/user-not-found"
            Alert.alert("User not found", "Please try again");
          }
          if (errorCode == "auth/email-already-exists") {
            // o erroCode é definido previamente pelo FireBase "auth/email-already-exists"
            Alert.alert("User not found", "Please try again");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  checkLogin = () => {
    if (this.state.email === "") {
      // Função que mostra que se o campo de e-mail estiver vazio pede para "Please type your email here"
      Alert.alert("Please type your email here");
    }
    if (this.state.password === "") {
      // Função que mostra que se o campo de senha estiver vazio pede para "Please type your email here"
      Alert.alert("Please type your password here");
    }
    if (this.state.email && this.state.password != "") {
      this.loginUser();
    }
  };

  resetPassword() {
    // Composto JSX "Renderiza no Componente"
    return (
      <Modal
        isVisible={this.state.resetpasswordmodal}
        animationIn="zoomIn"
        animationInTiming={800}
        animationOut="zoomOut"
        animationOutTiming={800}
        onBackButtonPress={() => this.setState({ resetpasswordmodal: false })}
        backdropColor="#f8c9dd"
        backdropOpacity={0.6}
      >
        <View
          style={{
            height: 300,
            width: "100%",
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <View style={{ marginTop: 20, alignSelf:"center", alignItems:"center" }}>
            <Icon name="user-lock" size={30} color="black"/>
            <Text style={{ fontSize: 22, marginTop:20}}>
              Forgot Password ?
            </Text>
            <TextInput
              mode="outlined"
              label="E-mail"
              placeholder="Your e-mail here"
              value={this.state.emailreset}
              onChangeText={(email) => this.setState({ emailreset:email })}
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
              style={{width:340, marginTop:40}}
            />
            <TouchableOpacity onPress={this.onpressResetPassword}>
            <View style={{marginTop:30, width:100, height:30, borderRadius:15, backgroundColor:"black"}}>
            </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  onpressResetPassword = async()=>{
    const {email} = this.state.emailreset
    try{ await firebase.auth().sendPasswordResetEmail(this.state.emailreset)
    Alert.alert("Email sent");
    this.setState({resetpasswordmodal: false})
    } catch(error){
      Alert.alert("Error", `${error}`)
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar animated={true} hidden={false} />
        <View
          style={{ marginTop: 80, marginLeft: 30, flexDirection: "column" }}
        >
          <Text style={style.text1}>Welcome,</Text>
          <Text style={style.text2}>Sign in to continue !</Text>
        </View>
        <View>
          <View style={{ marginTop: 150, marginLeft: 30, marginRight: 30 }}>
            <TextInput
              mode="outlined"
              label="E-mail"
              placeholder="Your e-mail here"
              value={this.state.email}
              onChangeText={(email) => this.setState({ email: email })}
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
            keyboardType="email-address"
            autoCapitalize="none"
            />
          </View>
          <View style={{ marginTop: 20, marginLeft: 30, marginRight: 30 }}>
            <TextInput
              mode="outlined"
              label="Password"
              placeholder="Your password here"
              value={this.state.password}
              onChangeText={(password) => this.setState({ password: password })}
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
              secureTextEntry={true}
            />
          </View>
          <View style={{ marginTop: 10, marginLeft: 280 }}>
            <TouchableOpacity
              onPress={() => this.setState({ resetpasswordmodal: true })}
            >
              <Text
                style={{ fontSize: 12, color: "black", fontWeight: "bold" }}
              >
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ marginTop: 50, marginLeft: 30, flexDirection: "column" }}
        >
          <TouchableOpacity onPress={this.checkLogin}>
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
          <TouchableOpacity onPress={this.loginFacebook}>
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
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 20,
            alignSelf: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 14 }}>I´m a new user, </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("registerscreen")}
          >
            <Text style={{ fontSize: 14, color: "#fa578e", marginLeft: 3 }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        {this.resetPassword()}
      </View> //No caso ao criar uma função JSX como a do resetPassword deve-se declara-lá antes da última view com o ex acima:
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
