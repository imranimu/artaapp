import * as React from 'react'; 

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Login from './src/screen/Login';
import Contact from './src/screen/Contact';
//import SplashScreen from './src/screen/SplashScreen';
import TabContainer from './src/screen/TabContainer';
import SplashScreen from './src/screen/SplashScreen';

export default class App extends React.Component {

    state = {
        fontLoaded: true
    }

    loadAssetsAsync = async () => {        
        this.setState({ fontLoaded: true })
    }  

    render(){        
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Splash"
                        component={SplashScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen 
                        name="Contact" 
                        component={Contact} 
                        options={{ 
                            title: 'Contact Us', 
                            headerStyle: { backgroundColor: '#986a4c', color: "#fff"} 
                        }}
                    />
                    <Stack.Screen
                        name="Tabcontainer"
                        component={TabContainer}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        )        
    }

}