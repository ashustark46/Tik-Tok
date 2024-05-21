import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';

const StopwatchScreen = () => {

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const startTimeRef = useRef(0);

  const toggleStopwatch = () => {
    if (running) {
      clearInterval(intervalRef.current);
      setRunning(false);
    } else {
      startTimeRef.current = Date.now() - time;
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 100);
      setRunning(true);
    }
  };

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  const resetStopwatch = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
    setLaps([]);
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const millisecondsDisplay = String(Math.floor((milliseconds % 1000) / 100)).padStart(1, '0');
    return `${hours}:${minutes}:${seconds}.${millisecondsDisplay}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Stopwatch</Text>
      <Image source={{ uri: 'https://your-clock-gif-url-here.gif' }} style={styles.clockImage} />
      <View style={styles.timerContainer}>
        <Text style={styles.timeText}>{formatTime(time)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, running ? styles.stopButton : styles.startButton]} onPress={toggleStopwatch}>
          <Text style={styles.buttonText}>{running ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.lapButton]} onPress={recordLap} disabled={!running}>
          <Text style={styles.buttonText}>Lap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetStopwatch}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={laps}
        renderItem={({ item, index }) => (
          <View style={styles.lapItem}>
            <Text style={styles.lapText}>Lap {index + 1}</Text>
            <Text style={styles.lapText}>{formatTime(item)}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.lapList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  clockImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  timerContainer: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 100,
    width: 215,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  timeText: {
    fontSize: 48,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  startButton: {
    backgroundColor: '#2ecc71',
  },
  stopButton: {
    backgroundColor: '#e74c3c',
  },
  lapButton: {
    backgroundColor: '#f39c12',
  },
  resetButton: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  lapList: {
    marginTop: 20,
    width: '80%',
  },
  lapItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  lapText: {
    fontSize: 16,
  },
});

export default StopwatchScreen;
