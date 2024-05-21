import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const NoteDetailsScreen = ({ route }) => {
  const { note, isEditable } = route.params;
  const navigation = useNavigation();

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      const notes = savedNotes ? JSON.parse(savedNotes) : [];
      const updatedNotes = notes.map(item => (item.id === note.id ? { ...note, title, content } : item));
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      navigation.goBack();
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Error', 'Failed to save the note');
    }
  };

  return (
    <View style={NoteStyles.container}>
      <TextInput
        style={NoteStyles.titleInput}
        value={title}
        editable={isEditable}
        onChangeText={setTitle}
      />
      <TextInput
        style={NoteStyles.contentInput}
        value={content}
        editable={isEditable}
        onChangeText={setContent}
        multiline
      />
      {isEditable && (
        <TouchableOpacity style={NoteStyles.saveButton} onPress={handleSave}>
          <MaterialIcons name="save" size={24} color="white" />
          <Text style={NoteStyles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};


const NoteStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  titleInput: {
    fontSize: 18,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    textAlignVertical: 'top',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200EE',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  saveButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 18,
  },
});

export default NoteDetailsScreen;
