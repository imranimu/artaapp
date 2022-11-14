import React, {useState, useEffect} from 'react';

import qs from 'qs';

import * as axios from 'axios';

import {
    View,
    Image,
    StyleSheet,
    useWindowDimensions,
    Dimensions,
    ScrollView,
    Text, 
    ActivityIndicator,    
    StatusBar
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Banner from "../assests/banner.jpeg";
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({navigation}) => {
    const [restaurant_id, setRestaurant_id] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');

    const [remainingSeconds, setRemainingSeconds] = useState('');
    const [remainingMinutes, setRemainingMinutes] = useState('');
    const [remainingHours, setRemainingHours] = useState('');
    const [remainingDays, setRemainingDays] = useState('');

    const {height} = useWindowDimensions();

    const artaLaunchTime = 'October 02, 2022 18:30:00';

    const countDownDate = new Date(artaLaunchTime).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime(),
    );  

    /*useEffect(() => {        
        getData();
    }, [restaurant_id]);

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('restaurant_id')
          if(value !== null) {
            console.log(value);

            setRestaurant_id(value);

            navigation.navigate('Tabcontainer');
          } 
        } catch(e) {
            console.log(e);
        }
    }*/
    
    useEffect(() => {
        const interval = setInterval(() => {
          setCountDown(countDownDate - new Date().getTime());
          getReturnValues(countDown);
        }, 1000);
    
        return () => clearInterval(interval);
    }, [countDownDate, countDown]);

    const getReturnValues = countDownParam => {
        const days = Math.floor(countDownParam / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (countDownParam % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (countDownParam % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((countDownParam % (1000 * 60)) / 1000);
    
        setRemainingSeconds(seconds);
        setRemainingMinutes(minutes);
        setRemainingHours(hours);
        setRemainingDays(days);
    
        return [days, hours, minutes, seconds];
    };

    const onSignInPressed = async () => {     
        
        const { navigate } = navigation;

        if(username && password ){  
            setLoader(true);            
            let data = {
                username: username,
                password: password
            };  
            const url = 'https://www.artauk.com/mobile-login-validate';    
            await axios.post(url, qs.stringify(data), {
                headers: {                    
                    'Content-Type': 'application/x-www-form-urlencoded',
                } 
            }).then(res => {        
                if(res.data.status){                    
                    AsyncStorage.setItem('restaurant_id', res.data.restaurant_id);

                    navigate('Tabcontainer');

                    setError('');
                }else{
                    setError(res.data.text);  
                }                               
                setLoader(false);    
            }).catch(error => {                  
                setError('Email or Password is incorrect');                           
                setLoader(false);                  
                console.log( error );    
            });    
        }else{                              
            setError('All Fields are required.');    
        }
    };

    const onContactUsPressed = () => {         
        navigation.navigate('Contact');        
    };

    return (        
        <ScrollView showsVerticalScrollIndicator={false}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
            />
            <View style={styles.root}>
                <Image
                    source={Banner}
                    style={[styles.logo, {height: height * 0.3}]} 
                />
                <Text style={styles.pageHeader}>Countdown to Grand Finale</Text> 

                <View style={styles.countDownRowContainer}>
                    <View style={styles.circle}>
                        <Text style={styles.circleTextCount}>{remainingDays}</Text>
                        <Text style={styles.circleText}>Days</Text>
                    </View>

                    <View style={styles.circle}>
                        <Text style={styles.circleTextCount}>{remainingHours}</Text>
                        <Text style={styles.circleText}>Hours</Text>
                    </View>

                    <View style={styles.circle}>
                        <Text style={styles.circleTextCount}>{remainingMinutes}</Text>
                        <Text style={styles.circleText}>Minutes</Text>
                    </View>

                    <View style={styles.circle}>
                        <Text style={styles.circleTextCount}>{remainingSeconds}</Text>
                        <Text style={styles.circleText}>Seconds</Text>
                    </View>
                </View>

                <CustomInput 
                    placeholder="Email" 
                    value={username} 
                    setValue={setUsername} 
                    icon='mail'
                    type="email-address"
                />                

                <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                    icon="lock"
                />

                {error ? <Text style={{color: "red"}}>{error}</Text> : <></>}                         
 
                <CustomButton text="LOGIN" onPress= {onSignInPressed}/>   
                {loader ? <Text style={styles.LoadingIcon}><ActivityIndicator size="large" color="#fff" /> </Text> : <></>}

                {/* <Pressable onPress={onContactUsPressed} style={styles.Button}>
                    <Text style={[styles.text]}> <Icon name="mail" size={20} color="#835941" /> Contact Us</Text>
                </Pressable> */}

                {/* <Text style={(styles.copyright, styles.copyrightFirst)}>
                    Copyright {'\u00A9'} {new Date().getFullYear()} ChefOnline.
                </Text>

                <Text style={styles.copyright}>All rights reserved. Version 2.0</Text>  */}

                <View style={styles.bottomView}>
                    <Text style={styles.bottomText}>
                        <Icon style={styles.bottomText} type="AntDesign" name="copyright" />&nbsp;ChefOnline {new Date().getFullYear()}. All rights reserved.
                    </Text>
                    <Text style={styles.bottomText}>Version 2.0</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
    root: {
        alignItems: 'center',  
        padding: 0,
        backgroundColor: '#000',
        flex: 1, 
        height: height
    },
    logo: {
        width: '100%', 
        maxWidth: 500, 
        maxHeight: 200
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        backgroundColor: '#835941',
        marginHorizontal: 3,
        marginBottom: 10
    },
    circleTextCount: {
        color: 'white',
        textAlign: 'center',
        margin: 13,
        marginBottom: 0,
        fontSize: 18,
        fontWeight: 'bold',
    },
    circleText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 12,
    },
    countDownRowContainer: {
        flexDirection: 'row',
    },
    pageHeader: {
        color: "#fff",
        margin: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    contactUsLink: {
        margin: 30,
    },
    contactUsText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        width: '90%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'white',
        borderColor: '#BA762B',
        borderWidth: 1,
    },
    Button:{
        marginTop: 30
    },
    text: {
        fontWeight: 'bold',
        color: '#835941',
        fontSize: 20
    },
    copyright: {
        marginVertical: 10,
        color: "#fff",        
        textAlign: 'center',
        fontSize: 12,
    },
    copyrightFirst: {
        marginTop: 40,
        color: "#fff",
        fontSize: 12
    },
    LoadingIcon: {
        position: "absolute", 
        bottom: 173,
        zIndex: 999999
    },
    bottomView: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    bottomText: {
        fontSize: 12,
        color: '#fff',
    },
});

export default Login;