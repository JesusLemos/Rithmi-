import React, { Component } from 'react';
import {
 AppRegistry,
 Text,
 View,
 StyleSheet
} from 'react-native';

export default class Anomalia extends Component {
 constructor(props) {
    super(props);
    this.state={};
  }


 render() {

   return (

      <View >
     {this.props.anomalia == true ?
        <View style={styles.anomaliaRojo} >
      </View>
      :
       <View style={styles.anomaliaGris} >
           </View>
 }
      </View>
   );

 }

}



const styles = StyleSheet.create({

  anomaliaGris:{
     borderWidth: 10,
       borderRadius: 50,
       borderColor:"#6E6E6E",
  },
    anomaliaRojo:{
       borderWidth: 10,
         borderRadius: 50,
         borderColor:"red",
    },


});
