import React, { Component } from 'react';
import { View, Text, FlatList, TextInput,TouchableOpacity} from 'react-native'; 
import {auth, db} from '../firebase/config';


class Search extends Component{
constructor(){
    super()
    this.state={
        usuario: [], 
        usuarioBuscado:'',
        usuariosFiltrados:[],
    }
}

componentDidMount(){ /*/ queremos que nos tariga los usuarios/*/
db.collection('users').onSnapshot(
    (docs)=>{
    let user =[]
    docs.forEach((doc)=>{
        user.push({
            id:doc.id, 
            data:doc.data(), 
        })
    })
    this.setState({
        usuario: user
    })
    }
)
}
busqueda(texto){
    this.setState({
        usuarioBuscado: texto
    })
    let usuariosFiltrados = this.state.usuario.filter((usuario)=>usuario.data.nombre.toLowerCase().includes(texto.toLowerCase())) 
    this.setState({
        usuariosFiltrados:usuariosFiltrados /*/ el primero usuario finltrado hace referencia al estado usuario filtrado se clara en la 12, y el otro hace referencia a la variable creada en la linea 36/*/
    })

    }




render(){
    console.log(this.state.usuario)
    console.log(this.state.usuariosFiltrados)
    return(
        <View>
        <Text> Esta es la pagina de buscar perfil </Text>
        <TextInput 
        placeholder='busca un usuario' 
        keyboardType='default'
        onChangeText={texto=>this.busqueda(texto)}
        value= {this.state.usuarioBuscado}
        />
        
        </View>
    )
}
} 
export default Search 