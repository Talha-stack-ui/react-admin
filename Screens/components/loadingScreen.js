import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const loadingScreen = () => {
    return (
        <ActivityIndicator size="large" color="#5DA3FA" style={styles.load}/>            
    )
}

export default loadingScreen

const styles = StyleSheet.create({
    load :{
        flex:1,
        alignSelf:"center" , 
        justifyContent:"center"
    }
})
