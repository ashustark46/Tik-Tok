// AboutScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const images = [
  require('../BackgroundImages/colourful-shopping-packets.jpg'),
  require('../BackgroundImages/instrument-3888684_1280.png'),
  require('../BackgroundImages/pexels-punttim-443414.jpg'),
  require('../BackgroundImages/pexels-alexandro-david-871783-2820966.jpg'),
  require('../BackgroundImages/pexels-tomas-anunziata-129267-3876328.jpg'),
  require('../BackgroundImages/paper-shopping-bags-dark-background-top-view.jpg'),
];

const AboutScreen = () => {
  const navigation = useNavigation();

  const handleSkip = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.carouselContainer}
        autoplay
        autoplayTimeout={3}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={image} style={styles.photo} />
          </View>
        ))}
      </Swiper>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  carouselContainer: {
    height: 250,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: '90%',
    height: '80%',
    borderRadius: 8,
  },
  skipButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AboutScreen;
