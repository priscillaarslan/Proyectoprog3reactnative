import React, { Component } from 'react';
import { View, Text, TextInput,TouchableOpacity, StyleSheet, ScrollView} from 'react-native';  
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
          
          <View style={styles.view1}>
            <View style={styles.contenedor}>
                <Text style={styles.title}>Crear posteo</Text> <br></br>
            
            
             <TextInput style={styles.text1}  
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
         
              <View style={styles.camara}>
           {this.state.camara ? <MyCamera onImageUpload={(url) => this.onImageUpload(url)}  /> : <Text></Text>}
             <Text style={styles.text3}>{this.state.errores}</Text>
             </View>
             
           {
            this.state.Titulo == '' || this.state.Descripcion == ''  ?
           < TouchableOpacity>
             <Text style={styles.text4}> Crear posteo </Text>
           </TouchableOpacity  >:
              <  TouchableOpacity onPress={()=>this.CrearPosteo(this.state.Titulo,this.state.Descripcion)}> 
              <Text style={styles.text5}> Crear posteo </Text>
            </TouchableOpacity>
           

            
           }
            </View>
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
    marginLeft: 480,
      

  },

  camara:{
    marginLeft: 20, 
    
  },

  title:{
    fontSize: 22,
    fontWeight: '600',
    FontFamily:'Helvetica Neue', 
    marginTop: 20, 
    marginLeft: 20, 

  },





  text1:{
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    textAlign: 'right',
    FontFamily:'Helvetica Neue', 


  },


  text2:{
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    textAlign: 'right',
    FontFamily:'Helvetica Neue', 


  },


  text3:{
    FontSize: 22,
    fontWeight: '400',
    FontFamily:'Helvetica Neue', 
    marginLeft: 20, 
  


  },

  text4:{
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    textAlign: 'right',
    FontFamily:'Helvetica Neue', 
    width: 150, 
    backgroundColor: 'rgba(245, 245, 220, 0.5)',
   



  },
 

  text5:{
    fontSize: 22,
    fontWeight: '400',
    FontFamily:'Helvetica Neue', 
    marginLeft: 20, 
    

  },

  boton:{
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    textAlign: 'right' 
  },

  view1:{
  flex:1,
  
   overflow:'scroll'

  },



  

})
export default Addpost


