import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        const lastLoginString = await AsyncStorage.getItem('lastLogin');
        const acceptedTerms = await AsyncStorage.getIte('acceptedTerms');

        if (userDataString && lastLoginString && acceptedTerms === 'true') {
          const lastLoginDate = new Date(lastLoginString);
          const today = new Date();

          if (
            lastLoginDate.getDate() === today.getDate() &&
            lastLoginDate.getMonth() === today.getMonth() &&
            lastLoginDate.getFullYear() === today.getFullYear()
          ) {
            navigation.navigate('Home');
            return;
          }
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [navigation]);

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleSignupPress = () => {
    navigation.navigate('SignUp');
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loaderText}>Checking login status...</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={require('../BackgroundImages/pexels-alexandro-david-871783-2820966.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome Screen</Text>
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLoginPress} />
          <View style={styles.buttonGap}></View>
          <Button title="SignUp" onPress={handleSignupPress} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    width: '100%',
  },
  header: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'italic',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGap: {
    width: 20,
  },
});

export default WelcomeScreen;
