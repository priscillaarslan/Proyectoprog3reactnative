import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image,FlatList} from 'react-native'; 
import {auth, db} from '../firebase/config';
import firebase from 'firebase';
import "firebase/firestore";
import { FontAwesome, EvilIcons } from '@expo/vector-icons'


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
        console.log(this.props.data.data.Comentarios)
        console.log(this.props.data.data.Likes.length);   
        return(
            <View style={styles.contenedor}>
                    <View style={styles.flex}> 
              <Text style={styles.autor} onPress={() => this.props.navigation.navigate('OthersProfile',{email:this.props.data.data.Usuario})}><text> {this.props.data.data.Usuario}</text></Text>
              {
                    this.props.data.data.Foto == ''? <Text></Text>:
                    <Image  style={styles.imagen} source={{uri:`${this.props.data.data.Foto}`}}  resizeMode='contain'      />
                }
                <Text style={styles.text}>nombre del post: <text style={styles.text2}>{this.props.data.data.Titulo} </text> </Text>
                
                {this.state.likeado ? <TouchableOpacity onPress={() => this.like()}>
                <FontAwesome
                  name='heart'
                  size={24}
                  color='red'
                />
                     </TouchableOpacity> : <TouchableOpacity onPress={() => this.like()}>
                     <FontAwesome
                  name='heart-o'
                  size={24}
                  color='red'
                />
                </TouchableOpacity>} 
                <Text style={styles.info}>likes: <text  style={styles.info3}> {this.props.data.data.Likes.length}</text> </Text>
              
                <Text style={styles.info}>descripcion del posteo: <text  style={styles.info3}>{this.props.data.data.Descripcion}</text> </Text>

               <Text style={styles.info}>ultimos comentarios</Text>
               {this.props.data.data.Comentarios.length==0?<Text style={styles.info}>no existen comentarios para este posteo</Text>:
                <FlatList data={this.props.data.data.Comentarios.slice(-4)} keyExtractor={(data)=>data.createdAt} renderItem={({item})=>  <Text style={styles.info} >autor:{item.autor} texto del mensaje: {item.textoComentario}</Text> }
                >
                    
        </FlatList>   }
             
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Comment',{id:this.props.data.id})}>  {/*hacemos esto para que me traiga los comentarios de un solo posteo*/}
                                    <Text style={styles.info1}>Ver todos los comentarios</Text>
                </TouchableOpacity> 
                {this.props.data.data.Usuario==auth.currentUser.email? <TouchableOpacity onPress={() => this.setState({ borrar: true })}><Text style={styles.info1}>Eliminar post</Text> </TouchableOpacity>:<Text></Text>}
               
                {this.state.borrar == false ? <Text> </Text> : <> <Text> Estas seguro que quieres eliminar el post, es permanente!</Text>
                    <TouchableOpacity onPress={() => this.eliminarPost()}><Text> Si eliminar</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({ borrar: false })}><Text>No eliminar </Text> </TouchableOpacity> </>}

                    </View>
         </View>
       
          
        )
    }
}
const styles = StyleSheet.create({
    
    imagen:{
        width: 300,
        height:200,
        alignContent:"center",

    },
    autor:{
        fontSize: 15,
        color: "black",
        flex: 2,
        fontWeight: '400', 
        fontFamily: 'Helvetica Neue', 
  

    },


    text:{
        fontWeight: 'bold', 
        fontFamily: 'Helvetica Neue', 
        
    },

    text2:{
        fontWeight: 'lighter', 
        fontFamily: 'Helvetica Neue', 
    },


    contenedor:{
        padding: 15,
        borderBottomWidth: 1,
        borderColor: 'rgb(180,180,180)',
       justifyContent: 'center', 
       marginLeft: 100, 
    
      

    }, 

    info:{
        fontFamily:'Helvetica Neue', 
        fontWeight: 500, 
        fontSize: 15, 
    },

    info1:{
        fontFamily:'Helvetica Neue', 
        fontWeight: '800', 
        fontSize: 15, 
    },

    flex:{
       

    }, 

    info3:{
        fontFamily:'Helvetica Neue', 
        fontSize: 15, 
        fontWeight:'300'
    },

    
})


export default Card