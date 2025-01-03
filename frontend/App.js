import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, ImageBackground, Animated, Easing, Dimensions } from 'react-native';
import { Appbar, Card, TextInput as PaperInput } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getCollection, addItem, deleteItemById, deleteCollection } from './api';

export default function App() {
  const [wishlist, setWishlist] = useState([]);
  const [destination, setDestination] = useState('');
  const [country, setCountry] = useState('');
  const [cost, setCost] = useState('');
  const [priority, setPriority] = useState('');

  const image = require('./assets/sky.jpg');
  const airplane = require('./assets/airplane.png');

  const position = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.5)).current;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    loadWishlist();
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(position, {
        toValue: screenWidth * 0.25,
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const loadWishlist = async () => {
    try {
      const data = await getCollection();
      setWishlist(data);
    } catch (error) {
      Alert.alert('Error', 'Unable to load wishlist.');
    }
  };

  const handleAddItem = async () => {
    if (!destination || !country || !cost || !priority) {
      Alert.alert('Validation Error', 'Please fill all fields.');
      return;
    }

    const newItem = {
      Destination: destination,
      Country: country,
      Cost: cost,
      Priority: priority,
    };

    try {
      await addItem(newItem);
      setDestination('');
      setCountry('');
      setCost('');
      setPriority('');
      loadWishlist();
    } catch (error) {
      Alert.alert('Error', 'Unable to add item.');
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItemById(id);
      loadWishlist();
    } catch (error) {
      Alert.alert('Error', 'Unable to delete item.');
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteCollection();
      loadWishlist();
    } catch (error) {
      Alert.alert('Error', 'Unable to delete all items.');
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Background Image */}
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          {/* Animated Airplane */}
          <Animated.Image
            source={airplane}
            style={[
              styles.airplane,
              {
                transform: [
                  { translateX: position }, // Horizontal movement
                  { scale: scale }, // Scaling
                ],
              },
            ]}
          />
          {/* App Bar */}
          <Appbar.Header style={styles.header}>
            <Appbar.Content title="Travel Wishlist" />
          </Appbar.Header>

          {/* Inputs and List */}
          <View style={styles.inputContainer}>
            <PaperInput
              label="Destination"
              value={destination}
              onChangeText={setDestination}
              style={styles.input}
            />
            <PaperInput
              label="Country"
              value={country}
              onChangeText={setCountry}
              style={styles.input}
            />
            <PaperInput
              label="Estimated Cost"
              value={cost}
              onChangeText={setCost}
              keyboardType="numeric"
              style={styles.input}
            />
            <PaperInput
              label="Priority (1-5)"
              value={priority}
              onChangeText={setPriority}
              keyboardType="numeric"
              style={styles.input}
            />
            <Button title="Add Destination" onPress={handleAddItem} />
          </View>

          <FlatList
            data={wishlist}
            keyExtractor={(item) => item.ID.toString()}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <Card.Content>
                  <Text>ID: {item.ID}</Text>
                  <Text>Destination: {item.Destination}</Text>
                  <Text>Country: {item.Country}</Text>
                  <Text>Cost: ${item.Cost}</Text>
                  <Text>Priority: {item.Priority}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button
                    title="Delete"
                    onPress={() => handleDeleteItem(item.ID)}
                  />
                </Card.Actions>
              </Card>
            )}
          />

          <Button title="Clear Wishlist" onPress={handleDeleteAll} />
        </ImageBackground>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Arial',
  },
  header: {
    textAlign: 'center',
  },
  inputContainer: {
    padding: 10,
    marginBottom: 20,
    width: '60%',
    justifyContent: 'center',
    alignSelf: 'center',
    opacity: 0.8,
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  card: {
    margin: 10,
    padding: 5,
    width: '60%',
    justifyContent: 'center',
    alignSelf: 'center',
    opacity: 0.8,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  airplane: {
    position: 'absolute',
    top: '20%', // Adjust based on where you want the animation to start
    width: '60%', // Scaled width
    height: '60%', // Scaled height
    resizeMode: 'contain',
  },
});
