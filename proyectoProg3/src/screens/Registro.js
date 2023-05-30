import React, { Component } from 'react';
import { View, Text, TextInput,TouchableOpacity} from 'react-native';  
import {auth, db} from '../firebase/config';

class Registro extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            contraseña:'',
            nombre:'',
            biografia:'',
            foto:'',
            }
    }
    registrar(emial,contraseña,nombre,biografia) {
        auth.createUserWithEmailAndPassword(email, pass)
        .then(res => {
            db.collection("users").add({
                email: email,
                nombre: nombre,
                biografia: biografia,
                createdAt: Date.now(),
                
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
                errors: `Tienes un error: ${error.message}`
            })
        )
    }
    render(){
        return(
            <View>
             <TextInput 
             placeholder='email' 
             keyboardType='email-address'
             onChangeText={texto=>this.setState({email:texto})}
             value= {this.state.email}
             />
                  <TextInput 
             placeholder='contraseña' 
             keyboardType='password'
             onChangeText={texto=>this.setState({contraseña:texto})}
             value= {this.state.contraseña}
             />
               <TextInput 
             placeholder='nombre' 
             keyboardType='default'
             onChangeText={texto=>this.setState({nombre:texto})}
             value= {this.state.nombre}
             />
               <TextInput 
             placeholder='biografia' 
             keyboardType='default'
             onChangeText={texto=>this.setState({biografia:texto})}
             value= {this.state.biografia}
             />
           {
            this.state.email == '' || this.state.contraseña == ''|| this.state.nombre == '' ?
           < TouchableOpacity>
             <Text> Registrarme </Text>
           </TouchableOpacity>:
              <  TouchableOpacity onPress={()=>this.registrar(this.state.email,this.state.contraseña,this.state.nombre,this.state.biografia)}> 
              <Text> Registrarme </Text>
            </TouchableOpacity>
           }

         </View>
       
        )
    }
}
export default Registro