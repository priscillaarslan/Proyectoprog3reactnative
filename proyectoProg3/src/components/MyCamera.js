import { Text, View, StyleSheet, Image,TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { Camera } from 'expo-camera'

import { storage } from '../firebase/config'


class myCamera extends Component {
    constructor(props) {
        super(props)
        this.metodosCamara = null
        this.state = {
            mostrarCamara: false,
            fotoUri: ''
        }
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(() => {
                this.setState({
                    mostrarCamara: true
                })
            })
            .catch(err => console.log(err))
    }
 tomarFoto() {
        this.metodosCamara.takePictureAsync()
            .then(foto => this.setState({
                fotoUri: foto.uri,
                mostrarCamara: false
            }))
            .catch(err => console.log(err))
    }

    aceptarImagen() {
        fetch(this.state.fotoUri)
            .then(imagenEnBinario => imagenEnBinario.blob())
            .then(imagen => {
                const ref = storage.ref(`fotos/${Date.now()}.jpg`)
                ref.put(imagen)
                    .then(() => {
                        ref.getDownloadURL()
                            .then((url) => this.props.onImageUpload(url))
                            .catch(err => console.log(err))
                    })

            })
            .catch(err => console.log(err))
    }

    rechazarImagen() {
        this.setState({ mostrarCamara: true })
    } 
    
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.mostrarCamara ?
                        <>
                            <Camera
                                style={styles.camarabody}
                                type={Camera.Constants.Type.back}
                                ref={metodos => this.metodosCamara = metodos}
                            />
                            <TouchableOpacity onPress={() => this.tomarFoto()}>
                                <Text>Tomar foto</Text>
                            </TouchableOpacity>
                        </>
                        : this.state.mostrarCamara === false && this.state.fotoUri != '' ?
                            <View>
                                <Image
                                    source={{ uri: this.state.fotoUri }}
                                    style={styles.image}
                                />
                                <TouchableOpacity onPress={() => this.aceptarImagen()}>
                                    <Text>
                                        Aceptar imagen
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.rechazarImagen()}>
                                    <Text>
                                        Rechazar imagen
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            : <Text>No me has dado permisos para mostrar la foto</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cuerpoImagen: {
        height: '80vh',
        width: '80vw',
    },
    boton: {
        fontSize: 14,
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'rgb(234,252,255)',
        fontFamily: 'Courier',
        textAlign: 'center',
        padding: 5
    },
    preview:
    {
        height: '80vh',
        width: '80vw',
    },
    container: {
        flex: 1
    },
    camarabody: {
        height: 500
    },
    image: {
        height: 200
    }

}) 

export default myCamera