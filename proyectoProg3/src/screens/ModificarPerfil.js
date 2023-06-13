import React, { Component } from 'react';
import { View, Text, TextInput,TouchableOpacity, StyleSheet} from 'react-native';  
import {auth, db} from '../firebase/config';
import firebase from 'firebase';
import "firebase/firestore";

class ModificarPerfil extends Component {
    constructor() {
        super()
        this.state = {
            usuario:[],
            contraseña:'',
            errorAlEditar:false,
          errores:''
            }
    }
    componentDidMount() {
       
        db.collection('users').where('email','==', auth.currentUser.email).onSnapshot(
            (docs)=>{
            let user =[]
            docs.forEach((doc)=>{
                user.push({
                    id:doc.id, 
                    data:doc.data(), 
                })
            })
            this.setState({
             usuario:user,
             nombre:user[0].data.nombre,
             biografia:user[0].data.biografia
            })
            }
        )
    }
    actualizar(contraseña,nombre,biografia) {
      if ( contraseña=='') {
        db.collection('users').doc(this.state.usuario[0].id).update({
            nombre: nombre,
            biografia:biografia
        }) .then(()=>{
            this.props.navigation.navigate("Profile")
        })
      } else {
        firebase.auth().currentUser.updatePassword(contraseña)
        .then(()=>{
            db.collection('users').doc(this.state.usuario[0].id).update({
                nombre: nombre,
                biografia:biografia
            }) .then(()=>{
                this.props.navigation.navigate("Login")



            }) 
            .catch((error)=>{
                console.log(error);
                this.setState({
                    errorAlEditar: true
                })  
        })
    })
      }
    }
   
    render(){
        console.log(this.state.usuario);
        return(
            <View style={styles.contenedor}>
                   <Text style={styles.titulo} > Editar Perfil </Text>
            <Text>Si no introducis una nueva contraseña, se mantedra la anterior</Text>
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
             value= {this.state?.nombre}
             />
               <TextInput style={styles.texto4}
             placeholder='Biografia' 
             keyboardType='default'
             onChangeText={texto=>this.setState({biografia:texto})}
             value= {this.state?.biografia}
             />
               
        
              <  TouchableOpacity onPress={()=>this.actualizar(this.state.contraseña,this.state.nombre,this.state.biografia)}> 
              <Text style={styles.texto7}> Editar Perfil </Text>
            </TouchableOpacity>
            {this.state.errorAlEliminar == false ? <Text> </Text> :  <Text> Esta es una operación sensible, volvé a iniciar sesión para eliminar tu perfil</Text>}
           
<Text style={styles.texto8} onPress={() => this.props.navigation.navigate("Profile")}> Volve al perfil</Text>
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
    fontWeight: 100,
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
export default ModificarPerfil