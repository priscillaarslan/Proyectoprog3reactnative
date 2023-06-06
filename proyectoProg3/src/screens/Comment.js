import React, { Component } from 'react';
import { View, Text, FlatList} from 'react-native'; 
import {auth, db} from '../firebase/config';




class Comment extends Component {
    constructor() {
        super()
        this.state = {
      
            }

    }
    componentDidMount(){ 
      
    }




  
    render(){
       
        return(
            <View>
                <Text>Soy un comentario</Text>
               
         </View>
       
          
        )
    }
}



export default Comment