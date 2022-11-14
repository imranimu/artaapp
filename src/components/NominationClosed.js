import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, ImageBackground  } from 'react-native';

import Banner from "../assests/banner.jpeg";

import BgImage from "../assests/pattern.png"
 
const NominationClosed = () => {
    return (
        <ImageBackground source={BgImage} style={{width: '100%', height: '100%', backgroundColor: "#000"}}>
            <View style={styles.container}>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="light-content"
                /> 
                    <Image
                        source={Banner}
                        style={[styles.logo]} 
                    />

                    <Text style={{color: "#fff", fontSize: 20}}>Nomination Closed</Text>
            
            </View>
        </ImageBackground>
    );
}; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%', 
        top: 28,
        position: "absolute",
        maxWidth: 500, 
        maxHeight: 200, 
    },
});

export default NominationClosed;