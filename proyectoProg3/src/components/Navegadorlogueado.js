import React, { Component } from 'react';
import Home from '../screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Addpost from '../screens/Addpost';
import Profile from '../screens/Profile';
import {FontAwesome} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Search from '../screens/Search';
import {StyleSheet} from 'react-native'; 




const Tab = createBottomTabNavigator();
class NavegadorLogueado extends Component {
    render(){
        return(
            <Tab.Navigator style={styles.contenedor} >
            <Tab.Screen name='Home' component={Home} options={{ headerShown: false,
             tabBarIcon: () => <AntDesign name='home' color='black' size={24} /> }} />
            <Tab.Screen name='Addpost' component={Addpost} options={{ headerShown: false,
           tabBarIcon: () => <AntDesign name="plus" color="black" size={24} />  }} />
            <Tab.Screen name='Profile' component={Profile} options={{ headerShown: false,
           tabBarIcon: () => <AntDesign name="profile" color="black" size={24} />  }} />
           <Tab.Screen name='Busqueda usuario' component={Search} options={{ headerShown: false,
           tabBarIcon: () => <AntDesign name="search1" color="black" size={24} />  }} />
          
        </Tab.Navigator>
        )
    }
}

const styles = StyleSheet.create({
contenedor:{
    width:50, 
  
}

})


export default NavegadorLogueado