import React, { Component } from 'react';
import { View, Text, TextInput,TouchableOpacity, StyleSheet} from 'react-native';  
import {auth, db} from '../firebase/config';
import CameraRegistro from '../components/CameraRegistro';

class Registro extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            contraseña:'',
            nombre:'',
            biografia:'',
            foto:'',
            camara:false,
            errores:''
            }
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate("NavegadorLogueado")
            }
        })
    }
    registrar(email,contraseña,nombre,biografia,foto) {
        auth.createUserWithEmailAndPassword(email, contraseña)
        .then(res => {
            db.collection("users").add({
                email: email,
                nombre: nombre,
                biografia: biografia,
                createdAt: Date.now(),
                foto:foto
            })
                .then(() => {
                    this.setState({
                        email: "",
                        password: "",
                        user: "",
                        descripción: "",
                        errores: "",
                     
                    })
                    this.props.navigation.navigate("Login")
                })
                .catch(error => console.log(error))
        })
        .catch(error =>
            this.setState({
                errores: `Tienes un error: ${error.message}`
            })
        )
    }
    camera(){
        this.setState({
         camara:true
        })
      }
      onImageUpload(url) {
        this.setState({
            foto: url,
            camera: false
        })
    }
    render(){
        return(
            <View style={styles.contenedor}>
                   <Text style={styles.titulo} > REGISTRO </Text>
             <TextInput style={styles.texto} 
             placeholder='Email' 
             keyboardType='email-address'
             onChangeText={texto=>this.setState({email:texto})}
             value= {this.state.email}
             />
                  <TextInput style={styles.texto2}
             placeholder='Contraseña' 
             keyboardType='password'
             onChangeText={texto=>this.setState({contraseña:texto})}
             value= {this.state.contraseña}
             />
               <TextInput  style={styles.texto3}
             placeholder='Nombre' 
             keyboardType='default'
             onChangeText={texto=>this.setState({nombre:texto})}
             value= {this.state.nombre}
             />
               <TextInput style={styles.texto4}
             placeholder='Biografia' 
             keyboardType='default'
             onChangeText={texto=>this.setState({biografia:texto})}
             value= {this.state.biografia}
             />
                < TouchableOpacity onPress={()=>this.camera()}> 
             <Text style={styles.texto5}> Agregar foto al posteo </Text>
           </TouchableOpacity>
           {this.state.camara ? <CameraRegistro onImageUpload={(url) => this.onImageUpload(url)} /> : <Text></Text>}
             <Text>{this.state.errores}</Text>
           {
            this.state.email == '' || this.state.contraseña == ''|| this.state.nombre == '' ?
           < TouchableOpacity>
             <Text style={styles.texto6}> Registrarme </Text>
           </TouchableOpacity>:
              <  TouchableOpacity onPress={()=>this.registrar(this.state.email,this.state.contraseña,this.state.nombre,this.state.biografia,this.state.foto)}> 
              <Text style={styles.texto7}> Registrarme </Text>
            </TouchableOpacity>
           }
<Text style={styles.texto8} onPress={() => this.props.navigation.navigate("Login")}> Ya tienes cuenta. Anda al login</Text>
         </View>
       
        )
    }
}


const styles = StyleSheet.create({

contenedor:{
    backgroundColor: 'rgba(135, 206, 235, 0.5)',
    flex: 1,
    color: 'black',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
}, 
texto:{
    fontWeight: 600,
       color: 'black',
    fontSize: 24,
    textAlign: 'center', 
   
},

texto2:{
    fontWeight: 600,
    color: 'black',
    fontSize: 24,
    textAlign: 'center', 
    marginTop: 10
},
texto3:{
    fontWeight: 600,
    color: 'black',
    fontSize: 24,
    textAlign: 'center', 
    marginTop: 10
},
texto4:{
    fontWeight: 600,
    color: 'black',
    fontSize: 24,
    textAlign: 'center', 
    marginTop: 10
},

texto5:{
    fontWeight: 600,
    color: 'black',
    fontSize: 24,
    textAlign: 'center', 
    marginTop: 10
},
texto6:{
    fontWeight: 600,
    color: 'black',
    fontSize: 24,
    textAlign: 'center', 
    marginTop: 10
},

texto7:{
    fontWeight: 600,
    color: 'black',
    fontSize: 24,
    textAlign: 'center', 
    marginTop: 10
},


texto8:{
    fontWeight: 600,
    color: 'black',
    fontSize: 24,
    textAlign: 'center', 
    marginTop: 10
},

titulo:{
    fontWeight: 600,
    color: 'black',
    fontSize: 40,
    textAlign: 'center', 
    marginBottom: 50
}








})
export default Registro