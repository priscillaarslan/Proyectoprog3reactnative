import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Modal, LogBox } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import "firebase/firestore";



class Comment extends Component {
    constructor() {
        super()
        this.state = {
            escribiendoComentario: "",
            comentarios: []

        }

    }
    componentDidMount() {
        db.collection("posteos").doc(this.props.route.params.id).onSnapshot((docs) => {

            this.setState({
                comentarios: docs.data().Comentarios.sort((a, b) => a.createdAt - b.createdAt).reverse()

            })
        })
    }

    escribirComentario() {
        db.collection("posteos").doc(this.props.route.params.id).update({
            Comentarios: firebase.firestore.FieldValue.arrayUnion({
                autor: auth.currentUser.email,
                textoComentario: this.state.escribiendoComentario,
                createdAt: Date.now()
            })

        })
            .then(() => {
                this.setState({
                    escribiendoComentario: ""
                })
            })

    }






    render() {
        console.log(this.state.comentarios)
        console.log(this.props.route.params.id)

        return (
            <View style={styles.contenedor}>
                <Text style={styles.info}>Pagina de comentarios</Text>
                <Text style={styles.info1} onPress={() => this.props.navigation.navigate("Home")}>Volver al home</Text>
                <Text style={styles.info3}>Los comentarios a este posteo son :</Text>
                {
                    this.state.comentarios.length == 0 ? <View>
                        <Text style={styles.info2}>Aun no hay comentarios</Text>
                    </View>
                        :
                        <FlatList style={styles.info4} data={this.state.comentarios} keyExtractor={(data) => data.createdAt} renderItem={({ item }) => <Text>autor:{item.autor} texto del mensaje: {item.textoComentario}</Text>}
                        >
                        </FlatList>
                }


                <TextInput style={styles.info5}
                    placeholder='escribi un comentario'
                    keyboardType='default'
                    onChangeText={texto => this.setState({ escribiendoComentario: texto })}
                    value={this.state.escribiendoComentario}
                />

                {
                    this.state.escribiendoComentario == "" ?
                        < TouchableOpacity>
                            <Text style={styles.info6}> Escribir comentario </Text>
                        </TouchableOpacity> :
                        <  TouchableOpacity onPress={() => this.escribirComentario()}>
                            <Text style={styles.info7}> Escribir comentario </Text>
                        </TouchableOpacity>
                }
            </View>




        )
    }
}



const styles = StyleSheet.create({

    contenedor: {
        flex: 1,
        backgroundColor: 'rgba(135, 206, 235, 0.5)',
        color: 'rgb(255,255,255)',
        width: 500,
        marginLeft: 480,


    },


    info: {
        fontSize: 20,
        marginTop: 20,
        fontWeight: '600',
        marginLeft: 15,
    },


    info1: {
        fontSize: 15,
        marginTop: 20,
        fontWeight: '400',
        marginLeft: 15,
        borderWidth: 1,
        width: 150, 
        height: 40,
        backgroundColor: 'rgba(245, 245, 220, 0.5)'

    },


    info2: {
        fontSize: 15,
        marginTop: 20,
        fontWeight: '400',
        marginLeft: 15,
    },


    info3: {
        fontSize: 15,
        marginTop: 20,
        fontWeight: '400',
        marginLeft: 15,
    },


    info4: {
        fontSize: 15,
        marginTop: 20,
        fontWeight: '400',
        marginLeft: 15,
    },


    info5: {
        backgroundColor: 'rgb(210, 180, 140)',
        padding: 10,
        fontSize: 16,
        marginVertical: 10,
        fontColor: 'black',
        height: 50,
        bottom: 0,
        width:  '100%',
        borderRadius: 10, 

    },



    info6: {
        backgroundColor: 'rgb(210, 180, 140)',
        padding: 10,
        fontSize: 16,
        marginVertical: 10,
        fontColor: 'black',
        height: 50,
        bottom: 0,
        width:  '30%',
        borderRadius: 10, 
    },

    info7:{
        fontSize: 15,
        marginTop: 20, 
        fontWeight: '400',
        marginLeft: 15, 
      
            },


  





})




export default Comment