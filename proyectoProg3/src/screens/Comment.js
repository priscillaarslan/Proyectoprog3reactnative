import React, { Component } from 'react';
import { View, Text, FlatList} from 'react-native'; 
import {auth, db} from '../firebase/config';




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
            this.setState({
                comentarios:doc.data().comentarios

            })
        }

      
    }




  
    render(){
       
        return(
            <View>
                <Text>Pagina de comentarios</Text>
                <Text>Los comentarios a este posteo son :</Text>
                {
                    this.state.comentarios.length==0? 
                    <Text> Aun no hay comentarios </Text>: 
                     <FlatList data={this.state.comentarios} keyExtractor={(data)=>data.id} renderItem={({item})=>  <Text>Este es un comentario :</Text> }
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
                  <  TouchableOpacity onPress={()=>this.escribirComentario(this.state.escribiendoComentario)}> 
                  <Text> Escribir comentario </Text>
                </TouchableOpacity>
               }
               
         </View>
       
          
        )
    }
}



export default Comment