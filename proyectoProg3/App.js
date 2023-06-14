import Navegador from "./src/components/Navegador" 
import {StyleSheet, View} from 'react-native'; 


export default function App() {
  return (

 <View style={styles.contenedor}>
    <Navegador /> 
    </View>

  );
}


const styles = StyleSheet.create({
  contenedor:{
      width:550, 
      justifyContent: 'center', 
      marginLeft: 500, 
      marginTop: 50, 
      marginBottom: 50, 
      borderWidth: 2, 
      borderColor: 'red',
   
  
  }, 

 
  
  })


