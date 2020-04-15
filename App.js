import React, { Component } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { Text, View, ScrollView,SectionList, StyleSheet } from 'react-native';

import Anomalia from './Components/Anomalia';




export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        datosAPI:[],
        ampliacionDatosAPI:[],
        datosODH:[],
        estructurado:[]
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
        //Guardamos el nuevo array de objetos en una nueva variable
        let ampliacionDatosAPI = this.state.ampliacionDatosAPI;

        //Ordenamos por dia nuestro array de objetos

           let  ordenadospordias = ampliacionDatosAPI.sort(function (a, b) {
                return ( a.dia - b.dia)
            })

        //Datos organizados separados por dias
            let datosOrganizado = [];
            let grupoDias = [];

            for(let i = 0; i <= 31;i++ ){

                  for(let j = 0 ; j < ordenadospordias.length;j++){
                    if( ordenadospordias[j].dia == i +1 ){
                       grupoDias = [...grupoDias,
                          ordenadospordias[j]
                        ]

                    }
                  }

                  datosOrganizado.push(grupoDias);
                  grupoDias = [];

                }

        //Datos organizados por horas
         for(let i = 0; i <= 31;i++ ){
              datosOrganizado[i].sort(function (a, b) {
               return b.hora.localeCompare(a.hora);
                    });
            }

        this.setState({datosODH:datosOrganizado});

        //Añadiremos un objeto con la fecha del dia mas el array que hemos ordenado anteoriormente


              let nuevoarray=[];
              let almacenarnuevoarray={};
              for(let i=0;i<=27;i++){

               let fechacompleta =dayjs(this.state.datosODH[i][0].fechalarga).$d;
               let limitarfecha  = fechacompleta.toString().slice(0,15);


                almacenarnuevoarray={
                  fechacompleta: limitarfecha ,
                  data:this.state.datosODH[i]
                }

                nuevoarray.push(almacenarnuevoarray);
              }

            this.setState({estructurado:nuevoarray});


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
  <ScrollView>
    {this.state.estructurado.map(item =>
         <View>
          <Text>{item.fechacompleta}</Text>

            {item.data.map(item2 =>
                      <View >
                        <Text>{item2.hora}</Text>
                        <Text>{item2.heartRate} ppm</Text>
                         <Anomalia />
                      </View>
                      )}

          </View>
          )}
  </ScrollView>)
}
}

