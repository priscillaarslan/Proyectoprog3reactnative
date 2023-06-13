import React, { Component } from 'react';
import { View, Text, TextInput,TouchableOpacity, StyleSheet} from 'react-native';  
import {auth, db} from '../firebase/config';


class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            contraseña:'',
            errores:''
            }
    }
    /*/componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate("Home")
            }
        })
    }/*/

    loguear(email,contraseña) {
        auth.signInWithEmailAndPassword(email, contraseña)
        .then(res => {
            this.setState({
                email: "",
                password: "",
                errores: "",
             
            })
            this.props.navigation.navigate("NavegadorLogueado")
               
        })
        .catch(error =>
            this.setState({
                errores: `Tienes un error: ${error.message}`
            })
        )
    }
    render(){
        return(
            <View style={styles.contenedor}>
             <TextInput  style={styles.texto}
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
              
             <Text>{this.state.errores}</Text>
           {
            this.state.email == '' || this.state.contraseña == '' ?
           < TouchableOpacity>
             <Text style={styles.texto3Desactivado}> Loguearme </Text>
           </TouchableOpacity >:
              <  TouchableOpacity  onPress={()=>this.loguear(this.state.email,this.state.contraseña)}> 
              <Text style={styles.texto3}> Loguearme </Text>
            </TouchableOpacity>
           }
<Text style={styles.texto4}  onPress={() => this.props.navigation.navigate("Registro")}> Registrate aca </Text>
         </View>
       
          
        )
    }
}


const styles = StyleSheet.create({
    
    contenedor:{
        backgroundColor: 'rgba(135, 206, 235, 0.5)',
        flex: 1,
        color: 'rgb(255,255,255)',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },


    texto:{
        fontWeight: 600,
        color: 'rgb(255,255,255)',
        fontSize: 24,
        textAlign: 'center', 
       
    },

    texto2:{
        fontWeight: 600,
        color: 'rgb(255,255,255)',
        fontSize: 24,
        textAlign: 'center', 
        marginTop: 10
    },
    texto3:{
        fontWeight: 600,
        color: 'rgb(255,255,255)',
        fontSize: 24,
        textAlign: 'center', 
        marginTop: 10
    },
    texto3Desactivado:{
        fontWeight: 100,
        color: 'rgba(255,255,255,0.6)',
        fontSize: 24,
        textAlign: 'center', 
        marginTop: 10
    },
    texto4:{
        fontWeight: 600,
        color: 'rgb(255,255,255)',
        fontSize: 24,
        textAlign: 'center', 
        marginTop: 10
    },

   
       
       
    
})


export default Login