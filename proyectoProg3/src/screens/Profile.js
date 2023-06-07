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
    db.collection("posteos").where('Usuario','==', auth.currentUser.email).onSnapshot((docs) => {  /*/ el onsnapchot es para que agarre lo que haya (captura la coleccion de posteos), el docs tiene todos los posteos/*/
    let posteos = []
    console.log(docs)
    docs.forEach(doc=>{  /*/ docs es un array entonces le hago un for each para recorrerlo y hacer algo por cada elemento, docs adentro tiene e cada uno de los elementos del doc/*/
        posteos.push({
            id:doc.id,
            data:doc.data() /*/ dentro de data va la info del posteo/*/
        })
    });
    this.setState({
        post:posteos
    })
    })
       
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
                <Text>Cantidad total de posteos:{this.state.post?.length} </Text>
                <Text>:{this.state.post?.length} </Text>
                <FlatList data={this.state.post} keyExtractor={(data)=>data.id} renderItem={({item})=>< Card data={item}{...this.props}/>}
                >
                    
                </FlatList> 
                
               
                <Text onPress={() => this.deslogueate()}> Deslogueate </Text>
         </View>
       
          
        )
    }
}



export default Profile