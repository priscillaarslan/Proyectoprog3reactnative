import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registro from '../screens/Registro';
import Login from '../screens/Login';
import {NavigationContainer} from "@react-navigation/native"
import NavegadorLogueado from './Navegadorlogueado';
import Comment from '../screens/Comment';
import OthersProfile from '../screens/OthersProfile';


const Stack = createNativeStackNavigator();
class Navegador extends Component {
    render(){
        return(
            <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen name='Registro' component={Registro} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='NavegadorLogueado' component={NavegadorLogueado} options={{ headerShown: false }} />
            <Stack.Screen name='Comment' component={Comment} options={{ headerShown: false }} />
            <Stack.Screen name='OthersProfile' component={OthersProfile} options={{ headerShown: false }} />  
        </Stack.Navigator>
        </NavigationContainer>
        )
    }
}
export default Navegador