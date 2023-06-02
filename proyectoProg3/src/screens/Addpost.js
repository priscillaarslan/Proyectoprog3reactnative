import React, { Component } from 'react';
import { View, Text, TextInput,TouchableOpacity} from 'react-native';  
import {auth, db} from '../firebase/config';

class Addpost extends Component {
    constructor() {
        super()
        this.state = {
            Titulo:'',
            Descripcion:'',
            Foto:'',
            errores:'',
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
 
    render(){
        return(
            <View>
                <Text>Crear posteo</Text>
             <TextInput 
             placeholder='Titulo' 
             keyboardType='default'
             onChangeText={texto=>this.setState({Titulo:texto})}
             value= {this.state.Titulo}
             />
                  <TextInput 
             placeholder='Descripcion' 
             keyboardType='default'
             onChangeText={texto=>this.setState({Descripcion:texto})}
             value= {this.state.Descripcion}
             />
               < TouchableOpacity>
             <Text> Agregar foto al posteo </Text>
           </TouchableOpacity>
             <Text>{this.state.errores}</Text>
           {
            this.state.Titulo == '' || this.state.Descripcion == ''  ?
           < TouchableOpacity>
             <Text> Crear posteo </Text>
           </TouchableOpacity>:
              <  TouchableOpacity onPress={()=>this.CrearPosteo(this.state.Titulo,this.state.Descripcion)}> 
              <Text> Crear posteo </Text>
            </TouchableOpacity>
           }
         </View>
       
        )
    }
}
export default Addpost


