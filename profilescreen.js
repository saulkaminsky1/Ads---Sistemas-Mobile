import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Linking,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
// import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5";
import firebase from "@firebase/app"; // Importação do componente do Firebase
import "@firebase/auth"; // Importação dos usuários do Firebase
import "@firebase/firestore"; // Importação do Banco de dados do firebase diferente do Storage que terá as fotos
import apiauth from "../Auth/apiauth";
import * as Permissions from "expo-permissions"; // Importação do componente necessário para colocar a foto 1-2
import * as ImagePicker from "expo-image-picker"; // Importação do componente necessário para colocar a foto 2-2
import RNPickerSelect from "react-native-picker-select";

export default class profilescreen extends Component {
  state = {
    scroll_: true,
    fullname: "",
    email: "",
    mobilephone: "",
    profession: "",
    imagecontainer: null,
    user: {}, // Quando tem chave vai receber os objetos do Firebase
  };

  get uid() {
    // Essa função foi declara no apiauth mas pode ser declarada aqui tambem, no caso apenas copiei da pagina do apiauth
    // Método para recuperar o usuário do app
    return (firebase.auth().currentUser || {}).uid;
  }

  updateData = () => {
    // Função para atualizar os dados do usuário
    let dbfullname = firebase.firestore().collection("Users").doc(this.uid);
    let dbemail = firebase.firestore().collection("Users").doc(this.uid);
    let dbimagem = firebase.firestore().collection("Users").doc(this.uid);

    // Os ifs abaixo servirão apenas para atualizar os dados caso estejam vazio nesse caso não alterarão os dados já incluidos
    if (this.state.fullname != "") {
      dbfullname.update({
        fullname: this.state.fullname,
      });
    }
    if (this.state.email != "") {
      dbemail.update({
        email: this.state.email,
      });
    }
    if (this.state.profession != "") {
      dbprofession.update({
        profession: this.state.profession,
      });
    }
    if (this.state.mobilephone != "") {
      dbmobilephone.update({
        mobilephone: this.state.mobilephone,
      });
    }
    if (this.state.imagecontainer != null) {
      dbimagem.update({
        imagem: this.state.imagecontainer,
      });
    }
  };

  async PermissionsCamera() {
    // Essa função aguarda o comando da permissão de câmera
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status === "granted") {
      this.PickerPhoto();
    }
    if (status !== "granted") {
      Alert.alert("Permission", "Allow the Midia Permissions");
    }
  }

  PickerPhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ imagecontainer: result.uri });
    }
    console.log(result); // Console apenas para ver os dados passados pelo usuário
  };

  logOut = () => {
    // Função para sair do app ( desconectar )
    firebase
      .auth()
      .signOut()
      .then((sucess) => {
        console.log("sucess");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    //Função para iniciar a tela de profile com os dados do firebase
    const usuario = this.props.uid || apiauth.shared.uid; // Criamos duas opções ou recuperar o "uid" da tela anterior podendo ser qualuqer tela do nosso app ou então caso não ache o uid pega-se da apiauth
    this.unsubscribe = apiauth.shared.firestore
      .collection("Users")
      .doc(usuario)
      .onSnapshot((dadosdousuario) => {
        this.setState({ user: dadosdousuario.data() });
      });
    console.log(usuario); // Manteremos essa parte do código apenas para ver se em teste o documento do usuário será lido, entrará como um hash no terminal.
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient style={style.linear} colors={["#5D93FF", "#2AFFCD"]}>
          <ScrollView
            scrollEnabled={this.state.scroll_}
            ref={(ref) => (this.scrollcontainer = ref)}
          >
            <KeyboardAvoidingView behavior="padding">
              <View
                style={{ flexDirection: "row", marginLeft: 20, marginTop: 30 }}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.openDrawer()}
                >
                  <Icon
                    name="bars"
                    size={35}
                    color="white"
                    style={{ marginTop: 10 }}
                  />
                </TouchableOpacity>
                <View style={{ marginLeft: 280 }}>
                  <Image
                    source={require("../assets/logo.png")}
                    style={{ height: 60, width: 60 }}
                  ></Image>
                </View>
              </View>
              <View
                style={{
                  marginTop: 20,
                  marginLeft: 30,
                  flexDirection: "column",
                }}
              >
                <View style={{ width: "90%" }}>
                  <Text style={style.text1}>
                    Hello, {this.state.user.fullname}
                  </Text>
                </View>
                <Text style={style.text2}>Update your status</Text>
              </View>
              <View style={{ marginTop: 30, alignSelf: "center" }}>
                <View
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 200,
                    borderWidth: 1,
                    borderColor: "white",
                  }}
                >
                  <Image
                    style={{ height: 150, width: 150, borderRadius: 200 }}
                    source={{ uri: this.state.imagecontainer }}
                  />
                  <View
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 100,
                      backgroundColor: "#fa578e",
                      position: "absolute",
                      top: -10,
                      right: 0,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity onPress={this.PickerPhoto}>
                      <Icon name="plus" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View>
                <View
                  style={{ marginTop: 30, marginLeft: 30, marginRight: 30 }}
                >
                  <TextInput
                    onFocus={() => this.setState({ scroll_: true })}
                    onEndEditing={() => this.setState({ scroll_: false })}
                    label="Full Name"
                    placeholder={this.state.user.fullname}
                    placeholderTextColor="white"
                    value={this.state.fullname}
                    paddingLeft={12}
                    onChangeText={(text) => this.setState({ fullname: text })}
                    style={{
                      color: "white",
                      height: 60,
                      width: "100%",
                      borderWidth: 1,
                      borderColor: "white",
                      borderRadius: 12,
                    }}
                  />
                </View>
                <View
                  style={{ marginTop: 20, marginLeft: 30, marginRight: 30 }}
                >
                  <TextInput
                    onFocus={() => this.setState({ scroll_: true })}
                    onEndEditing={() => this.setState({ scroll_: false })}
                    label="E-mail"
                    placeholder={this.state.user.email}
                    placeholderTextColor="white"
                    value={this.state.email}
                    paddingLeft={12}
                    onChangeText={(text) => this.setState({ email: text })}
                    style={{
                      color: "white",
                      height: 60,
                      width: "100%",
                      borderWidth: 1,
                      borderColor: "white",
                      borderRadius: 12,
                    }}
                  />
                </View>
                <View
                  style={{ marginTop: 20, marginLeft: 30, marginRight: 30 }}
                ></View>
                <View
                  style={{ marginTop: 20, marginLeft: 30, marginRight: 30 }}
                >
                  <TextInput
                    onFocus={() => this.setState({ scroll_: true })}
                    onEndEditing={() => this.setState({ scroll_: false })}
                    label="Profession"
                    placeholder={"Profession:  " + this.state.user.profession}
                    placeholderTextColor="white"
                    value={this.state.profession}
                    paddingLeft={12}
                    onChangeText={(text) => this.setState({ profession: text })}
                    style={{
                      color: "white",
                      height: 60,
                      width: "100%",
                      borderWidth: 1,
                      borderColor: "white",
                      borderRadius: 12,
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: 30,
                  marginLeft: 30,
                  flexDirection: "column",
                  marginBottom: 120,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.updateData();//FIrebase
                    this.setState({ scroll_: true });//Possibilita o Scroll
                    this.scrollcontainer.scrollTo({ animated: true, y: 0 });//Trava a scroll
                  }}
                >
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
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: 16,
                        }}
                      >
                        Update
                      </Text>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    alignSelf: "center",
                    flexDirection: "row",
                    marginTop: 30,
                  }}
                >
                  <Text style={{ fontSize: 14 }}>Want leave the app, </Text>
                  <TouchableOpacity onPress={this.logOut}>
                    <Text
                      style={{ fontSize: 14, color: "#fa578e", marginLeft: 3 }}
                    >
                      Log Out Here
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </LinearGradient>
      </View>
    );
  }
}

const { height, width } = Dimensions.get("screen");
const style = StyleSheet.create({
  linear: {
    height: height,
    width: width,
    opacity: 0.8,
  },
  text1: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },

  text2: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
  },
});
