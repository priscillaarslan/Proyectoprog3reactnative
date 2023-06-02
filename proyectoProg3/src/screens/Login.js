import React, { Component } from 'react';
import { View, Text, TextInput,TouchableOpacity} from 'react-native';  
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
              
             <Text>{this.state.errores}</Text>
           {
            this.state.email == '' || this.state.contraseña == '' ?
           < TouchableOpacity>
             <Text> Loguearme </Text>
           </TouchableOpacity>:
              <  TouchableOpacity onPress={()=>this.loguear(this.state.email,this.state.contraseña)}> 
              <Text> Loguearme </Text>
            </TouchableOpacity>
           }
<Text onPress={() => this.props.navigation.navigate("Registro")}> Registrate aca </Text>
         </View>
       
          
        )
    }
}



export default Login