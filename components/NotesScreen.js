import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const NotesScreen = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem('notes');
        if (savedNotes !== null) {
          const parsedNotes = JSON.parse(savedNotes);
          const currentDate = new Date();
          const updatedNotes = parsedNotes.filter(note => new Date(note.saveTill) >= currentDate);
          setNotes(updatedNotes);
          await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        }
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    };

    loadNotes();
  }, [isFocused, route.params?.shouldRefresh]);

  useEffect(() => {
    if (searchText === '') {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(notes.filter(note => note.title.toLowerCase().includes(searchText.toLowerCase())));
    }
  }, [searchText, notes]);

  const handleNotePress = (note) => {
    setSelectedNote(note);
    setIsOptionsModalVisible(true);
  };

  const closeModal = () => {
    setIsOptionsModalVisible(false);
  };

  const handleViewNote = (note) => {
    setIsOptionsModalVisible(false);
    navigation.navigate('NoteDetails', { note, isEditable: false });
  };

  const handleEditNote = (note) => {
    setIsOptionsModalVisible(false);
    navigation.navigate('NoteDetails', { note, isEditable: true });
  };

  const handleDeleteNote = async (note) => {
    setIsOptionsModalVisible(false);
    const updatedNotes = notes.filter(item => item.id !== note.id);
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const renderNoteItem = ({ item }) => (
    <TouchableOpacity style={[NoteStyles.noteItem, { backgroundColor: item.backgroundColor || 'white' }]} onPress={() => handleNotePress(item)}>
      <Text style={NoteStyles.noteTitle}>{item.title}</Text>
      <Text style={[NoteStyles.noteContent, item.isItalic && { fontStyle: 'italic' }]}>{item.content}</Text>
    </TouchableOpacity>
  );

  const handleAddNote = () => {
    navigation.navigate('NoteCustomization', { shouldRefresh: true });
  };

  return (
    <View style={NoteStyles.container}>
      <TextInput
        style={NoteStyles.searchBar}
        placeholder="Search notes..."
        onChangeText={setSearchText}
        value={searchText}
      />
      {filteredNotes.length === 0 ? (
        <Text style={NoteStyles.noNotesFound}>No notes found</Text>
      ) : (
        <FlatList
          data={filteredNotes}
          renderItem={renderNoteItem}
          keyExtractor={item => item.id}
          contentContainerStyle={NoteStyles.noteList}
        />
      )}
      <TouchableOpacity style={NoteStyles.addButton} onPress={handleAddNote}>
        <MaterialIcons name="add" size={30} color="white" />
      </TouchableOpacity>
      <Modal
        visible={isOptionsModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={NoteStyles.optionsModal}>
            <View style={NoteStyles.optionsModalContent}>
              <TouchableOpacity style={NoteStyles.modalOption} onPress={() => handleViewNote(selectedNote)}>
                <MaterialIcons name="visibility" size={24} color="black" />
                <Text style={NoteStyles.modalOptionText}>View Note</Text>
              </TouchableOpacity>
              <TouchableOpacity style={NoteStyles.modalOption} onPress={() => handleEditNote(selectedNote)}>
                <MaterialIcons name="edit" size={24} color="black" />
                <Text style={NoteStyles.modalOptionText}>Edit Note</Text>
              </TouchableOpacity>
              <TouchableOpacity style={NoteStyles.modalOption} onPress={() => handleDeleteNote(selectedNote)}>
                <MaterialIcons name="delete" size={24} color="black" />
                <Text style={NoteStyles.modalOptionText}>Delete Note</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};


const NoteStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    padding: 8,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
  },
  noteList: {
    flexGrow: 1,
  },
  noteItem: {
    padding: 16,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteContent: {
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#6200EE',
    borderRadius: 50,
    padding: 16,
  },
  noNotesFound: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 16,
  },
  optionsModal: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  optionsModalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  modalOptionText: {
    marginLeft: 16,
    fontSize: 18,
  },
});

export default NotesScreen;
