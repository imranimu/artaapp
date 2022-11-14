import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

const CustomInput = ({value, setValue, placeholder, secureTextEntry, icon = null, type='default'}) => {
    return (
        <View style={styles.container}>
            {icon ? <Icon style={styles.FormIcon} name={icon} size={18} color="#835941" /> : <></>}            
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                placeholderTextColor="#636363"  
                style={[icon ? styles.input : styles.inputBlank] }
                secureTextEntry={secureTextEntry}
                keyboardType={type}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent', 
        width: '90%',
        color: "red",
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 6,
        paddingVertical: 0,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {
        paddingLeft: 25, 
        paddingHorizontal: 0,  
        color: "#fff"      
    },
    inputBlank:{
        paddingLeft: 10,
        paddingHorizontal: 0,
        color: "#fff"     
    },
    FormIcon:{
        position: "absolute",
        top: 14,
        left: 10
    }
});

export default CustomInput;
