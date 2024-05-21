import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const VideoScreen = () => {
  const navigation = useNavigation();

  const [videos, setVideos] = useState([

    {
      "title": "Big Buck Bunny",
      "artwork": require('../VideoAlbum/BigBuckBunny.jpg'),
      "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      "duration": "9:56",
      "id": "1"
    },
    {
      "title": "Elephants Dream",
      "artwork": require('../VideoAlbum/ElephantsDream.jpg'),
      "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      "duration": "10:53",
      "id": "2"
    },
    {
      "title": "For Bigger Blazes",
      "artwork": require('../VideoAlbum/ForBiggerBlazes.jpg'),
      "duration": "0:15",
      "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      "id": "3"
    },
    {
      "title": "For Bigger Escapes",
      "artwork": require('../VideoAlbum/ForBiggerEscapes.jpg'),
      "duration": "0:15",
      "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      "id": "4"
    },
    {
      "title": "For Bigger Fun",
      "artwork": require('../VideoAlbum/ForBiggerFun.jpg'),
      "duration": "9:56",
      "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      "id": "5"
    },
    {
      "title": "For Bigger Joyrides",
      "artwork": require('../VideoAlbum/download.jpg'),
      "duration": "12:14",
      "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      "id": "6"
    },
    {
      "title": "For Bigger Meltdowns",
      "artwork": require('../VideoAlbum/Igor.jpg'),
      "duration": "12:14",
      "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      "id": "7"
    },
    {
      "title": "Sintel",
      "artwork": require('../VideoAlbum/images.jpg'),
      "duration": "9:56",
      "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      "id": "8"
    },
    {
      "title": "Subaru Outback On Street And Dirt",
      "artwork": require('../VideoAlbum/Lorem.jpg'),
      "duration": "9:54",
      "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      "id": "9"
    },
    {
      "title": "Tears Of Steel",
      "artwork": require('../VideoAlbum/Malesedi.jpg'),
      "duration": "12:14",
      "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      "id": "10"
    },
    {
      "title": "We Are Going On Bullrun",
      "artwork": require('../VideoAlbum/Starboy.jpg'),
      "duration": "0:47",
      "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
      "id": "11"
    },
    {
      "title": "What Car Can You Get For A Grand",
      "artwork": require('../VideoAlbum/Astroworld.jpg'),
      "duration": "9:27",
      "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
      "id": "12"
    }
  ]);

  const handleVideoPress = (video) => {
    navigation.navigate('VideoPlayerScreen', { video: video });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.videoContainer}>
          <FlatList
            data={videos}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => handleVideoPress(item)}>
                <Image source={item.artwork} style={styles.artwork} />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.duration}>{item.duration}</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  videoContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  artwork: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  duration: {
    fontSize: 14,
    color: '#666666',
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default VideoScreen;