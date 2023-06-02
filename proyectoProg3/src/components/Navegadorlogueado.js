import React, { Component } from 'react';
import Home from '../screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Addpost from '../screens/Addpost';


const Tab = createBottomTabNavigator();
class NavegadorLogueado extends Component {
    render(){
        return(
            <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Tab.Screen name='Addpost' component={Addpost} options={{ headerShown: false }} />
        </Tab.Navigator>
        )
    }
}
export default NavegadorLogueado