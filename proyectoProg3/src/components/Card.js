import React, { Component } from 'react';
import { View, Text, FlatList} from 'react-native'; 
import {auth, db} from '../firebase/config';



class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
     
            }

    }
    componentDidMount(){ 
      
    }



  

  
    render(){
        console.log(this.props.data.data) 
        return(
            <View>
                <Text>Titulo del posteo: {this.props.data.data.Titulo}</Text>
                <Text>Descripcion del posteo: {this.props.data.data.Descripcion}</Text>
                <Text>Likes: {this.props.data.data.Likes.length}</Text>
              
         </View>
       
          
        )
    }
}



export default Card