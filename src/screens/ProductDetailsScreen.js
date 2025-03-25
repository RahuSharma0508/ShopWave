import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetailsScreen = ({ route, navigation }) => {
    const { product } = route.params;

    const addToCart = async () => {
        try {
            const cartItems = await AsyncStorage.getItem('cart');
            let items = cartItems ? JSON.parse(cartItems) : [];

            const itemExists = items.find((item) => item.id === product.id);
            if (itemExists) {
                Alert.alert('Item already in cart!');
            } else {
                items.push({ ...product, quantity: 1 });
                await AsyncStorage.setItem('cart', JSON.stringify(items));
                Alert.alert('Item added to cart!');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    // add to wishlit

    const addToWishlist = async () => {
        try {
          const wishlistItems = await AsyncStorage.getItem('wishlist');
          let items = wishlistItems ? JSON.parse(wishlistItems) : [];
      
          const itemExists = items.find((item) => item.id === product.id);
          if (itemExists) {
            Alert.alert('Item already in wishlist!');
          } else {
            items.push(product);
            await AsyncStorage.setItem('wishlist', JSON.stringify(items));
            Alert.alert('Item added to wishlist!');
          }
        } catch (error) {
          console.error('Error adding to wishlist:', error);
        }
      };
      

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <TouchableOpacity style={styles.button} onPress={addToCart}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>

            {/*add to wishlist   */}
            <TouchableOpacity style={styles.button} onPress={addToWishlist}>
                <Text style={styles.buttonText}>❤️ Add to Wishlist</Text>
            </TouchableOpacity>


        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 35,
      },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        gap:2,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop:8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProductDetailsScreen;
