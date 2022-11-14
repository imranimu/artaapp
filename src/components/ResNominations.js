import React from 'react'
import {
    View, 
    StyleSheet,
    Text,
    FlatList
} from 'react-native'; 

import Icon from 'react-native-vector-icons/AntDesign';

export default function ResNominations(props) {

    const Item = ({item}) => (
        <>
            <View style={styles.item}>
                <Text style={styles.nominatorName}><Icon name="user" size={18} color="#835941" /> {item.viewer_name}</Text>

                <View style={styles.ratingContainer}>
                    <Text style={styles.title}><Icon name="star" size={16} color="#835941" /> Quality of Food</Text>
                    <Text style={styles.title}>{item.quality_of_food}</Text>
                </View>

                <View style={styles.ratingContainer}>
                    <Text style={styles.title}><Icon name="star" size={16} color="#835941" /> Quality of Service</Text>
                    <Text style={styles.title}>{item.quality_of_service}</Text>
                </View>

                <View style={styles.ratingContainer}>
                    <Text style={styles.title}><Icon name="star" size={16} color="#835941" /> Value for money</Text>
                    <Text style={styles.title}>{item.value_of_money}</Text>
                </View>
            </View>
        </>
    );
    
    const renderItem = ({item}) => <Item item={item} />;         

    return (
        <>
            <Text style={{marginTop: 5, fontSize: 18, fontWeight: 'bold', color: "#835941"}}>Total Nominations : {props.data.length}</Text>
            <FlatList
                style={{marginVertical: 5, marginBottom: 235, width: "100%"}}
                data={props.data}
                renderItem={renderItem}
                keyExtractor={item => item.id} 
            />
        </>
    )
}

const styles = StyleSheet.create({ 
    item: {
        backgroundColor: '#e8e8e8',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginVertical: 3,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    nominatorName: {
        fontSize: 16,
        marginBottom: 2,
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