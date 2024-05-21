import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistScreen = () => {
  const navigation = useNavigation();

  const [wishlistMusic, setWishlistMusic] = useState([]);
  const [wishlistVideos, setWishlistVideos] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const musicWishlist = await AsyncStorage.getItem('wishlistMusic');
      const videoWishlist = await AsyncStorage.getItem('wishlistVideos');

      if (musicWishlist) {
        const parsedMusicWishlist = JSON.parse(musicWishlist);
        setWishlistMusic(parsedMusicWishlist);
      }

      if (videoWishlist) {
        const parsedVideoWishlist = JSON.parse(videoWishlist);
        setWishlistVideos(parsedVideoWishlist);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const removeFromWishlist = async (itemId, itemType) => {
    try {
      let updatedWishlist = [];

      if (itemType === 'music') {
        updatedWishlist = wishlistMusic.filter((id) => id !== itemId);
        setWishlistMusic(updatedWishlist);
        await AsyncStorage.setItem('wishlistMusic', JSON.stringify(updatedWishlist));
      } else if (itemType === 'video') {
        updatedWishlist = wishlistVideos.filter((id) => id !== itemId);
        setWishlistVideos(updatedWishlist);
        await AsyncStorage.setItem('wishlistVideos', JSON.stringify(updatedWishlist));
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tab, styles.musicTab]} onPress={() => navigation.navigate('WishlistMusic')}>
          <Text style={styles.tabText}>Music</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, styles.videoTab]} onPress={() => navigation.navigate('WishlistVideos')}>
          <Text style={styles.tabText}>Videos</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={wishlistMusic}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity onPress={() => removeFromWishlist(item, 'music')} style={styles.deleteButton}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noItemsText}>No music items found</Text>}
      />
      <FlatList
        data={wishlistVideos}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
            <TouchableOpacity onPress={() => removeFromWishlist(item, 'video')} style={styles.deleteButton}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noItemsText}>No video items found</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  musicTab: {
    backgroundColor: '#3498db',
    marginRight: 5,
  },
  videoTab: {
    backgroundColor: '#2ecc71',
    marginLeft: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 10,
  },
  noItemsText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WishlistScreen;
