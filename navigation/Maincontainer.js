import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Logsscreen from './screens/Logsscreen';
import Mapscreen from './screens/Mapscreen';
import Profilescreen from './screens/Profilescreen';
import Settingsscreen from './screens/Settingsscreen';


import { GestureHandlerRootView } from 'react-native-gesture-handler';

const logsscreen ='History';
const mapscreen ='Map';
const profilescreen ='Profile';
const settingsscreen ='Settings';

const tab =createBottomTabNavigator();

export default function Maincontainer() {
  return (
   
    
        <NavigationContainer>
           
            <tab.Navigator
             initialRouteName={mapscreen}
             screenOptions={({route}) =>({
                tabBarIcon: ({focused ,color,size})=>{

                    let iconName;
                    let rn = route.name;
        
                    if (rn === mapscreen) {
                      iconName = focused ? 'map' : 'map-outline';
        
                    } else if (rn === profilescreen) {
                      iconName = focused ? 'person-circle' : 'person-circle-outline';
        
                    }
                    else if (rn === logsscreen) {
                        iconName = focused ? 'journal' : 'journal-outline';
          
                      }  else if (rn === settingsscreen) {
                      iconName = focused ? 'settings' : 'settings-outline';
                    }

                
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
             })}
            
             tabBarOptions={{
                activeTintColor: '#6a329f',
                inactiveTintColor: 'grey',
                labelStyle: { paddingBottom: 10, fontSize: 10 },
                style: { padding: 10, height: 70 }               
              }}

                 >


            <tab.Screen name={mapscreen} component={Mapscreen} />
            <tab.Screen name={profilescreen} component={Profilescreen} />
            <tab.Screen name={logsscreen} component={Logsscreen} />           
            <tab.Screen name={settingsscreen} component={Settingsscreen} />
            </tab.Navigator>
          
        </NavigationContainer>
    
  );
}
const styles = StyleSheet.create({
  tabBar: {
    zIndex: 100,
  },
});


  