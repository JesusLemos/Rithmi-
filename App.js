import React, { Component } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Text, View, ScrollView,SectionList, StyleSheet } from 'react-native';






export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        datosAPI:[],
        ampliacionDatosAPI:[]
    }
  }

//Ordenar los datos

   ordenarDatos(){

   //Almacenar todos los datos en una variable
    const DATOSAPI= this.state.datosAPI;

         for(let i=0;i< DATOSAPI.length;i++){
                  let lista = this.state.datosAPI;
                  dayjs.locale('es');
        //Creacion de nuevo objeto ampliado
                 this.state.ampliacionDatosAPI.push({...lista[i] ,
                 'dia':dayjs(lista[i].date,).locale('es').format('DD'),
                 'hora':dayjs(lista[i].date, {utc:true}).locale('es').format('HH:mm'),
                 'fechalarga':dayjs(lista[i].date).locale('es').format('YYYY-MM-DD')});
           }
         //  console.log('ampliado',this.state.ampliacionDatosAPI);
    }

//Llama los datos de la api
    obtenerDatos(){
        axios.get('https://my.api.mockaroo.com/samples.json?key=89148380').then(res =>{
        const datos = res.data;
        this.setState({datosAPI:datos});
        this.ordenarDatos();

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

