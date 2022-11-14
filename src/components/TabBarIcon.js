import * as React from 'react';

//import { FontAwesome } from '@expo/vector-icons';

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {PixelRatio } from 'react-native';

export default function TabBarIcon(props) {

    var fontSize = 30;

    if (PixelRatio.get() <= 2) {    
        fontSize = 22;
    }

    return (
        <FontAwesome
            name={props.name}
            size={fontSize}
            style={{ marginBottom: -3 }}
            color={props.focused ? "#986a4c" : "#fff"}
        />
    );
}

 