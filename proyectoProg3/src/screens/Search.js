import React, { Component } from 'react';
import { View, Text, FlatList, TextInput,TouchableOpacity, StyleSheet} from 'react-native'; 
import {auth, db} from '../firebase/config';


class Search extends Component{
constructor(){
    super()
    this.state={
        usuario: [], 
        usuarioBuscado:'',
        usuariosFiltradosNombre:[],
        usuariosFiltradosEmail:[],
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
    let usuariosFiltradosNombre = this.state.usuario.filter((usuario)=>usuario.data.nombre.toLowerCase().includes(texto.toLowerCase())) 
    this.setState({
        usuariosFiltradosNombre:usuariosFiltradosNombre /*/ el primero usuario finltrado hace referencia al estado usuario filtrado se clara en la 12, y el otro hace referencia a la variable creada en la linea 36/*/
    })
    let usuariosFiltradosEmail = this.state.usuario.filter((usuario)=>usuario.data.email.toLowerCase().includes(texto.toLowerCase())) 
    this.setState({
        usuariosFiltradosEmail:usuariosFiltradosEmail /*/ el primero usuario finltrado hace referencia al estado usuario filtrado se clara en la 12, y el otro hace referencia a la variable creada en la linea 36/*/
    })

    }




render(){
    console.log(this.state.usuario)
    console.log(this.state.usuariosFiltrados)
    return(
        <View style={{flex:1}}>
        <View style={styles.buscador}>
        <Text style={styles.texto}> Esta es la pagina de buscar perfil </Text>
        <TextInput style={styles.boton}
        placeholder='busca un usuario' 
        keyboardType='default'
        onChangeText={texto=>this.busqueda(texto)}
        value= {this.state.usuarioBuscado}
        /> 
        <View>
        {this.state.usuariosFiltradosNombre.length==0&&this.state.usuarioBuscado!=''? <Text>No existen usuarios con ese nombre</Text>:<Text></Text>}
         {this.state.usuarioBuscado!=''?<FlatList data={this.state.usuariosFiltradosNombre} keyExtractor={(data)=>data.id} renderItem={({item})=> <TouchableOpacity onPress={() => this.props.navigation.navigate('OthersProfile',{email:item.data.email})}>  
                                    <Text>{item.data.nombre}</Text>
                </TouchableOpacity>}
         ></FlatList> : <Text></Text>} 
          {this.state.usuariosFiltradosEmail.length==0&&this.state.usuarioBuscado!=''? <Text>No existen usuarios con ese email</Text>:<Text></Text>}
         {this.state.usuarioBuscado!=''?<FlatList data={this.state.usuariosFiltradosEmail} keyExtractor={(data)=>data.id} renderItem={({item})=> <TouchableOpacity onPress={() => this.props.navigation.navigate('OthersProfile',{email:item.data.email})}>  
                                    <Text>{item.data.email}</Text>
                </TouchableOpacity>}
         ></FlatList> : <Text></Text>}
        </View>
         
        
        </View>
        </View>
    )

    
    
}
} 

const styles = StyleSheet.create({
     buscador2:{
        backgroundColor: 'rgba(135, 206, 235, 0.5)',
     },
    buscador:{
        backgroundColor: 'rgba(135, 206, 235, 0.5)',
        color: 'rgb(255,255,255)',
        padding: 15,
        height: 1000, 
    


    },

    boton:{
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        textAlign: 'right'

    },

    texto:{
        fontWeight: 600,
        color: 'black',
        fontSize: 24,
        textAlign: 'center', 
        FontFamily: 'Helvetica Neue'
    }, 

    
})


export default Search 