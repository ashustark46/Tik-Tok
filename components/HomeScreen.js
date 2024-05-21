import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WishlistScreen from './WishlistScreen';
import StopwatchScreen from './StopwatchScreen';
import NotesScreen from './NotesScreen';
import UtilitiesScreen from './UtilitiesScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const StoreduserData = JSON.parse(userDataString);
          setUsername(StoreduserData.username);
          setEmail(StoreduserData.email);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            await AsyncStorage.removeItem('userData');
            navigation.reset({
              index: 0,
              routes: [{ name: 'SignUp' }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} username={username} email={email} handleLogout={handleLogout} />}>
      <Drawer.Screen name="Home">
        {() => <HomeTabNavigator username={username} />}
      </Drawer.Screen>
      <Drawer.Screen name="Wishlist" component={WishlistScreen} />
      <Drawer.Screen name="Stopwatch" component={StopwatchScreen} />
      <Drawer.Screen name="Notes" component={NotesScreen} />
    </Drawer.Navigator>
  );
};

const HomeTabNavigator = ({ username }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8e8e93',
        tabBarLabelStyle: { fontSize: 14 },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => <Icon name="home" size={20} color={color} />,
        }}
      >
        {() => <HomeTab username={username} />}
      </Tab.Screen>
      <Tab.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="sticky-note" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="Utilities"
        component={UtilitiesScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="wrench" size={20} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

const HomeTab = ({ username }) => {
  const navigation = useNavigation();

  const handleMusicPress = () => {
    navigation.navigate('Music');
  };

  const handleVideoPress = () => {
    navigation.navigate('Video');
  };

  return (
    <ImageBackground source={require('../BackgroundImages/instrument-3888684_1280.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.greeting}>Hi {username}, What would you like to do today?</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tab} onPress={handleMusicPress}>
            <Text style={styles.tabText}>Music</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={handleVideoPress}>
            <Text style={styles.tabText}>Videos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const CustomDrawerContent = ({ username, email, handleLogout, ...rest }) => {

  return (
    <DrawerContentScrollView {...rest}>
      <View style={styles.drawerHeader}>
        <Image source={require('../BackgroundImages/avatar-3637425_1280.png')} style={styles.profileImage} />
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <DrawerItemList {...rest} />
      <DrawerItem
        label="Logout"
        icon={({ color, size }) => <Icon name="sign-out" color={color} size={size} />}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  greeting: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'italic'
  },
  tabContainer: {
    flexDirection: 'row'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 16
  },
  drawerHeader: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center'
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;
