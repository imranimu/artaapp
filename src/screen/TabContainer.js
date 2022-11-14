
/*import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
 
import Nomination from './Nomination'
import NominationLists from './NominationLists'
   
const Tab = createBottomTabNavigator();
  
export default function TabContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Nomination') {
                        iconName = focused
                        ? 'list-circle-outline'
                        : 'list-circle-sharp';
                    } else if (route.name === 'NominationLists') {
                        iconName = focused ? 'ios-list-sharp' : 'ios-list-sharp';
                    }        
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'green',
                    tabBarInactiveTintColor: 'gray',
                })}
                >
                <Tab.Screen name="Nomination" component={ Nomination } />
                <Tab.Screen name="NominationLists" component={NominationLists} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}*/

/*
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import NominationLists from './NominationLists';
import Nomination from './Nomination';

// import Login from './src/screen/Login';
// import Contact from './src/screen/Contact';
   
const Tab = createBottomTabNavigator();

const INITIAL_ROUTE_NAME = 'Nomination';

export default function App({ navigation, route }) {

    navigation.setOptions({ headerTitle: getHeaderTitle(route) });

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Home') {
                        iconName = focused
                        ? 'home'
                        : 'home';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list' : 'ios-list';
                    }else if (route.name === 'Login') {
                        iconName = focused ? 'ios-list' : 'ios-list';
                    }else if (route.name === 'Nomination') {
                        iconName = focused ? 'ios-list' : 'ios-list';
                    }
        
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'green',
                    tabBarInactiveTintColor: 'gray',
                })}
                > 
                <Tab.Screen name="Nomination" initialRouteName={INITIAL_ROUTE_NAME} component={Nomination} />
                <Tab.Screen name="Settings" component={NominationLists} />                 
            </Tab.Navigator>
        </NavigationContainer>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
    switch (routeName) {
      case 'Nomination':
        return '';
      case 'NominationLists':
        return ''; 
    }
}

*/


import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBarIcon from '../components/TabBarIcon'; 

import Nomination from './Nomination'
import NominationLists from './NominationLists'

const BottomTab = createBottomTabNavigator();

const INITIAL_ROUTE_NAME = 'Nomination';

export default function BottomTabNavigator({ navigation, route }) {

    navigation.setOptions({ headerTitle: getHeaderTitle(route) });

    return (
        <BottomTab.Navigator 
            initialRouteName={INITIAL_ROUTE_NAME} 
            tabBarOptions={{
                activeTintColor: '#986a4c',
                inactiveTintColor: "#fff", 
                activeBackgroundColor: "#000",
                inactiveBackgroundColor: "#000",                
            }}
            style={{                
                borderTopWidth: 0, 
            }}
        >
        <BottomTab.Screen
            name="Nomination"
            component={Nomination}
            options={{
                title: 'Nomination',
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="clipboard" />,
            }}
        />   
        <BottomTab.Screen
            name="NominationLists"
            component={NominationLists}
            options={{
                title: 'Nomination Lists',
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="list" />,
            }}
        />    
    </BottomTab.Navigator>
    );
}

function getHeaderTitle(route) {
    const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
    switch (routeName) {
      case 'Nomination':
        return '';
      case 'NominationLists':
        return ''; 
    }
}