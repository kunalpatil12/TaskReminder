// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
// import { updateUser } from '../database/firestoreCRUD';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const EditUserScreen = ({ navigation, route }) => {
//   const { user } = route.params;
//   const [username, setUsername] = useState(user.username);
//   const [email, setEmail] = useState(user.email);
//   const [phone, setPhone] = useState(user.phone);
//   const [loading, setLoading] = useState(false);
//   const [time,setTime]=useState('');
//   const [date, setDate]=useState('');

//   const handleSubmit = async () => {
//     if (!username || !email || !phone) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       await updateUser(user.id, { username, email, phone,time,date });
//       Alert.alert('Success', 'User updated successfully');
//       navigation.goBack();
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Icon name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Edit User</Text>
//         <View style={{ width: 24 }} />
//       </View>

//       <View style={styles.formContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter name"
//           value={username}
//           onChangeText={setUsername}
//           placeholderTextColor="#999"
//         />
        
//         <TextInput
//           style={styles.input}
//           placeholder="Enter email"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//           autoCapitalize="none"
//           placeholderTextColor="#999"
//         />
        
//         <TextInput
//           style={styles.input}
//           placeholder="Enter phone"
//           value={phone}
//           onChangeText={setPhone}
//           keyboardType="phone-pad"
//           placeholderTextColor="#999"
//         />
        
//         <TouchableOpacity 
//           style={styles.submitButton} 
//           onPress={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? (
//             <Text style={styles.buttonText}>Updating...</Text>
//           ) : (
//             <Text style={styles.buttonText}>Update User</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#4A90E2',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   formContainer: {
//     margin: 20,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     fontSize: 16,
//     backgroundColor: '#f9f9f9',
//   },
//   submitButton: {
//     height: 50,
//     backgroundColor: '#4A90E2',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default EditUserScreen;
import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Platform 
} from 'react-native';
import { updateUser } from '../database/firestoreCRUD';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const EditUserScreen = ({ navigation, route }) => {
   const { task } = route.params;
  // const [username, setUsername] = useState(user.username);
  // const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(task.phone);

    const [title,setTitle]=useState(task.title);
    const [discription ,setDiscription]=useState(task.discription);

  const [time, setTime] = useState(task.time || '');
  const [date, setDate] = useState(task.date || '');
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Handle user update
  const handleSubmit = async () => {
    if (!title || !discription || !phone || !time || !date) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await updateUser(task.id, { title, discription, phone, time, date });
      Alert.alert('Success', 'task updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Show Date Picker
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(moment(selectedDate).format('YYYY-MM-DD'));
    }
  };

  // Show Time Picker
  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setTime(moment(selectedTime).format('HH:mm'));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Task</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#999"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={discription}
          onChangeText={setDiscription}
          placeholderTextColor="#999"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Enter phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor="#999"
        />
        
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.pickerButton}>
          <Text style={styles.pickerText}>{date ? date : 'Select Date'}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            mode="date"
            value={date ? new Date(date) : new Date()}
            display="default"
            onChange={onDateChange}
          />
        )}
        
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.pickerButton}>
          <Text style={styles.pickerText}>{time ? time : 'Select Time'}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            mode="time"
            value={time ? moment(time, 'HH:mm').toDate() : new Date()}
            display="default"
            onChange={onTimeChange}
          />
        )}
        
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Updating...' : 'Update task'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4A90E2',
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
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  pickerButton: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    height: 50,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditUserScreen;
