import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from './colors';

const NoteCustomizationScreen = () => {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [isItalic, setIsItalic] = useState(false);
  const [saveTill, setSaveTill] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    if (title.length < 1 || content.length < 1) {
      Alert.alert('Validation Error', 'Title and Content cannot be empty.');
      return;
    }

    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      backgroundColor,
      isItalic,
      saveTill,
    };

    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      const notes = savedNotes ? JSON.parse(savedNotes) : [];
      notes.push(newNote);
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
      navigation.goBack();
    } catch (error) {
      console.error('Error saving note:', error);
      Alert.alert('Error', 'Failed to save the note');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || saveTill;
    setShowDatePicker(false);
    setSaveTill(currentDate);
  };

  return (
    <ScrollView contentContainerStyle={NoteStyles.container}>
      <TextInput
        style={NoteStyles.titleInput}
        placeholder="Add note title"
        maxLength={25}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[NoteStyles.contentInput, { backgroundColor, fontStyle: isItalic ? 'italic' : 'normal' }]}
        placeholder="Add note"
        maxLength={150}
        value={content}
        onChangeText={setContent}
        multiline
      />
      <View style={NoteStyles.customizationContainer}>
        <Text>Background Color</Text>
        <View style={NoteStyles.colorPicker}>
          {colors.map(color => (
            <TouchableOpacity key={color} style={[NoteStyles.colorOption, { backgroundColor: color }]} onPress={() => setBackgroundColor(color)} />
          ))}
        </View>
        <View style={NoteStyles.italicToggle}>
          <Text>Italic Text</Text>
          <Switch value={isItalic} onValueChange={setIsItalic} />
        </View>
        <View style={NoteStyles.datePickerContainer}>
          <Text>Save Till:</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <MaterialIcons name="calendar-today" size={24} color="black" />
            <Text>{saveTill.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={saveTill}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>
      </View>
      <TouchableOpacity style={NoteStyles.saveButton} onPress={handleSave}>
        <MaterialIcons name="save" size={24} color="white" />
        <Text style={NoteStyles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
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
  customizationContainer: {
    marginVertical: 16,
  },
  colorPicker: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 16,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 8,
  },
  italicToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default NoteCustomizationScreen;
