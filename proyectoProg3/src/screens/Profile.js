import React, { Component } from 'react';
import { View, Text, FlatList,TouchableOpacity,StyleSheet,Image} from 'react-native'; 
import {auth, db} from '../firebase/config';
import Card from '../components/Card';



class Profile extends Component {
    constructor() {
        super()
        this.state = {
        post:[],
        usuario: [], 
        borrar: false,
        errorAlEliminar:false,
            }

    }
    componentDidMount(){ 
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
            usuario: user
        })
        }
    )
    db.collection("posteos").where('Usuario','==', auth.currentUser.email).onSnapshot((docs) => {  /*/ el onsnapchot es para que agarre lo que haya (captura la coleccion de posteos), el docs tiene todos los posteos/*/
    let posteos = []
    console.log(docs)
    docs.forEach(doc=>{  /*/ docs es un array entonces le hago un for each para recorrerlo y hacer algo por cada elemento, docs adentro tiene e cada uno de los elementos del doc/*/
        posteos.push({
            id:doc.id,
            data:doc.data() /*/ dentro de data va la info del posteo/*/
        })
    });
    this.setState({
        post:posteos
    })
    })
       
    }
    eliminarPerfil(){
        auth.currentUser.delete()
        .then(()=> {
            db.collection('users').doc(this.state.usuario.id).delete()
        })
        .then(()=> {
            this.props.navigation.navigate('Registro')
        })
        .catch((error)=>{
            console.log(error);
            this.setState({
                errorAlEliminar: true
            })
        })
    }



    deslogueate() {
        auth.signOut()
        this.props.navigation.navigate('Login')
    }

  
    render(){
        console.log(this.state.usuario)
        return(
            <View>
                <Text>Soy la pagina del Perfil</Text>
                {
                    this.state.usuario[0]?.data.foto == ""? <Text></Text>:
                    <Image  style={styles.imagen} source={{uri:`${this.state.usuario[0]?.data.foto}`}}  resizeMode='contain'      />
                }
                <Text>Bienvenido {this.state.usuario[0]?.data.email} tambien conocido como {this.state.usuario[0]?.data.nombre}</Text>
                <Text>Biografia: {this.state.usuario[0]?.data.biografia} </Text>
                <Text>Cantidad total de posteos:{this.state.post?.length} </Text>
                <Text>Estos son tus posteos : </Text>
                {this.state.post?.length==0?<Text>Aun no hay posteos, subi alguno</Text>:  <FlatList data={this.state.post} keyExtractor={(data)=>data.id} renderItem={({item})=>< Card data={item}{...this.props}/>}
                >
                    
                </FlatList> }
              
                
               
                <Text style={styles.btnDeslogueo} onPress={() => this.deslogueate()}> Deslogueate </Text>
                <TouchableOpacity onPress={() => this.setState({ borrar: true })}> <Text> Eliminar perfil </Text> </TouchableOpacity>
                    {this.state.borrar == false ? <Text> </Text> : <> <Text> Estas seguro que quieres eliminar el perfil, es permanente!</Text>
                        <TouchableOpacity onPress={() => this.eliminarPerfil()}> <Text> Si eliminar </Text> </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ borrar: false })}> <Text> No eliminar </Text> </TouchableOpacity> </>}

                    
                    {this.state.errorAlEliminar == false ? <Text> </Text> :  <Text> Esta es una operación sensible, volvé a iniciar sesión para eliminar tu perfil</Text>}
         </View>
       
          
        )
    }
} 
const styles = StyleSheet.create({
    
    imagen:{
        width:"100%",
        height:250,
        alignContent:"center",
        marginVertical:10,
    },
    btnDeslogueo: {
        backgroundColor: "brown",
        height: 100,
        width: 100,

    }
})



export default Profile