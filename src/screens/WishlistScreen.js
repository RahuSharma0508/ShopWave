import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistScreen = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      const wishlistData = await AsyncStorage.getItem('wishlist');
      const items = wishlistData ? JSON.parse(wishlistData) : [];
      setWishlistItems(items);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
    }
  };

  const removeFromWishlist = async (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    Alert.alert('Item removed from wishlist!');
  };

  const renderItem = ({ item }) => (
    <View style={styles.wishlistItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFromWishlist(item.id)}>
        <Text style={styles.removeButton}>Remove ❌</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Wishlist ❤️</Text>
      {wishlistItems.length === 0 ? (
        <Text style={styles.emptyWishlist}>Your wishlist is empty!</Text>
      ) : (
        <FlatList
          data={wishlistItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  wishlistItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  removeButton: {
    color: 'red',
    fontSize: 14,
  },
  emptyWishlist: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default WishlistScreen;
