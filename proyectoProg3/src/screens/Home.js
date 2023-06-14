import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet,ActivityIndicator} from 'react-native'; 
import {auth, db} from '../firebase/config';
import Card from '../components/Card';



class Home extends Component {
    constructor() {
        super()
        this.state = {
        post:[],
        loader:false
            }

    }
    componentDidMount(){ 
       // agarra de firebase todos los psoteos//
        db.collection("posteos").orderBy('CreatedAt', 'desc').onSnapshot((docs) => {  /*/ el onsnapchot es para que agarre lo que haya (captura la coleccion de posteos), el docs tiene todos los posteos/*/
        let posteos = []
        console.log(docs)
        docs.forEach(doc=>{  /*/ docs es un array entonces le hago un for each para recorrerlo y hacer algo por cada elemento, docs adentro tiene e cada uno de los elementos del doc/*/
            posteos.push({
                id:doc.id,
                data:doc.data() /*/ dentro de data va la info del posteo/*/
            })
        });
        this.setState({
            post:posteos,
            loader:true
        })
        })
    }


  
    render(){
        console.log(this.state.post)
        return(
           
           
            <View style={styles.home}><Text style={styles.titulo}>Instagram</Text>
                <Text style={styles.titulo2}>Nuevos posts: </Text>
                {this.state.loader?
                <FlatList  style={styles.flatList} data={this.state.post} keyExtractor={(data)=>data.id} renderItem={({item})=>< Card data={item}{...this.props}/>}
                >
                    
                </FlatList>: <ActivityIndicator size="large" color="black"/>}
                </View>
              
                
         
     
      
       
          
        )
    }
}

const styles = StyleSheet.create({
    
    home: {
        flex: 1,
        backgroundColor: 'rgba(135, 206, 235, 0.5)',
        color: 'rgb(255,255,255)',
       
    
    }, 

    titulo:{
        fontWeight: 600,
        color: 'black',
        fontSize: 40,
        textAlign: 'center', 
        marginTop: 20, 
        fontFamily: 'billabong',
        fontWeight: 'lighter',
        
        
    },


   
    titulo2:{
        fontWeight: 600,
        color: 'black',
        fontSize: 20,
        marginRight: 320,
        marginTop: 15, 
        fontFamily: 'Helvetica Neue',
        fontWeight: '400',
        marginLeft: 15,

    }, 

flatlist:{
width: '100%'
}


    
})




export default Home