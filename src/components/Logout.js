import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const onPressLearnMore = (navigation) =>{     

    AsyncStorage.setItem('restaurant_id', '');    

    navigation.navigate('Login');      
}

const Logout = ({navigation}) => {
    return (        
        <View style={styles.Refresh}>
            <TouchableOpacity onPress={() => {onPressLearnMore(navigation)}} style={styles.LoginButton}>
                <Text style={styles.ButtonText}><Icon style={styles.FormIcon} name="poweroff" size={20} color="#fff" /></Text>
            </TouchableOpacity>        
        </View>
    );
};

const styles = StyleSheet.create({
    LoginButton: {      
        backgroundColor: 'rgba(131, 89, 65, 0.5)',
        borderBottomLeftRadius: 15,
        borderTopLeftRadius: 15
    },
    ButtonText:{
        color: "#fff", 
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    Refresh:{        
        position: "absolute", 
        top: 50, 
        right: 0,
        zIndex: 2,
    }

});

export default Logout;
