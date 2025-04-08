

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  Platform
} from 'react-native';
import { addTaskData, addUserData } from '../database/firestoreCRUD';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddUserScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [title,setTitle]=useState('');
  const [discription ,setDiscription]=useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title|| !discription || !phone) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await addTaskData({ 
        title, 
        discription, 
        phone,
        date: formatDate(date), // Store as YYYY-MM-DD
        time: formatTime(time)  // Store as HH:MM (24-hour format)
      });
      Alert.alert('Success', 'User added successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Format date to YYYY-MM-DD
  const formatDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Format time to HH:MM (24-hour format)
  const formatTime = (dateObj) => {
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios'); // Keep picker open on iOS
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios'); // Keep picker open on iOS
    setTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New User</Text>
        <View style={{ width: 24 }} /> {/* Spacer for alignment */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          {/* Username Field */}
          {/* <View style={styles.inputWrapper}>
            <Icon name="person" size={20} color="#4A90E2" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#999"
            />
          </View> */}

<View style={styles.inputWrapper}>
            <Icon name="person" size={20} color="#4A90E2" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="title "
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#999"
            />
          </View>

          {/* Email Field */}
          {/* <View style={styles.inputWrapper}>
            <Icon name="email" size={20} color="#4A90E2" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View> */}


<View style={styles.inputWrapper}>
            <Icon name="person" size={20} color="#4A90E2" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="discription ..."
              value={discription}
              onChangeText={setDiscription}
              placeholderTextColor="#999"
            />
          </View>

          {/* Phone Field */}
          <View style={styles.inputWrapper}>
            <Icon name="phone" size={20} color="#4A90E2" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholderTextColor="#999"
            />
          </View>

          {/* Date Picker Field */}
          <View style={styles.inputWrapper}>
            <Icon name="calendar-today" size={20} color="#4A90E2" style={styles.inputIcon} />
            <TouchableOpacity 
              style={styles.dateDisplay}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateTimeText}>
                {formatDate(date)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setShowDatePicker(true)}
              style={styles.pickerButton}
            >
              <Icon name="calendar-month" size={24} color="#4A90E2" />
            </TouchableOpacity>
          </View>

          {/* Time Picker Field */}
          <View style={styles.inputWrapper}>
            <Icon name="access-time" size={20} color="#4A90E2" style={styles.inputIcon} />
            <TouchableOpacity 
              style={styles.dateDisplay}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={styles.dateTimeText}>
                {formatTime(time)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setShowTimePicker(true)}
              style={styles.pickerButton}
            >
              <Icon name="schedule" size={24} color="#4A90E2" />
            </TouchableOpacity>
          </View>

          {/* Date Picker Modal */}
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              minimumDate={new Date(2000, 0, 1)} // Optional: Set min date
            />
          )}

          {/* Time Picker Modal */}
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onTimeChange}
              is24Hour={true}
            />
          )}

          {/* Submit Button */}
          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.disabledButton]} 
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <View style={styles.buttonContent}>
                <Icon name="hourglass-empty" size={20} color="#fff" />
                <Text style={styles.buttonText}> Adding User...</Text>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <Icon name="person-add" size={20} color="#fff" />
                <Text style={styles.buttonText}> Add User</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4A90E2',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  formContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  dateDisplay: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#333',
  },
  pickerButton: {
    padding: 10,
    marginRight: 5,
  },
  submitButton: {
    height: 50,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  disabledButton: {
    backgroundColor: '#a0c4ff',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default AddUserScreen;

