import React, { Component } from 'react';
import { View, Text, FlatList} from 'react-native'; 
import {auth, db} from '../firebase/config';
import Card from '../components/Card';



class Home extends Component {
    constructor() {
        super()
        this.state = {
        post:[]
            }

    }
    componentDidMount(){ 
       // agarra de firebase todos los psoteos//
        db.collection("posteos").onSnapshot((docs) => {  /*/ el onsnapchot es para que agarre lo que haya (captura la coleccion de posteos), el docs tiene todos los posteos/*/
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
        console.log(this.state.post)
        return(
            <View>
                <Text>Soy la pagina del Home</Text>
                <Text>Nuevos posts: </Text>
                <FlatList data={this.state.post} keyExtractor={(data)=>data.id} renderItem={({item})=>< Card data={item}{...this.props}/>}
                >
                    
                </FlatList>
                <Text onPress={() => this.deslogueate()}> Deslogueate </Text>
         </View>
       
          
        )
    }
}



export default Home