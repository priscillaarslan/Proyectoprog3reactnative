import React, { Component } from 'react';
import { View, Text, FlatList} from 'react-native'; 
import {auth, db} from '../firebase/config';



class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
             likeado:false,

            }

    }
    componentDidMount(){ 
      
    }
    like(){
        // el doc. entra al posteo individual, data.id esta antes de la data//
        let posteo =  db.collection("posteos").doc(this.props.data.id)
        //el if funciona con true o false, no hace falta igualarlo//
       if (this.state.likeado) {
        // update metodo de firebase para actualizar elementos de una coleccion de forma individual//
        posteo.update({
            
        })
       } else {
        
       }
    }




  

  
    render(){
          
        return(
            <View>
                <Text>Titulo del posteo: {this.props.data.data.Titulo}</Text>
                <Text>Descripcion del posteo: {this.props.data.data.Descripcion}</Text>
                <Text>Likes: {this.props.data.data.Likes.length}</Text>
                {this.state.likeado ? <TouchableOpacity onPress={() => this.like()}>
                              <Text>Likear</Text>
                     </TouchableOpacity> : <TouchableOpacity onPress={() => this.like()}>
                                    <Text>Deslikear</Text>
                </TouchableOpacity>} 
         </View>
       
          
        )
    }
}



export default Card