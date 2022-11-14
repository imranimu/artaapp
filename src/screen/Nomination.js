import React, {useState, useEffect} from 'react';
import qs from 'qs';
import * as axios from 'axios';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Text,
  TextInput,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import Banner from "../assests/banner.jpeg";
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import { Rating } from 'react-native-ratings';
import Logout from '../components/Logout';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/AntDesign';
import NominationClosed from '../components/NominationClosed';

// create a component
const Nomination = ({navigation}) => {

    const [isNominationOpen] = useState(false);
    const [restaurant_id, setRestaurant_id] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailValidError, setEmailValidError] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [postcode, setPostcode] = useState('');
    const [comments, setComments] = useState('');
    const [quality_of_food, setQuality_of_food] = useState(5);
    const [quality_of_service, setQuality_of_service] = useState(5);
    const [value_of_money, setValue_of_money] = useState(5); 
    const [loader, setLoader] = useState(false);
    const [SuccesMsg, setSuccesMsg] = useState('');
    const {height} = useWindowDimensions();   

    useEffect(() => {        
        getData();
    });

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('restaurant_id')
            if(value !== null) {            
                setRestaurant_id(value)
            }else{
                navigation.navigate('Login');
            }
        } catch(e) {
            console.log(e);
        }
    }    

    const onSendNomination = async() => {         

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;         

        if (restaurant_id && email && mobileNumber && name && postcode && quality_of_food && quality_of_service && value_of_money) {

            if (reg.test(email) === false) {

                setEmailValidError('Enter valid email address');
                
            }else{

                setLoader(true);

                let data = {
                    rest_id: restaurant_id,
                    viewer_name: name,
                    viewer_email: email,
                    viewer_mobile: mobileNumber,
                    viewer_postcode: postcode,
                    quality_of_food: quality_of_food,
                    quality_of_service: quality_of_service,
                    value_of_money: value_of_money,
                    comments: comments,
                };

                const url = 'https://www.artauk.com/setup-mobile-review';    

                await axios.post(url, qs.stringify(data), {
                    headers: {                    
                        'Content-Type': 'application/x-www-form-urlencoded',
                    } 
                }).then(res => {     
                    console.log(res.data);
                    
                    setSuccesMsg('Thank you for nominating us.');
                    setEmailValidError('');
                    setName('');
                    setEmail('');
                    setMobileNumber('');
                    setPostcode('');
                    setComments('');

                    setLoader(false);    

                }).catch(error => {                            
                    setEmailValidError('Email or Password is incorrect');       
                    setSuccesMsg('');                    
                    setLoader(false);                  
                    console.log( error );    
                });  
            }            
        }else{
            setEmailValidError('All Fields are required.');
            setSuccesMsg('');
        }
    };

    const qualityFood= (rating) => {        
        setQuality_of_food(rating);
    }

    const qualityService= (rating) => {
        setQuality_of_service(rating)
    }

    const valueForMoney= (rating) => {
        setValue_of_money(rating)
    }

    return (
        <>
            
            {isNominationOpen ? 
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="light-content"
                />
    
                <View style={styles.root}>
                    <Image
                        source={Banner}
                        style={[styles.logo]} 
                    />      
                    <Logout navigation={navigation} />

                        
                        
                            <Text style={styles.contactUs}>
                                Nomination closes 31st of July 2022
                            </Text>  
                            <CustomInput 
                                placeholder="Name" 
                                value={name} 
                                setValue={setName} icon="user" 
                            />
                            <CustomInput 
                                placeholder="Email" 
                                value={email} 
                                setValue={setEmail} 
                                icon="mail" 
                                type="email-address" 
                            /> 
                            <CustomInput
                                placeholder="Mobile Number"
                                value={mobileNumber}
                                setValue={setMobileNumber}
                                icon="mobile1"
                                type="phone-pad"
                            />
                            <CustomInput
                                placeholder="Post Code"
                                value={postcode}
                                setValue={setPostcode}
                                icon="creditcard"
                            /> 
                            <View style={styles.textAreaContainer} >
                                <Icon style={styles.FormIcon} name={'message1'} size={18} color="#835941" />
                                <TextInput
                                    style={styles.textArea}
                                    value={comments}
                                    underlineColorAndroid="transparent"
                                    onChangeText={setComments}
                                    placeholder="Comments"
                                    placeholderTextColor="grey"
                                    numberOfLines={4}
                                    multiline={true}
                                />
                            </View>
                            <View style={{
                                backgroundColor: "#000", 
                                width: "90%", 
                                textAlign: "center", 
                                alignItems:"center", 
                                borderRadius: 10, 
                                marginVertical: 5, 
                                paddingBottom: 6 }}>
                                <Text style={styles.labelText}>Quality Of Food *</Text>
                                <Rating                     
                                    startingValue={5}
                                    ratingCount={5}
                                    onFinishRating={qualityFood}
                                    style={{ paddingVertical: 5 }}                    
                                    size={10}
                                    ratingColor={'#fff'}
                                    ratingBackgroundColor={'#c8c7c8'}
                                    tintColor={"#000"}
                                />
                                <Text style={styles.labelText}>Quality Of Service *</Text>
                                <Rating 
                                    startingValue={5}
                                    ratingCount={5}
                                    ratingColor={'#fff'}
                                    ratingBackgroundColor={'#c8c7c8'}
                                    tintColor={"#000"}
                                    onFinishRating={qualityService}
                                    style={{ paddingVertical: 5 }}                    
                                    size={10}
                                />
                                <Text style={styles.labelText}>Value for money *</Text>
                                <Rating 
                                    startingValue={5}
                                    ratingCount={5}
                                    onFinishRating={valueForMoney}
                                    style={{ paddingVertical: 5 }}                    
                                    size={10}
                                    ratingColor={'#fff'}
                                    ratingBackgroundColor={'#c8c7c8'}
                                    tintColor={"#000"}
                                />
                            </View>
                            
                            {emailValidError ? <Text style={{color: "red"}}>{emailValidError}</Text> : null}

                            {SuccesMsg ? <Text style={{color: "green"}}>{SuccesMsg}</Text> : null}

                            <CustomButton text="SUBMIT" onPress={onSendNomination} />                 

                    {loader ? <Text style={styles.LoadingIcon}><ActivityIndicator size="large" color="#fff" /> </Text> : <></>}

                </View>
            </ScrollView> :  <NominationClosed /> 
        }

        </>
    );
};

const styles = StyleSheet.create({    
    root: {
        alignItems: 'center', 
        padding: 0, 
        marginBottom: 10,
        backgroundColor: "#000"
    },
    logo: {
        width: '100%', 
        maxWidth: 500, 
        maxHeight: 200
    },
    pageHeader: {
        margin: 10,
        marginBottom: 5,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: "#fff"
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
        margin: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 15,
        color: "#fff"
    },
    labelText:{
        color: "#9c7456",
        fontSize: 16,
        marginTop: 10
    },
    textAreaContainer: {
        borderColor: "#ccc",
        backgroundColor: "transparent",
        width: "90%",
        borderWidth: 1,
        borderRadius: 10, 
        paddingLeft: 30,        
        paddingTop: 4,
        paddingRight: 10,
        paddingBottom: 10,        
        textAlign: "left"
    },
    textArea: {
        height: 60,
        justifyContent: "flex-start",
        textAlignVertical: 'top'
    },
    FormIcon:{
        position: "absolute",
        top: 14,
        left: 10
    },
    LoadingIcon: {
        position: "absolute", 
        bottom: 10,
        zIndex: 999999
    }
});

export default Nomination;

 

