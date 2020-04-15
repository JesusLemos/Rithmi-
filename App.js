import React, { Component } from 'react';
import axios from 'axios';
//import dayjs from 'dayjs';
import { Text, View, ScrollView,SectionList, StyleSheet } from 'react-native';






export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        datosAPI:[]
    }
  }



//Llama los datos de la api
    obtenerDatos(){
    axios.get('https://my.api.mockaroo.com/samples.json?key=89148380').then(res =>{
    const datos = res.data;
    this.setState({datosAPI:datos});

    }


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

