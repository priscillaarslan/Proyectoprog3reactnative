import React, { Component } from 'react';
import { View, Text, FlatList, TextInput,TouchableOpacity, StyleSheet} from 'react-native'; 
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
        <View style={styles.buscador2}>
        <View style={styles.buscador}>
        <Text style={styles.texto}> Esta es la pagina de buscar perfil </Text>
        <TextInput style={styles.boton}
        placeholder='busca un usuario' 
        keyboardType='default'
        onChangeText={texto=>this.busqueda(texto)}
        value= {this.state.usuarioBuscado}
        />
        {this.state.usuariosFiltrados.length==0&&this.state.usuarioBuscado!=''? <Text>No existen usuarios con ese nombre</Text>:<Text></Text>}
         {this.state.usuarioBuscado!=''?<FlatList data={this.state.usuariosFiltrados} keyExtractor={(data)=>data.id} renderItem={({item})=> <TouchableOpacity onPress={() => this.props.navigation.navigate('OthersProfile',{email:item.data.email})}>  
                                    <Text>{item.data.nombre}</Text>
                </TouchableOpacity>}
         ></FlatList> : <Text></Text>}
        
         
        
        </View>
        </View>
    )

    
    
}
} 

const styles = StyleSheet.create({

    buscador:{
        backgroundColor: 'rgba(135, 206, 235, 0.5)',
        color: 'rgb(255,255,255)',
        padding: 15,
        justifyContent: 'center',
        height: 300, 
    


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