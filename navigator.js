import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import homescreen from "./homescreen";
import aboutscreen from "./aboutscreen";
import trendscreen from "./trendscreen";
import profilescreen from "./profilescreen";
import donatescreen from "./donatescreen";
import maincards from "./maincards";
import Icon from "react-native-vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
// import datacards from "../Data/datacards";

//Referenciamos a função createDrawerNavigaton de "Drawer"
const Drawer = createDrawerNavigator();

//Essa funcion chama o create navegation --> nesse casso foi modificado para uma "Hooks" o original era uma class, veja como exemplo as outras telas
function navigator() {
  return (
    // Na linha abaixo a função "Navigator" foi habilitada dentro da "Drawer" no caso estamos acessando o componente dentro da função
    <Drawer.Navigator
      //Editamos algumas props especificas do componente
      drawerStyle={{
        backgroundColor: "transparent",
        width: 305,
      }}
      initialRouteName="trendscreen"
      drawerContent={(props) => <MinhaDrawer {...props} />} //Nessa linha passamos as props do "drawerContent" para o "MinhaDrawer"
    >
      <Drawer.Screen name="trendscreen" component={trendscreen} />
      <Drawer.Screen name="homescreen" component={homescreen} />
      <Drawer.Screen name="aboutscreen" component={aboutscreen} />
      <Drawer.Screen name="profilescreen" component={profilescreen} />
      <Drawer.Screen name="donatescreen" component={donatescreen} />
      <Drawer.Screen name="maincards" component={maincards} />
    </Drawer.Navigator>
  );
}

const MinhaDrawer = (props) => {
  const [color1, setColor1] = useState("red");
  const [color2, setColor2] = useState("white");
  const [color3, setColor3] = useState("white");
  const [color4, setColor4] = useState("white");
  const [color5, setColor5] = useState("white");
  const [color6, setColor6] = useState("white");
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: height, width: 290 }}>
        <View
          style={{
            height: height,
            width: 300,
            backgroundColor: "white",
            opacity: 0.3,
            position: "absolute",
          }}
        ></View>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Icon
            name="bars"
            size={35}
            color="white"
            style={{ marginTop: 40, marginLeft: 19, opacity: 0.8 }}
          />
        </TouchableOpacity>
        <View style={{ marginTop: 50, alignSelf: "center" }}>
          <TouchableOpacity
            onPress={() => {
              setColor1("red"),
                setColor2("white"),
                setColor3("white"),
                setColor4("white"),
                setColor5("white"),
                setColor6("white"),
                props.navigation.navigate("trendscreen");
            }}
          >
            <Text style={{ fontSize: 40, color: color1, marginTop: 20 }}>
              TREND
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setColor1("white"),
                setColor2("red"),
                setColor3("white"),
                setColor4("white"),
                setColor5("white"),
                setColor6("white"),
                props.navigation.navigate("homescreen");
            }}
          >
            <Text style={{ fontSize: 40, color: color2, marginTop: 10 }}>
              BUILDINGS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setColor1("white"),
                setColor2("white"),
                setColor3("red"),
                setColor4("white"),
                setColor5("white"),
                setColor6("white");
                props.navigation.navigate("maincards");
            }}
          >
            <Text style={{ fontSize: 40, color: color3, marginTop: 10 }}>
              FAVORITES
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setColor1("white"),
                setColor2("white"),
                setColor3("white"),
                setColor4("red"),
                setColor5("white"),
                setColor6("white");
                props.navigation.navigate("profilescreen");
            }}
          >
            <Text style={{ fontSize: 40, color: color4, marginTop: 10 }}>
              PROFILE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setColor1("white"),
                setColor2("white"),
                setColor3("white"),
                setColor4("white"),
                setColor5("red"),
                setColor6("white"),
                props.navigation.navigate("aboutscreen");
            }}
          >
            <Text style={{ fontSize: 40, color: color5, marginTop: 10 }}>
              ABOUT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setColor1("white"),
                setColor2("white"),
                setColor3("white"),
                setColor4("white"),
                setColor5("white"),
                setColor6("red"),
                props.navigation.navigate("donatescreen");
            }}
          >
            <Text style={{ fontSize: 40, color: color6, marginTop: 10 }}>
              DONATE
            </Text>
          </TouchableOpacity>          
        </View>
      </View>
    </View>
  );
};
const { height, width } = Dimensions.get("screen");
export default navigator;
