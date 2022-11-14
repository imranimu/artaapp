import React, { Component } from 'react'

import * as axios from 'axios';
import qs from 'qs';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    View,
    Image,
    StyleSheet,  
    Text,
    StatusBar,
    ActivityIndicator
} from 'react-native';

import Banner from "../assests/banner.jpeg"; 
import Logout from '../components/Logout'; 
import ResNominations from '../components/ResNominations';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NominationLists extends Component {

    constructor(props) {
        super(props);      
        this.state = {
            nominationList: [],
            rest_id: "",
            loader: false, 
            error: ''
        };
    }
    
    componentDidMount(){   
        this.getData(); 
    }

    onPress = () => {
        this.getData(); 
    };

    getData = async () => {
        try {            
            const value = await AsyncStorage.getItem('restaurant_id');

            if(value !== null) {                
                //setRestaurant_id(value)                 

                this.setState({loader : true })

                const url = 'https://www.artauk.com/mobile-review-data';

                let data = {rest_id: value};

                await axios.post(url, qs.stringify(data), {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(res => {     

                    //console.log(res.data);      
                    
                    this.setState({loader : false })

                    this.setState({nominationList : res.data.review_data })

                })
                .catch(error => {
                    this.setState({loader : false })
                    console.log('catch block', error);
                });
            }
        } catch(e) {                        
            this.setState({rest_id : '' });
            AsyncStorage.setItem('restaurant_id', ''); 
        }
    }

    render() {           

        return (
            <View style={styles.root}>
                <StatusBar
                    translucent
                    // backgroundColor="transparent"
                    barStyle="light-content"
                />

                <View style={styles.Refresh}>
                    <TouchableOpacity                        
                        onPress={this.onPress}>                        
                        <Text style={styles.RefrehText}><Icon style={styles.FormIcon} name="reload" size={24} color="#fff" /></Text>                        
                    </TouchableOpacity>
                </View>

                <Image
                    source={Banner}
                    style={[styles.logo]} 
                />                

                <Logout navigation={this.props.navigation} />               


                {this.state.loader ? <View style={{marginTop: 50}}><ActivityIndicator size="large" color="#835941" /></View> : 
                    <>
                    <ResNominations data={this.state.nominationList} />                     
                    </>
                } 

            </View>
        )
    }
}


const styles = StyleSheet.create({

    root: {alignItems: 'center', padding: 0, position: "relative", backgroundColor:"#000"},

    logo: {width: '100%', maxWidth: 500, maxHeight: 200, position: "relative", zIndex: 1},

    item: {
        backgroundColor: '#e8e8e8',
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        marginHorizontal: 16,
        borderRadius: 10, 
    },
    Refresh:{        
        position: "absolute", 
        top: 50, 
        left: 0,
        zIndex: 2,
    },    
    RefrehText:{
        backgroundColor: "rgba(131, 89, 65, 0.5)",
        color: "#fff",
        fontSize: 16, 
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        color: "#fff", 
        paddingHorizontal: 18,
        paddingVertical: 9,
    },
    nominatorName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        borderBottomWidth: 1, 
        paddingBottom: 5,
        borderBottomColor: "#835941",
        color: "#835941"
    }, 
    title: {
        fontSize: 15,
        color: "#222",
    },
    
    ratingContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
});