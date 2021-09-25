import React, { useState } from 'react'
import { KeyboardAvoidingView, KeyboardAvoidingViewBase, StatusBar, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button, TextInput } from 'react-native-paper'
import Axios from "axios";
import Snackbar from 'react-native-snackbar';
import validator from 'validator';


const signUpScreen = () => {
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')   

    const sendCred= () =>{ 
        console.log(email , password);
        try {
             fetch('http://645c-223-236-90-172.ngrok.io/signUp' , {
                 method :"POST",
                 headers :{
                    'Content-Type' : 'application/json'
                 },
                 body :JSON.stringify({
                     email :email,
                     password :password,
                 })
             })
            .then(res => res.json())
            .then(data =>{
                console.log(data);
            })
        }        
         catch (error) {
            console.log("SomeThing Went Wrong");
        }
    }
    return (
        <View>  
        <KeyboardAvoidingView behavior= "position"> 
            <StatusBar animated={true} backgroundColor="#23C4ED" barStyle="dark-content" />
            <Text style={styles.txt}>Pharma App</Text>
            <Text style={{fontSize:30 , fontWeight:"900", alignSelf:"center" , color:"#CAD5E2"}}>SignUp</Text>
            <TextInput
                mode="outlined"
                keyboardType="email-address"
                style={styles.txtBox}
                label="Email"
                theme={{colors:{primary:"#CAD5E2"}}}
                value={email}
                onChangeText={email => setemail(email)}
                />
            <TextInput
                mode="outlined"
                style={styles.txtBox}
                label="password"
                keyboardType="visible-password"
                value={password}
                theme={{colors:{primary:"#CAD5E2"}}}
                onChangeText={password => setPassword(password)}
            />
            {
                validator.isEmail(email) && validator.isStrongPassword(password , {minLength: 8}) ? 
                <Button style={styles.btn} 
                   color="#23C4ED" 
                   mode="contained" 
                   onPress={()=> sendCred()}
               >
                   Working
               </Button> 
               :
               <> 
               <Text style={{marginLeft:20 , marginBottom:20}}>password length must be minimum 8 char</Text>
                <Button style={styles.btn} 
                color="#23C4ED" 
                mode="contained" 
                onPress={()=> {
                    Snackbar.show({
                        text: 'Please Enter Both Field',
                        backgroundColor :"red",
                        duration: Snackbar.LENGTH_INDEFINITE,
                        action: {
                          text: 'OK',
                          textColor: 'white',
                          onPress: () => { /* Do something. */ },
                        },
                      });
                }
                }>Working</Button>
                </>
            }
               <TouchableOpacity style={styles.oldAcc}>
                <Text>Already Have An Account</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

export default signUpScreen

const styles = StyleSheet.create({
    txt :{
        fontSize:50 ,
        color:"#CAD5E2" ,
        padding :20 , 
        marginTop:150 , 
        alignSelf:"center", 
        fontWeight :"bold",
    },
    btn :{
        marginLeft:20,
        marginRight:20
    },
    txtBox :{
        padding:20,
        borderRadius:20
    },
    oldAcc : {
        padding:10,
        fontSize :50,
        alignSelf:"center",
        fontWeight:'900',

    }
})
