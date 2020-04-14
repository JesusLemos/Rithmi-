import React, { Component } from 'react';
import axios from 'axios';
import { Text, View, ScrollView,SectionList, StyleSheet } from 'react-native';






export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

    obtenerDatos(){
    axios.get('https://my.api.mockaroo.com/samples.json?key=89148380').then(res => console.log('Hola')
          ).catch(err => console.error(err));


    }

    componentDidMount(){
    console.log('componentdidmount')
    this.obtenerDatos();


    }


  render() {



  return(
  <View>
  <Text>Prueba</Text>
  </View>)
}
}

