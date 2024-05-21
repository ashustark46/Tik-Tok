// SignupScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {

      if (!username.match(/^[a-zA-Z]{3,}$/)) {
        Alert.alert('Invalid User Name', 'User name must consist of at least 3 letters with no special characters.');
        return;
      }

      if (!phoneNumber.match(/^[0-9]{10}$/)) {
        Alert.alert('Invalid Phone Number', 'Phone number must consist of 10 digits.');
        return;
      }

      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        Alert.alert('Invalid Email', 'Please enter a valid email.');
        return;
      }

      if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        Alert.alert('Invalid Password', 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.');
        return;
      }

      const StoreduserData = {
        username,
        phoneNumber,
        email,
        password,
      };

      await AsyncStorage.setItem('userData', JSON.stringify(StoreduserData));
      await AsyncStorage.setItem('acceptedTerms', 'false');

      navigation.navigate('TermsAndConditions');
    } catch (error) {
      console.error('Error during sign up:', error);
      Alert.alert('Error', 'Failed to sign up. Please try again later.');
    }
  };

  return (
    <ImageBackground source={require('../BackgroundImages/colourful-shopping-packets.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
        <TextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#d0cdcd',
  },
});

export default SignUpScreen;
