import React, { Component } from 'react';
import { View, Text, FlatList,TouchableOpacity,Image,StyleSheet} from 'react-native'; 
import {auth, db} from '../firebase/config';
import Card from '../components/Card';



class OthersProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
        post:[],
        usuario: [], 
        borrar: false,
        errorAlEliminar:false,
            }

    }
    componentDidMount(){ 
    db.collection('users').where('email','==',this.props.route.params.email ).onSnapshot(
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
    db.collection("posteos").where('Usuario','==', this.props.route.params.email).onSnapshot((docs) => {  /*/ el onsnapchot es para que agarre lo que haya (captura la coleccion de posteos), el docs tiene todos los posteos/*/
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
   



   

  
    render(){
      
        return(
            <View  style={styles.contenedor}>
                    <Text style={styles.texto2} onPress={() => this.props.navigation.navigate("Home")}>Volver al home</Text>

                {
                    this.state.usuario[0]?.data.foto ==""? <Text></Text>:
                 <View style={styles.imagen1}>  <Image style={styles.imagen} source={{uri:`${this.state.usuario[0]?.data.foto}`}}  resizeMode='contain' /></View>
                }
                <Text style={styles.texto}>Bienvenido al perfil de {this.state.usuario[0]?.data.email} tambien conocido como {this.state.usuario[0]?.data.nombre}</Text>
                <Text style={styles.texto1}>Biografia: {this.state.usuario[0]?.data.biografia} </Text>
                <Text style={styles.texto1}>Cantidad total de posteos:{this.state.post?.length} </Text>
                <Text style={styles.texto1}>Posteos del usuario : </Text>
                {this.state.post?.length==0?<Text >Este usuario no tiene posteos</Text>:  <FlatList data={this.state.post} keyExtractor={(data)=>data.id} renderItem={({item})=>< Card data={item}{...this.props}/>}
                >
                    
                </FlatList> }
              
                
               
                
         </View>
       
          
        )
    }
}
const styles = StyleSheet.create({
    
      
    imagen1:{
        width: 100, 
        height: 100,
        marginRight: 100,
    },

    contenedor:{
        flex: 1,
        backgroundColor: 'rgba(135, 206, 235, 0.5)',
        color: 'rgb(255,255,255)',
        width: 500, 
        marginLeft: 480
    },

texto: {
    fontWeight: 1000,
        color: 'black',
        fontSize: 16,
        marginLeft: 10, 
        fontFamily: 'Helvetica Neue',
        fontWeight: '400',
        marginTop: 10
 

    },

    texto1: {
        fontWeight: 600,
            color: 'black',
            fontSize: 14,
            marginLeft: 10, 
            fontFamily: 'Helvetica Neue',
            fontWeight: '400',
            marginTop: 10
        
        },


    texto2: {
        fontWeight: 600,
            color: 'black',
            fontSize: 14,
            fontFamily: 'Helvetica Neue',
            fontWeight: '400',
            borderWidth: 1, 
            width: 100, 
            marginTop: 20, 
            marginLeft: 10, 
        
        },
    
})




export default OthersProfile