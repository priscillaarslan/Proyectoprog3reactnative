import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet} from 'react-native'; 
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



   

  
    render(){
        console.log(this.state.post)
        return(
            <View style={styles.home}>
                <Text style={styles.titulo}>Soy la pagina del Home</Text>
                <Text style={styles.titulo2}>Nuevos posts: </Text>
                <FlatList data={this.state.post} keyExtractor={(data)=>data.id} renderItem={({item})=>< Card data={item}{...this.props}/>}
                >
                    
                </FlatList>
               
         </View>
       
          
        )
    }
}

const styles = StyleSheet.create({
    
    home: {
        flex: 1,
        backgroundColor: 'rgba(135, 206, 235, 0.5)',
        color: 'rgb(255,255,255)',
        justifyContent: 'center',
        alignItems: 'center'
    }, 

    titulo:{
        fontWeight: 600,
        color: 'rgb(255,255,255)',
        fontSize: 40,
        textAlign: 'center', 
        marginTop: 20
    },

    titulo2:{
        fontWeight: 600,
        color: 'rgb(255,255,255)',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 15

    }

    
})




export default Home