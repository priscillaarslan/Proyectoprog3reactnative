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
         db.collection('users').doc(this.state.usuario[0].id).delete()
      .then(()=>{
        auth.currentUser.delete()
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
            <View style={styles.perfil} >
        
                <Text style={styles.texto}>Soy la pagina del Perfil</Text>
                {
                    this.state.usuario[0]?.data.foto == ""? <Text></Text>:
                    <Image  style={styles.imagen} source={{uri:`${this.state.usuario[0]?.data.foto}`}}  resizeMode='contain'      />
                }
                <Text style={styles.bienvenido}>Bienvenido {this.state.usuario[0]?.data.email} tambien conocido como {this.state.usuario[0]?.data.nombre}</Text>
                <Text style={styles.biografia}><text style={styles.biografia2}>Biografia:</text>{this.state.usuario[0]?.data.biografia}<br></br><text style={styles.biografia2}>Total de posteos:</text> {this.state.post?.length} <br></br><text style={styles.biografia2}>Estos son tus posteos:</text> </Text>
                {this.state.post?.length==0?<Text>Aun no hay posteos, subi alguno</Text>:  <FlatList data={this.state.post} keyExtractor={(data)=>data.id} renderItem={({item})=>< Card data={item}{...this.props}/>}
                >
                    
                </FlatList> }
              
                
               <View style={styles.view1} >
              <Text onPress={() => this.deslogueate()}> <text style={styles.textoinfo}>Deslogueate</text> </Text>
                <Text style={styles.textoinfo}  onPress={() => this.props.navigation.navigate("ModificarPerfil")}> Editar Perfil </Text>

                <TouchableOpacity onPress={() => this.setState({ borrar: true })}> <Text style={styles.textoinfo}> Eliminar perfil </Text> </TouchableOpacity>
                    {this.state.borrar == false ? <Text> </Text> : <> <Text> Estas seguro que quieres eliminar el perfil, es permanente!</Text>
                        <TouchableOpacity onPress={() => this.eliminarPerfil()}> <Text> Si eliminar </Text> </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ borrar: false })}> <Text> No eliminar </Text> </TouchableOpacity> </>}
                        </View>
                    
                    {this.state.errorAlEliminar == false ? <Text> </Text> :  <Text> Esta es una operación sensible, volvé a iniciar sesión para eliminar tu perfil</Text>}
                    </View>
      
          
        )
    }
} 
const styles = StyleSheet.create({
    
    perfil:{
        flex: 1,
        backgroundColor: 'rgba(135, 206, 235, 0.5)',
        color: 'rgb(255,255,255)',
        width: 500, 
        marginLeft: 480
    }, 

    imagen:{
        width: 100,
        height: 100,

    },




   
    bienvenido:{
        fontSize: 15,
       alignContent: 'center',
        fontWeight: "bold",
        color: 'black',
        marginTop: 20,
        fontWeight: '400',
        fontFamily: 'Helvetica Neue',
       
       
         },

   

    biografia:{
     
       
        fontFamily: 'Helvetica Neue',
    }, 

    texto:{
        color: 'black',
        marginTop: 20,
        fontSize: 25, 
        fontWeight: 'lighter',
        fontFamily: 'billabong',
    }, 

  
    biografia2:{
        fontWeight: 'bold',
        fontFamily: 'Helvetica Neue',
    }, 

    info:{
        fontWeight: '400',
        fontFamily: 'Helvetica Neue',
    }, 

    
    
    textoinfo:{
        fontSize: 15, 
        fontFamily:'Helvetica Neue', 
        fontWeight: '700', 
        marginTop: 5, 


    },
    view1:{
        height: 60, 
        marginTop: 10,
       
        
    },
    
    

    



})



export default Profile