import React, { Component } from 'react';
import { View, Text } from 'react-native';  // eventualmente borrar
import {auth, db} from '../firebase/config';



class Home extends Component {
    constructor() {
        super()
        this.state = {
        
            }
    }
    deslogueate() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

    render(){
        return(
            <View>
                <Text>Soy la pagina del Home</Text>
                <Text onPress={() => this.deslogueate()}> Deslogueate </Text>
         </View>
       
          
        )
    }
}



export default Home