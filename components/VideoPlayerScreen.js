import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Video } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VideoPlayerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { video } = route.params;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const wishlist = await AsyncStorage.getItem('wishlistVideos');
      if (wishlist) {
        const parsedWishlist = JSON.parse(wishlist);
        setIsInWishlist(parsedWishlist.includes(video.id));
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleWishlist = async () => {
    try {
      const updatedWishlist = async () => {
        const parsedWishlist = JSON.parse(await AsyncStorage.getItem('wishlistVideos'));
        return parsedWishlist ? parsedWishlist : [];
      };

      const wishlist = await updatedWishlist();

      if (isInWishlist) {
        await AsyncStorage.setItem('wishlistVideos', JSON.stringify(wishlist.filter((itemId) => itemId !== video.id)));
      } else {
        wishlist.push(video.id);
        await AsyncStorage.setItem('wishlistVideos', JSON.stringify(wishlist));
      }
      setIsInWishlist(!isInWishlist);
      fetchWishlist();

    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: video.url }}
        shouldPlay={isPlaying}
        style={styles.video}
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={togglePlay} style={styles.controlButton}>
          <MaterialIcons name={isPlaying ? "pause" : "play-arrow"} size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleWishlist} style={styles.controlButton}>
          <MaterialIcons name={isInWishlist ? "favorite" : "favorite-border"} size={32} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '80%',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
  },
  controlButton: {
    marginHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
});

export default VideoPlayerScreen;
