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
    registrar(email,contraseña,nombre,biografia) {
        auth.createUserWithEmailAndPassword(email, contraseña)
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
                errores: `Tienes un error: ${error.message}`
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
             <Text>{this.state.errores}</Text>
           {
            this.state.email == '' || this.state.contraseña == ''|| this.state.nombre == '' ?
           < TouchableOpacity>
             <Text> Registrarme </Text>
           </TouchableOpacity>:
              <  TouchableOpacity onPress={()=>this.registrar(this.state.email,this.state.contraseña,this.state.nombre,this.state.biografia)}> 
              <Text> Registrarme </Text>
            </TouchableOpacity>
           }
<Text onPress={() => this.props.navigation.navigate("Login")}> Ya tienes cuenta. Anda al login</Text>
         </View>
       
        )
    }
}
export default Registro