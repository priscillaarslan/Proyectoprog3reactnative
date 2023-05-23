import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registro from '../screens/Registro';
import Login from '../screens/Login';
import {NavigationContainer} from "@react-navigation/native"

const Stack = createNativeStackNavigator();
class Navegador extends Component {
    render(){
        return(
            <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name='Registro' Component= {Registro}  />
            <Stack.Screen name='Login' Component= {Login}  /> 
        </Stack.Navigator>
        </NavigationContainer>
        )
    }
}
export default Navegador