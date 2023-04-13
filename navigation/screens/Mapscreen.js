  import { StyleSheet, Text, View ,TouchableOpacity ,Animated ,TouchableWithoutFeedback ,Button, Dimensions } from 'react-native';
  import React, { useState,useEffect,useRef } from 'react';
  import MapView , { Callout, Marker } from 'react-native-maps';
  import { Alert } from 'react-native';

  import { Permission } from 'react-native';
  //import { PERMISSIONS} from 'react-native-permissions';
  //import { request} from 'react-native-permissions';

  //import Geolocation from '@react-native-community/geolocation';
  import * as Location from 'expo-location';


  import Icon from 'react-native-vector-icons/MaterialIcons';
  import Ionicons from 'react-native-vector-icons/Ionicons';


  import { PermissionsAndroid } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';

    import "react-native-gesture-handler";
  //import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
  import BottomSheet ,{BottomSheetView ,BottomSheetModal} from '@gorhom/bottom-sheet';
  //import { runOnUI } from 'react-native-reanimated/lib/reanimated2/core';
  ///import {BottomSheetModal ,BottomSheetProvider, BottomSheetView} from '@gorhom/bottom-sheet'; 
  import { GestureHandlerRootView } from 'react-native-gesture-handler';



    
  // location perm..
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }




  const Mapscreen = () => {
  //  For The Map
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [location, setLocation] = useState(null);
    const mapref = useRef(null);
  //  For The BottomSheet
    const bottomSheetRef = React.createRef();
    const snapPoints = [ '25%','50%', '75%','100%'];
    const [visible, setVisible] = React.useState(false);

  //  My Current Location with Permission
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
    
      {/* let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log("ur latitude :" + location.coords.latitude);
        console.log("ur longtitude :" + location.coords.longitude);
      //Alert.alert(`Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`);   */}
      })();
    }, []); 
    const handlePress = async () => {
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
        console.log("ur latitude :" + location.coords.latitude);
        console.log("ur longtitude :" + location.coords.longitude);
        Alert.alert(`Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`);
    }

  // Handelers
    const handleMarkerPress =(marker) => { 
    setSelectedMarker(marker); 
      bottomSheetRef.current.present() // open the bottom sheet
      console.log("M GETTING CALLED "); 
    };




  //   Park List To render
  const [listmarkers, setlistmarkers] = useState([
    {
      coordinate:{ latitude:34.8500, longitude: 5.7300},
      id:"0004",
      name:'park name 4',
      parklocation : 'This is marker 4',
      address:"address marker 4",
      state:"available",
      capacity : 100,
      price : 5,
      owner:"owner of park 4",
      pinColor:'#00FF00'
    },
    {
      coordinate:{ latitude:34.8550, longitude: 5.7500},
      id:"0005",
      name:'park name 5',
      parklocation : 'This is marker 5',
      address:"address marker 5",
      state:"not-available",
      capacity : 20,
      price : 200,
      owner:"owner of park 5",
      pinColor:'#00FF00',
    },
    {
      coordinate:{ latitude:34.8500, longitude: 5.7350},
      id:"0006",
      name:'park name 6',
      parklocation : 'This is marker 6',
      address:"address marker 6",
      state:"available",
      capacity : 50,
      price : 500,
      owner:"owner of park 6",
      pinColor:'#00FF00',
    },
  ]);


  


  /////Park info Variables:
  {/*
    const [coordinate2, setCoordinate2] = useState({
      latitude:34.8500,
      longitude: 5.7400
    });

    //coordinate: { latitude: 37.78825, longitude: -122.4324 }
    const id="0004";
    const name = 'park name 4';
    const parklocation = 'This is marker 4';
    const address="address marker 4";
    const state="available"
    const capacity = 100;
    const price = 5;
    const owner="owner of park 4";

    const marker = {
      coordinate: coordinate2,
      name: name,
      parklocation:parklocation,
      address:address,
      state:state,
      capacity:capacity,
      price:price,
      owner:owner,
    };
          */}

    //////UI Return
    return (
      <View style={styles.container}>
        <View style={styles.mapcontainer}>
          <MapView 
          ref={mapref}
        style={styles.map} 
        showsPointsOfInterest={false}
        customMapStyle={customMapStyle}
        initialRegion={{
          latitude: 34.8500,
          longitude: 5.7300,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}
        >


         
              <Marker
                coordinate={{ latitude:34.8450, longitude: 5.7500}}
                title={"Park 2 Name"}
                description={"Marker Description 2"}  
                onPress={() =>
                  handleMarkerPress({
                    title: "Park 2",
                    description: "Park 2 Desc",
                  })
                }
              />
              <Marker
                coordinate={{ latitude:34.8400, longitude: 5.7100}}
                title={"Park 3"}
                description={"Marker Description 3"}
                onPress={() =>
                  handleMarkerPress({
                    title: "Park 3 Name",
                    description: "Park 3 Desc",
                  })
                }
              />

              {location && (
              <Marker
                coordinate={{ latitude:location.coords.latitude, longitude: location.coords.longitude}}
                title={"My Current Location"} 
                borderRadius= {1000}
                pinColor='#0000FF'          
              >
              <Callout>
                      <View>
                        <Text>My Location</Text>
                      </View>
                  </Callout>
              </Marker>
              )}
                
                {listmarkers.map(marker => (
                    <Marker key={marker.id} {...marker} onPress={() =>handleMarkerPress({...marker})}>
                     <Callout >
                          <View>
                            <Text>Name: {marker.name}</Text>
                            <Text>Price: {price}</Text>
                            <Text>Capacity: {capacity}</Text>
                          </View>
                     </Callout>
                    </Marker>
                  ))}
              
        </MapView>
        </View>
        <View style={styles.bsheet}>
        <BottomSheetModal 
            
              ref={bottomSheetRef} 
              visible={visible}
              snapPoints={snapPoints}
              initialPosition={-1} 
              customStyles={{
                container: {
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                },
              }}  
              enablePanDownToClose='true'
            >
        
        {selectedMarker && (
            <View style={styles.bottomSheet}>
              <View>
              <Text style={styles.title}>Parking Garage Information</Text>
              </View>

              <View style={styles.cardcontent}>
            
              <Text style={styles.text}>Park Name : {selectedMarker.name}</Text>
              <Text style={styles.text}>Location :{selectedMarker.parklocation}</Text>
              <Text style={styles.text}>Address :{selectedMarker.address}</Text>
              <Text style={styles.text}>State :{selectedMarker.state}</Text>
              <Text style={styles.text}>Capacity :{selectedMarker.capacity}</Text>
              <Text style={styles.text}>Price  :{selectedMarker.price}</Text>
              <Text style={styles.text}>Owner  :{selectedMarker.owner}</Text>
              
                    <View style={styles.booknow}> 

                            <TouchableOpacity style={styles.button} >
                                  <Ionicons name="time" size={24} color="#223BC9" />
                            </TouchableOpacity>

                            <Text style={styles.booknowtext}>Book Now</Text>
                    </View>
              </View>
            </View>
          )}   
        </BottomSheetModal>
        </View>     

        
        <TouchableOpacity style={styles.button2} onPress={handlePress}>
          <Ionicons name="location" size={24} color="#6a329f" />     
        </TouchableOpacity>   

        </View>
      
    )
  }

  export default Mapscreen

  const styles = StyleSheet.create({
  map: {
  flex: 1,
  },
  mapcontainer:
  {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position:'relative',
    
  },
  button: {
    backgroundColor:'#fff',
    borderRadius: 50,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderColor: '#223BC9'
  },
  button2: {
    backgroundColor: '#ffffff',
    borderRadius: 50,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 16,
    right: 16,
    elevation: 5,
  },
  bsheet:{
    alignItems: 'center',
    marginTop:50,
    
  },
  labelT: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignItems: 'center',
    alignContent:'center',
    justifyContent: 'center',
    //fontFamily: 'BostonCaps',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  buttonGroup: {
    position: 'absolute',
    bottom: 88,
    right: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: 200,
    height: 40,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  secondaryButton: {
    width: 24,
    height: 24,
    borderRadius: 50,
    
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    
    
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E5984',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },

  bottomSheet:{
    padding: 10,
    borderWidth: 2,
    borderColor: '#89aae1',
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor:'#ADD8E6',
    justifyContent: 'center',
    alignItems:'center',
    marginHorizontal: 10,
    
    
  },
  cardcontent:{
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: '100%',
    marginHorizontal: 10, 
  },

    booknow:{
          backgroundColor:'#fff',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          position: 'relative',
    },
    booknowtext:{
      justifyContent:'center',
      alignItems:'center',
      fontSize: 14,
      fontWeight:'bold',
      color:"#223BC9",
    },
  });

  const deviceWidth=Math.round(Dimensions.get('window').width);

  ////MAP STYLE
  const customMapStyle = [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [{ visibility: 'off' }],
    },
  ];