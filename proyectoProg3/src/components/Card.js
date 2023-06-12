import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'; 
import {auth, db} from '../firebase/config';
import firebase from 'firebase';
import "firebase/firestore";


class Card extends Component {
    constructor(props) {
        super(props)
        this.state = {
             likeado:false,
             comment:false,
             borrar: false,


            }

    }
    componentDidMount(){ 
        let Likes = this.props.data.data.Likes;
           // este let tiene los mails de las personas que le dieron like en forma de array//
        if  (Likes.includes(auth.currentUser.email) // si el array incluye el mail del usuario que tenemos iniciado, decalara likeado como true//
        ) {
            this.setState({
                likeado: true
            })
        }
        else {
            this.setState({
                likeado: false // si no tiene iniciacdo, mantiene likeado como false//
            })
        } 
    }
    like(){
        // el doc. entra al posteo individual, data.id esta antes de la data//
        let posteo =  db.collection("posteos").doc(this.props.data.id)
        //el if funciona con true o false, no hace falta igualarlo//
       if (this.state.likeado) {
        // update metodo de firebase para actualizar elementos de una coleccion de forma individual//
        posteo.update({
            Likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            // el remove saca de la cadena el mail del usuario que le dio like. De alguna manera el like es un email//
        })
        .then(() => {
            this.setState({
                likeado: false,
            })
        })
       } else {
        posteo.update({
            Likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            //Likes lo creamos como un array vacio, cuando le das like y hace un array Union y agarra el email del usuario a likes del posteo//
        })
        .then(() => {
            this.setState({
                likeado: true,
            })
        })
       }
    }
    eliminarPost(){
        db.collection("posteos").doc(this.props.data.id).delete()
        .then(() => {

        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
       
        
    }




  

  
    render(){
        console.log(this.props.data.data.Likes.length);   
        return(
            <View style={styles.contenedor}>
              <Text style={styles.autor} >Autor: {this.props.data.data.Usuario}</Text>
                <Text>Titulo del posteo: {this.props.data.data.Titulo}</Text>
                {
                    this.props.data.data.Foto == ''? <Text></Text>:
                    <Image  style={styles.imagen} source={{uri:`${this.props.data.data.Foto}`}}  resizeMode='contain'      />
                }
                <Text>Descripcion del posteo: {this.props.data.data.Descripcion}</Text>
                <Text>Likes: {this.props.data.data.Likes.length}</Text>
                {this.state.likeado ? <TouchableOpacity onPress={() => this.like()}>
                              <Text>Deslikear</Text>
                     </TouchableOpacity> : <TouchableOpacity onPress={() => this.like()}>
                                    <Text>Likear</Text>
                </TouchableOpacity>} 
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment',{id:this.props.data.id})}>  {/*hacemos esto para que me traiga los comentarios de un solo posteo*/}
                                    <Text>Ver comentarios</Text>
                </TouchableOpacity> 
                {this.props.data.data.Usuario==auth.currentUser.email? <TouchableOpacity onPress={() => this.setState({ borrar: true })}> <Text> Eliminar post </Text> </TouchableOpacity>:<Text></Text>}
               
                {this.state.borrar == false ? <Text> </Text> : <> <Text> Estas seguro que quieres eliminar el post, es permanente!</Text>
                    <TouchableOpacity onPress={() => this.eliminarPost()}> <Text> Si eliminar </Text> </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ borrar: false })}> <Text> No eliminar </Text> </TouchableOpacity> </>}


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
    autor:{
        fontSize: 30,
        color: "red",
        marginTop: 100
    },

    contenedor:{
        flex: 1, 
        maxWidth: 600,
        margin: 0,
        padding: 20,

    }

    
})


export default Card