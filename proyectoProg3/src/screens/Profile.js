import React, { Component } from 'react';
import { View, Text, FlatList} from 'react-native'; 
import {auth, db} from '../firebase/config';
import Card from '../components/Card';



class Profile extends Component {
    constructor() {
        super()
        this.state = {
        post:[],
        usuario: [], 

            }

    }
    componentDidMount(){ 
    db.collection('users').where('email','==', auth.currentUser.email).onSnapshot(
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



    deslogueate() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

  
    render(){
        console.log(this.state.usuario)
        return(
            <View>
                <Text>Soy la pagina del Perfil</Text>
                <Text>Bienvenido {this.state.usuario[0]?.data.email} tambien conocido como {this.state.usuario[0]?.data.nombre}</Text>
                <Text>Biografia: {this.state.usuario[0]?.data.biografia} </Text>
                <Text>Cantidad total de posteos: </Text>

               
                <Text onPress={() => this.deslogueate()}> Deslogueate </Text>
         </View>
       
          
        )
    }
}



export default Profile