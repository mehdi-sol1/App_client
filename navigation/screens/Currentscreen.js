import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';



const previousBookings = [
  { id: '1', parkingName: 'Parking A', date: '2022-01-01', time: '10:00 AM' },
  { id: '2', parkingName: 'Parking B', date: '2022-01-03', time: '2:00 PM' },
 
];

export default function Currentsscreen  ()  {
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
    <Text style={styles.title}>Current Bookings</Text>
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
        backgroundColor:'#5c008d',
        width:'100%',
      },
  bookingItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#9400cd',
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor:'#CF9FFF',
    width:350,
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
    color: '#ac03c8',
    marginBottom:20,
    marginTop:10
  },
});
