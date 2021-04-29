// Tela com todas as funções de autenticação
import React, { Component } from "react";
import { Text, View, Alert } from "react-native";
import firebase from "@firebase/app"; // Importação do componente do Firebase
import "@firebase/auth"; // Importação dos usuários do Firebase, por causa de um bug do firebase
import "@firebase/firestore"; // Importação do Banco de dados do firebase diferente do Storage que terá as fotos, por causa de bug

class apiauth extends Component {
  logout = () => {
    // Função de Desconectar
    firebase.auth().signOut();
  };

  createuser = async (user) => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      let db = this.firestore.collection("Users").doc(this.uid); // Referenciado o Firebase com o Firestore
      db.set({
        // Função que quando acessada vai criar uma novo usuário indicar aqui tudo que se quer no começo do app
        email: user.email,
        password: user.password,
        fullname: user.fullname,
        timestamp: this.timestamp,
        country: user.country,
      });
    } catch (error) {
      alert(error);
    }
  };

  get firestore() {
    // Esse método é apenas para renomear o firebase.firestore para ficar menor o nome da função
    return firebase.firestore();
  }
  get timestamp() {
    // retorna o horário do momento
    return Date.now();
  }
  get uid() {
    // nome da função, poeria ser qualquer nome no caso aqui uid seria o "User id"
    // Método para recuperar a autenticação do usuário e o id do usuário atual, se ele não encontrar o id retorna vazio
    return (firebase.auth().currentUser || {}).uid;
  }
}
apiauth.shared = new apiauth(); // Esse método possibilita que outras telas se comuniquem e "chamem" a tela atual em qualquer parte da aplicação
export default apiauth; // No caso o logout e create user
