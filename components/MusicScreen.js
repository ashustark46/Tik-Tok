import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MusicScreen = () => {
  const navigation = useNavigation();

  const [sound, setSound] = useState(null);
  const [music, setMusic] = useState([
    {
      "title": "death bed",
      "artist": "Powfu",
      "artwork": require('../MusicAlbum/DeathBed.jpg'),
      "url": "https://sample-music.netlify.app/death%20bed.mp3",
      "duration": 173,
      "id": "1"
    },
    {
      "title": "bad liar",
      "artist": "Imagine Dragons",
      "artwork": require('../MusicAlbum/ImagineDrangons.jpg'),
      "url": "https://sample-music.netlify.app/Bad%20Liar.mp3",
      "duration": 120,
      "id": "2"
    },
    {
      "title": "faded",
      "artist": "Alan Walker",
      "artwork": require('../MusicAlbum/Alan.jpg'),
      "url": "https://sample-music.netlify.app/Faded.mp3",
      "duration": 120,
      "id": "3"
    },
    {
      "title": "hate me",
      "artist": "Ellie Goulding",
      "artwork": require('../MusicAlbum/EllieGoulding.jpg'),
      "url": "https://sample-music.netlify.app/Hate%20Me.mp3",
      "duration": 120,
      "id": "4"
    },
    {
      "title": "Solo",
      "artist": "Clean Bandit",
      "artwork": require('../MusicAlbum/CleanBadit.jpg'),
      "url": "https://sample-music.netlify.app/Solo.mp3",
      "duration": 120,
      "id": "5"
    },
    {
      "title": "without me",
      "artist": "Halsey",
      "artwork": require('../MusicAlbum/Hasley.jpg'),
      "url": "https://sample-music.netlify.app/Without%20Me.mp3",
      "duration": 120,
      "id": "6"
    }
  ]);

  useEffect(() => {
    return sound ? () => {
      sound.unloadAsync();
    } : undefined;
  }, [sound]);

  const playSound = async (song) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.url },
        { shouldPlay: true }
      );
      setSound(newSound);
    } catch (error) {
      console.error('Error playing Sound', error);
    }
  };

  const stopSound = async () => {
    try {
      await sound.stopAsync();
    } catch (error) {
      console.error('Error stopping sound', error);
    }
  };

  const handleMusicPress = (item) => {
    navigation.navigate('PlayerScreen', { song: item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={music}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => handleMusicPress(item)}>
            <Image source={item.artwork} style={styles.artwork} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.duration}>{item.duration}</Text>
            </View>
          </TouchableOpacity>
        )}
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
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 10,
  },
  artwork: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  duration: {
    fontSize: 14,
    color: '#666666',
  },
});

export default MusicScreen;
