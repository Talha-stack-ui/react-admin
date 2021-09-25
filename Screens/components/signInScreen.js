import React, { useState } from 'react'
import { KeyboardAvoidingView, KeyboardAvoidingViewBase, StatusBar, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Button, TextInput } from 'react-native-paper'

const signInScreen = () => {
    const [email, setemail] = useState()
    const [password, setPassword] = useState()
    return (
        <View>  
        <KeyboardAvoidingView behavior= "position"> 
            <StatusBar animated={true} backgroundColor="#23C4ED" barStyle="dark-content" />
            <Text style={styles.txt}>Pharma App</Text>
            <Text style={{fontSize:30 , fontWeight:"900", alignSelf:"center" , color:"#CAD5E2"}}>SignIn</Text>
            <TextInput
                mode="outlined"
                style={styles.txtBox}
                label="Email"
                value={email}
                theme={{colors:{primary:"#CAD5E2"}}}
                onChangeText={email => setemail(email)}
            />
            <TextInput
                mode="outlined"
                style={styles.txtBox}
                label="password"
                value={password}
                theme={{colors:{primary:"#CAD5E2"}}}
                onChangeText={text => setPassword(text)}
            />
             <Button style={styles.btn} 
                color="#23C4ED" 
                mode="contained" 
                onPress={() => console.log('Pressed')}
            >
                Working
            </Button> 
            <TouchableOpacity style={styles.newAcc}>
                <Text>Create An Accout</Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

export default signInScreen

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
    newAcc : {
        padding:10,
        fontSize :20,
        alignSelf:"center",
    }
})
