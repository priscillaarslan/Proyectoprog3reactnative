import React, { Component } from 'react';
import { View, Text, FlatList,TextInput,TouchableOpacity,Modal} from 'react-native'; 
import {auth, db} from '../firebase/config';
import firebase from 'firebase';
import "firebase/firestore";



class Comment extends Component {
    constructor() {
        super()
        this.state = {
            escribiendoComentario:"",
            comentarios: []
      
            }

    }
    componentDidMount(){ 
        db.collection("posteos").doc(this.props.route.params.id).onSnapshot((docs) => {
            console.log(docs)
            this.setState({
                comentarios:docs.data().Comentarios

            })
        })
    }

    escribirComentario(){
        db.collection("posteos").doc(this.props.route.params.id).update({
            Comentarios: firebase.firestore.FieldValue.arrayUnion({
                autor:auth.currentUser.email,
                textoComentario:this.state.escribiendoComentario,
                createdAt:Date.now()
            })
           
        })
        .then(() => {
            this.setState({
                escribiendoComentario: ""
            })
        })

    }





  
    render(){
        console.log(this.state.comentarios)
        console.log(this.props.route.params.id)
       
        return(
            <View>
                <Text>Pagina de comentarios</Text>
                <Text onPress={() => this.props.navigation.navigate("Home")}>Volver al home</Text>
                <Text>Los comentarios a este posteo son :</Text>
                {
                    this.state.comentarios.length==0? <View>
<Text>Aun no hay comentarios</Text>
                    </View>
                   : 
                     <FlatList data={this.state.comentarios} keyExtractor={(data)=>data.createdAt} renderItem={({item})=>  <Text>autor:{item.autor} texto del mensaje: {item.textoComentario}</Text> }
                    >
                    
            </FlatList> 
                }
               

            <TextInput 
             placeholder='escribi un comentario' 
             keyboardType='default'
             onChangeText={texto=>this.setState({escribiendoComentario:texto})}
             value= {this.state.escribiendoComentario}
             />
              
            
          
            {
                this.state.escribiendoComentario==""?
               < TouchableOpacity>
                 <Text> Escribir comentario </Text>
               </TouchableOpacity>:
                  <  TouchableOpacity onPress={()=>this.escribirComentario()}> 
                  <Text> Escribir comentario </Text>
                </TouchableOpacity>
               }
               
         </View>
       
          
        )
    }
}



export default Comment