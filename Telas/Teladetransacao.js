import React from "react";
import { Component } from "react";
import { View,TouchableOpacity,StyleSheet,Text } from "react-native";
import *as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";

export default class Transacao extends Component{

constructor(props){
    super(props)
    this.state={
        //(estado do modo) => Isso dirá se o aplicativo está no modo digitalizar ou no modo digitalizado.
        domState:"normal",
        //Permisoes para usar a camera 
        hasCameraPermissions:null,
        //se for escaneado ou não 
        scanned:false,
        //Isso manterá os dados digitalizados que obtemos após digitalizar
        scannedData:"",
    }
}

PermissionsCamera=async domState=>{
    const{status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
        hasCameraPermissions:status=="granted",
        domState:domState,
        scanned:false,
    })
}

Scannear = async ({type,data})=>{
    this.setState({
        scannedData:data,
        domState:"normal",
        scanned:true
    })
}

render(){
    const{domState, PermissionsCamera, scannedData, scanned} = this.state
    if(domState == "scanner"){
        return(
            <BarCodeScanner
            onBarCodeScanned={scanned? undefined:this.Scannear}

            style={StyleSheet.absoluteFillObject}
            >

            </BarCodeScanner>
        )
    }
 return(
    <View style={Style.fundo}>
         <Text style={Style.texto}>
            {PermissionsCamera?scannedData:"Solicitar permisão da câmera"}
        </Text>
        <TouchableOpacity style={Style.botao} onPress={()=>this.PermissionsCamera("scanner")}>
        <Text>
            Digitalizar QR Code
        </Text>
        </TouchableOpacity>   
    </View>

 )

}

}

const Style = StyleSheet.create({
    fundo: {
       flex:1,
       justifyContent:"center",
       alignItems:"center",
       backgroundColor:"blue"
   
    },
    botao:{
        width:"43%",
        height:55,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15,
        backgroundColor:"white"
        
    },
    texto:{
        color:"white"
    }
   });