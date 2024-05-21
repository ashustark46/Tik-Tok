import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const PlayerScreen = ({ route }) => {
  const { song } = route.params;
  const navigation = useNavigation();

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('wishlistMusic').then((wishlist) => {
      if (wishlist) {
        const parsedWishlist = JSON.parse(wishlist);
        setIsInWishlist(parsedWishlist.includes(song.id));
      }
    });

    (async () => {
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: song.url });
      setSound(newSound);
      await newSound.playAsync();
    })();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const togglePlayback = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleWishlist = async () => {
    try {
      const wishlist = await AsyncStorage.getItem('wishlistMusic');
      let updatedWishlist = wishlist ? JSON.parse(wishlist) : [];

      if (isInWishlist) {
        updatedWishlist = updatedWishlist.filter((itemId) => itemId !== song.id);
      } else {
        updatedWishlist.push(song.id);
      }

      await AsyncStorage.setItem('wishlistMusic', JSON.stringify(updatedWishlist));
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={34} color="black" />
      </TouchableOpacity>
      <Image source={song.artwork} style={styles.artwork} />
      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.artist}>{song.artist}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={togglePlayback}>
          <MaterialIcons name={isPlaying ? "pause" : "play-arrow"} size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleWishlist}>
          <MaterialIcons name={isInWishlist ? "favorite" : "favorite-border"} size={30} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  artwork: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artist: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PlayerScreen;
