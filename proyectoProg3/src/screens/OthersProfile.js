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
    db.collection('users').where('email','==',this.props.email ).onSnapshot(
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
    db.collection("posteos").where('Usuario','==', this.props.email).onSnapshot((docs) => {  /*/ el onsnapchot es para que agarre lo que haya (captura la coleccion de posteos), el docs tiene todos los posteos/*/
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
        console.log(this.props)
        return(
            <View>
                {
                    this.state.usuario[0]?.data.foto == ""? <Text></Text>:
                    <Image  style={styles.imagen} source={{uri:`${this.state.usuario[0]?.data.foto}`}}  resizeMode='contain'      />
                }
                <Text>Bienvenido al perfil de {this.state.usuario[0]?.data.email} tambien conocido como {this.state.usuario[0]?.data.nombre}</Text>
                <Text>Biografia: {this.state.usuario[0]?.data.biografia} </Text>
                <Text>Cantidad total de posteos:{this.state.post?.length} </Text>
                <Text>Posteos del usuario : </Text>
                {this.state.post?.length==0?<Text>Este usuario no tiene posteos</Text>:  <FlatList data={this.state.post} keyExtractor={(data)=>data.id} renderItem={({item})=>< Card data={item}{...this.props}/>}
                >
                    
                </FlatList> }
              
                
               
                
         </View>
       
          
        )
    }
}
const styles = StyleSheet.create({
    
    imagen:{
        width:"100%",
        height:250,
        alignContent:"center",
        marginVertical:10,
    },
})




export default OthersProfile