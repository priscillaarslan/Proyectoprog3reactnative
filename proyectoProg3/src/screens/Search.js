import React, { Component } from 'react';
import { View, Text, FlatList, TextInput,TouchableOpacity} from 'react-native'; 
import {auth, db} from '../firebase/config';


class Search extends Component{
constructor(){
    super()
    this.setState={}
}
render(){
    return(
        <Text> Esta es la pagina de buscar perfil </Text>
    )
}
} 
export default Search 