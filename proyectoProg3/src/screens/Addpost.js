import React, { Component } from 'react';
import { View, Text, TextInput,TouchableOpacity, StyleSheet} from 'react-native';  
import {auth, db} from '../firebase/config';
import MyCamera from '../components/MyCamera';

class Addpost extends Component {
    constructor() {
        super()
        this.state = {
            Titulo:'',
            Descripcion:'',
            Foto:'',
            errores:'',
            camara:false
            }
    }
    
    CrearPosteo(){
        db.collection('posteos').add({  /*/.add, para agregar en firebase, es propio de firebase/*/
      Usuario: auth.currentUser.email,
      Titulo: this.state.Titulo, 
      Descripcion: this.state.Descripcion,
      Likes:[],
      Comentarios:[],
      Foto: this.state.Foto,
      CreatedAt: Date.now(),
        }) .then(()=>{
          this.props.navigation.navigate('Home')
        })
        .catch(error =>
          this.setState({
              errores: `Tienes un error: ${error.message}`
          })
      )
        /*/ db hace referencia a la base de datos y collection hace referencia a las colecciones a la base de datos/*/
    } 
    camera(){
      this.setState({
       camara:true
      })
    }
    onImageUpload(url) {
      this.setState({
          Foto: url,
          camara: false
      })
  }
 
    render(){
        return(
            <View style={styles.contenedor}>
                <Text style={styles.title}>Crear posteo</Text>
             <TextInput  style={styles.text1}
             placeholder='Titulo' 
             keyboardType='default'
             onChangeText={texto=>this.setState({Titulo:texto})}
             value= {this.state.Titulo}
             />
                  <TextInput  style={styles.text2}
             placeholder='Descripcion' 
             keyboardType='default'
             onChangeText={texto=>this.setState({Descripcion:texto})}
             value= {this.state.Descripcion}
             />
            {this.state.Foto==''? < TouchableOpacity  style={styles.boton} onPress={()=>this.camera()}> 
             <Text style={styles.text3}> Agregar foto al posteo </Text>
           </TouchableOpacity> : <Text>Muchas gracias por tu foto</Text>}
             
              
           {this.state.camara ? <MyCamera onImageUpload={(url) => this.onImageUpload(url)} /> : <Text></Text>}
             <Text style={styles.text3}>{this.state.errores}</Text>
             
           {
            this.state.Titulo == '' || this.state.Descripcion == ''  ?
           < TouchableOpacity>
             <Text style={styles.text4}> Crear posteo </Text>
           </TouchableOpacity>:
              <  TouchableOpacity onPress={()=>this.CrearPosteo(this.state.Titulo,this.state.Descripcion)}> 
              <Text style={styles.text5}> Crear posteo </Text>
            </TouchableOpacity>

            
           }
         </View>
       
        )
    }

}



const styles = StyleSheet.create({
  contenedor:{
    backgroundColor: 'rgba(135, 206, 235, 0.5)',
    flex:1,
      color: 'rgb(255,255,255)',
      padding: 15,
      justifyContent: 'center',
  },

  title:{
    fontSize: 22,
    fontWeight: '600'

  },

  text1:{
    fontSize: 22,
    fontWeight: '600'

  },


  text2:{
    fontSize: 22,
    fontWeight: '600'

  },


  text3:{
    fontSize: 22,
    fontWeight: '600'

  },

  text4:{
    fontSize: 22,
    fontWeight: '600'

  },
 

  text5:{
    fontSize: 22,
    fontWeight: '600'

  },

  boton:{
    border: 'solid',
    borderWidth: 1,
    borderColor: 'rgb(150,150,150)',
    borderLeftColor: 'white',
    borderTopColor: 'white',
    borderRightColor: 'white',
    borderBottomColor: 'white',
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderStyle: 'solid',
    padding: 7.5,
    width: '30%',
  },

  
  

})
export default Addpost


