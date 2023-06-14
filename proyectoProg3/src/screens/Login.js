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
        flex: 1,
        backgroundColor: 'rgba(135, 206, 235, 0.5)',
        color: 'rgb(255,255,255)',
        width: 500, 
        marginLeft: 480
     
    },


    texto:{
        backgroundColor: 'white',
        padding: 10,
        fontSize: 16,
        marginVertical: 10,
        fontColor: 'black',
        height: 50,
        bottom: 0,
        width:  '80%',
        borderRadius: 10, 
        marginLeft: 40, 
        marginTop: 200, 


       
    },

    texto2:{
        backgroundColor: 'white',
        padding: 10,
        fontSize: 16,
        marginVertical: 10,
        fontColor: 'black',
        height: 50,
        bottom: 0,
        width:  '80%',
        borderRadius: 10, 
        marginLeft: 40, 
        marginTop: 20, 
    },
    texto3:{
        fontWeight: 600,
        color: 'black',
        fontSize: 24,
        textAlign: 'center', 
        marginTop: 10
    },
    texto3Desactivado:{
        fontWeight: 600,
        color: 'black',
        fontSize: 24,
        textAlign: 'center', 
        marginTop: 10,
        borderWidth: 2, 
        width: 300, 
        marginLeft:90, 
    },
    texto4:{
        fontWeight: 600,
        color: 'black',
        fontSize: 24,
        textAlign: 'center', 
        marginTop: 10,
        borderWidth: 2, 
        width: 300, 
        marginLeft:90, 
    },

   
       
       
    
})


export default Login