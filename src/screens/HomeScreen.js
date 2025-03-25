import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.cartLogo}/>
      <Text style={styles.header}>ShopWave - Sabki Apni Online Dukan 🎉</Text>

      {/* View Products Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProductList')}
      >
        <Text style={styles.buttonText}>🛍️ View Products</Text>
      </TouchableOpacity>

      {/* View Cart Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cart')}
      >
        <Text style={styles.buttonText}>🛒 View Cart</Text>
      </TouchableOpacity>

      {/* View Wishlist Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Wishlist')}
      >
        <Text style={styles.buttonText}>❤️ View Wishlist</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  cartLogo: {
    width: 300, // Width of the cart image
    height: 300, // Height of the cart image
    marginBottom: 10,
    backgroundColor:'#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4CAF50',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
