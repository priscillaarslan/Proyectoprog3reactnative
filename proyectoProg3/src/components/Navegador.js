import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registro from '../screens/Registro';
import Login from '../screens/Login';
import {NavigationContainer} from "@react-navigation/native"
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();
class Navegador extends Component {
    render(){
        return(
            <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name='Registro' component={Registro} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
        </NavigationContainer>
        )
    }
}
export default Navegador