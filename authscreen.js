import React, { Component } from "react";
import { Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import firebase from "@firebase/app"; // Importação do componente do Firebase
import "@firebase/auth"; // Importação dos usuários do Firebase
import "@firebase/firestore"; // Importação do Banco de dados do firebase diferente do Storage que terá as fotos
import FIREBASE_CONFIG from "../Core/config";
import LottieView from "lottie-react-native";

firebase.initializeApp(FIREBASE_CONFIG); // Quer dizer que vai iniciar o app nesse tela e também o banco de dados

export default class authscreen extends Component {
  componentDidMount () { // Essa função inicia o banco de dados se ele tiver logado vai para a tela "navigator" se não vai para a tela de "loginscreen"
      firebase.auth().onAuthStateChanged(user=>{
          if(user){
              this.props.navigation.navigate("navigator") // esse if leva para a tela de "navigator" pois ela enrola todas as outras navegações e vai direcionar para onde r no caso atual esta configurada na tela de "trendscreen"
          }else{
              this.props.navigation.navigate("loadingscreen")
          }
      })
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor:"black"}}>
          <LottieView
            source={require("../assets/51-preloader.json")}
            autoPlay={true}
            loop={true}
            style ={{height:200, width:200}}
          />

      </View>
    );
  }
}
