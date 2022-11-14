/*
import React, { Component } from 'react';
import {  
  StyleSheet,
  Image,
  View,
  Dimensions
} from 'react-native';


export default class SplashScreen extends Component {
  render() {
    return (
        <View style={styles.container}>
            <Image
                source={
                __DEV__
                    ? require('../assests/screen.png')
                    : require('../assests/screen.png')
                }
                style={styles.LogoImage}
            />
        </View>
    );
  }
}

const height = Dimensions.get('window').height;

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    height: height, 
    width: width 
  },
  LogoImage:{
      width: 150,
      height: 190
  }

});

*/

import React, {useState, useEffect} from 'react';

import {
    View,    
    StyleSheet,
    ImageBackground,
    ActivityIndicator, 
    StatusBar
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function Splash({navigation}) {        
    const [loading, setLoading] = useState(true);  

    useEffect(() => {
        getData();
    }, []);
   
    const getData = async () => {
        try {            
            const value = await AsyncStorage.getItem('restaurant_id'); 
            if(value !== null) {
                setTimeout(() => {                
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'Tabcontainer'}],
                    });
                }, 3000); 
            }else{
                setTimeout(() => {                
                    navigation.reset({
                        index: 0,
                        routes: [{name: 'Login'}],
                    });
                }, 3000);
            } 
        } catch(e) {
            console.log(e);
        }
    } 

    return (
        <View style={styles.container}> 
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <ImageBackground
                source={require('../assests/splash.png')}
                style={styles.image}>
                {loading && (
                    <ActivityIndicator
                    size="large"
                    color="#fff"
                    style={{justifyContent: 'center'}}
                    />
                )}
            </ImageBackground>      
        </View>
    );
}

const styles = StyleSheet.create({
    container:{ 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: "100%",
        resizeMode: 'cover',
        justifyContent: 'center',
    },
}); 
