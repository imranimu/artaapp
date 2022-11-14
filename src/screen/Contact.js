//import liraries
import React, {useEffect, useState} from 'react';
import {
    View,
    Image,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
    Text,    
    StatusBar
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Banner from "../assests/banner.jpeg";
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';


// create a component
const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const {height} = useWindowDimensions();

    const onSendMessagePressed = () => {
         console.warn('Send Message Clicked');
    };
    
    useEffect(() => {
        
        getData();

    });

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('restaurant_id')
          if(value !== null) {
            console.log(value);
          }
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
            />
            <View style={styles.root}>
                <Image
                source={Banner}
                style={[styles.logo, {height: height * 0.3}]} 
                />

                <Text style={styles.pageHeader}>Contact Us</Text>

                <Text style={styles.contactUs}>218A Brick Lane, London E1 6SA</Text>

                <Text style={[styles.contactUsLast, styles.contactUsLast]}> 07770 03 03 03 </Text>

                <CustomInput placeholder="Name" value={name} setValue={setName} />

                <CustomInput placeholder="Email" value={email} setValue={setEmail} />

                <CustomInput
                placeholder="Subject"
                value={subject}
                setValue={setSubject}
                />

                <CustomInput
                    placeholder="Message"
                    value={message}
                    setValue={setMessage}
                />

                <CustomButton text="Send Message" onPress={onSendMessagePressed} />
            </View>
            </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({

    root: {alignItems: 'center', padding: 0},

    logo: {width: '100%', maxWidth: 500, maxHeight: 200},

    pageHeader: {
        margin: 15,
        marginBottom: 5,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: "#222"
    },

    container: {
        width: '80%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'white',
        borderColor: '#BA762B',
        borderWidth: 1,        
    },

    text: {
        fontWeight: 'bold',
        color: '#BA762B',
    },

    contactUs: {
        margin: 5,
        marginBottom: 0,
        textAlign: 'center',
        fontSize: 15,
        color: "#222"
    },

    contactUsLast: {
        marginBottom: 15,
        color: "#222"
    },
});

//make this component available to the app
export default Contact;
