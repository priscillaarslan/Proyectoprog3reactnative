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
      width:'100%', 
      justifyContent: 'center', 

   
  
  }, 

 
  
  })


