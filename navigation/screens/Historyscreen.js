import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const previousBookings = [
  { id: '1', parkingName: 'Parking A', date: '2022-01-01', time: '10:00 AM' },
  { id: '2', parkingName: 'Parking B', date: '2022-01-03', time: '2:00 PM' },
  { id: '3', parkingName: 'Parking C', date: '2022-01-04', time: '8:00 AM' },
  { id: '4', parkingName: 'Parking D', date: '2022-01-06', time: '11:00 AM' },
];

export default function Historyscreen  ()  {
  const [bookings, setBookings] = useState(previousBookings);

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.parkingName}>{item.parkingName}</Text>
      <Text style={styles.bookingDetails}>
        Date: {item.date} Time: {item.time}
      </Text>
    </View>
  );



  return (
    
    <View style={styles.container}>
      
        <View>
        <Text style={styles.title}>Previous Bookings</Text>
        </View>

        <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        />
    
    </View>
   
  );
  
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#365563',
        width: '100%'
        
      },
  bookingItem: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#00adef',
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor:'#ADD8E6',
    width: 350
  },
  parkingName: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'#ffffff'
  },
  bookingDetails: {
    fontSize: 16,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00adef',
    marginBottom: 20,
    marginTop: 10,
  },
});
