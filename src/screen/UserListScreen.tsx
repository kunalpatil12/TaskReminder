


// import React, { useEffect, useState } from 'react';
// import { 
//   View, Text, StyleSheet, FlatList, TouchableOpacity, Alert 
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { getUserData, deleteUser, getTaskData } from '../database/firestoreCRUD';
// import PushNotification from 'react-native-push-notification';
// import moment from 'moment';

// const UserListScreen = ({ navigation }) => {
//   const [tasks, setTasks] = useState([]); // Ensure users is always an array
//   const [loading, setLoading] = useState(true);

//   // Fetch users from Firestore
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const taskList = await getTaskData();
//       setTasks(taskList || []); // Ensure it never becomes undefined
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Configure push notifications
//   const configureNotifications = () => {
//     PushNotification.createChannel(
//       {
//         channelId: "user-reminders",
//         channelName: "User Reminders",
//       },
//       (created) => console.log(`Notification channel created: ${created}`)
//     );
//   };

//   // Function to check if a user's time is in the past
//   const isPastEvent = (taskData, taskTime) => {
//     if (!taskData || !taskTime) return false;
    
//     const currentMoment = moment();
//     const eventMoment = moment(`${taskData} ${taskTime}`, 'YYYY-MM-DD HH:mm');
    
//     return eventMoment.isBefore(currentMoment);
//   };

//   // Function to check and send notifications
//   const checkForNotifications = () => {
//     console.log('Checking notifications for tasks:', tasks); // Debugging log

//     if (!Array.isArray(tasks) || tasks.length === 0) {
//       console.log('No users found for notifications.');
//       return;
//     }

//     const currentTime = moment();
//     const currentDate = moment().format('YYYY-MM-DD');

//     tasks.forEach(task => {
//       if (!task.date || !task.time) return; // Skip invalid data

//       const userTime = moment(`${task.date} ${task.time}`, 'YYYY-MM-DD HH:mm');
//       const timeDiff = userTime.diff(currentTime, 'minutes');

//      // if (user.date === currentDate && timeDiff > 0 && timeDiff <= 10) {
//         if (task.date === currentDate && timeDiff==10 || timeDiff==5) {
//         console.log(`Sending notification to ${task.tasks} in ${timeDiff} minutes`);
//         Alert.alert( `sendign notification to ${task.tasks} in ${timeDiff} minutes` );
//         sendNotification(task.tasks, timeDiff);
//       }
//     });
//   };

//   // Send push notification
//   const sendNotification = (tasks, timeDiff) => {
//     PushNotification.localNotification({
//       channelId: "user-reminders",
//       title: "Reminder Alert",
//       message: `Reminder: ${tasks}'s task is in ${timeDiff} minutes!`,
//       playSound: true,
//       soundName: 'default',
//     });
//   };

//   // Set up notification checker on interval
//   useEffect(() => {
//     configureNotifications();
//     const interval = setInterval(checkForNotifications, 60000); // Check every 1 minute
//     return () => clearInterval(interval);
//   }, [tasks]);

//   // Fetch users when screen is focused
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', fetchUsers);
//     return unsubscribe;
//   }, [navigation]);

//   // Handle user deletion
//   const handleDelete = async (id) => {
//     try {
//       await deleteUser(id);
//       Alert.alert('Success', 'task deleted successfully');
//       fetchUsers();
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   // Navigate to edit screen
//   const handleEdit = (task) => {
//     navigation.navigate('EditUser', { task });
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text>Loading users...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList 
//         data={tasks}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.listContainer}
//         renderItem={({ item }) => {
//           const isPast = isPastEvent(item.date, item.time);
          
//           return (
//             <View style={[
//               styles.userCard,
//               isPast && styles.pastEventCard
//             ]}>
//               <View style={styles.userInfo}>
//                 <Text style={styles.userName}>{item.title}</Text>
//                 <Text style={styles.userDetail}>{item.discription}</Text>
//                 <Text style={styles.userDetail}>{item.phone}</Text>
//                 <Text style={styles.userDetail}>Time: {item.time}</Text>
//                 <Text style={styles.userDetail}>Date: {item.date}</Text>
//                 {isPast && (
//                   <Text style={styles.pastEventText}>This event has passed</Text>
//                 )}
//               </View>
              
//               <View style={styles.actionButtons}>
//                 <TouchableOpacity 
//                   style={styles.editButton} 
//                   onPress={() => handleEdit(item)}
//                 >
//                   <Icon name="edit" size={20} color="#4A90E2" />
//                 </TouchableOpacity>
                
//                 <TouchableOpacity 
//                   style={styles.deleteButton} 
//                   onPress={() => handleDelete(item.id)}
//                 >
//                   <Icon name="delete" size={25} color="#FF6B6B" />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           );
//         }}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>No users found</Text>
//           </View>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 15,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   listContainer: {
//     paddingBottom: 20,
//   },
//   userCard: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 15,
//     marginBottom: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   pastEventCard: {
//     backgroundColor: '#f8d7da',
//     borderLeftWidth: 4,
//     borderLeftColor: '#dc3545',
//   },
//   userInfo: {
//     flex: 1,
//   },
//   userName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 5,
//   },
//   userDetail: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 3,
//   },
//   pastEventText: {
//     fontSize: 12,
//     color: '#dc3545',
//     fontStyle: 'italic',
//     marginTop: 5,
//   },
//   actionButtons: {
//     flexDirection: 'row',
//   },
//   editButton: {
//     padding: 8,
//     marginLeft: 10,
//     borderRadius: 4,
//     backgroundColor: '#e7f3ff',
//   },
//   deleteButton: {
//     padding: 8,
//     marginLeft: 10,
//     borderRadius: 4,
//     backgroundColor: '#ffebee',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 50,
//   },
//   emptyText: {
//     marginTop: 10,
//     color: '#999',
//     fontSize: 16,
//   },
// });

// export default UserListScreen;



import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Modal 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getUserData, deleteUser, getTaskData } from '../database/firestoreCRUD';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';

const UserListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null); // Track which task is selected for modal
  const [modalVisible, setModalVisible] = useState(false); // Control modal visibility

  // Fetch users from Firestore
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const taskList = await getTaskData();
      setTasks(taskList || []);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Configure push notifications
  const configureNotifications = () => {
    PushNotification.createChannel(
      {
        channelId: "user-reminders",
        channelName: "User Reminders",
      },
      (created) => console.log(`Notification channel created: ${created}`)
    );
  };

  // Function to check if a task is in the past
  const isPastEvent = (taskDate, taskTime) => {
    if (!taskDate || !taskTime) return false;
    
    const currentMoment = moment();
    const eventMoment = moment(`${taskDate} ${taskTime}`, 'YYYY-MM-DD HH:mm');
    
    return eventMoment.isBefore(currentMoment);
  };

  // Sort tasks: upcoming first, then past tasks
  const sortTasks = (taskList) => {
    if (!Array.isArray(taskList)) return [];
    
    return taskList.sort((a, b) => {
      const aIsPast = isPastEvent(a.date, a.time);
      const bIsPast = isPastEvent(b.date, b.time);
      
      // Upcoming tasks come first
      if (aIsPast && !bIsPast) return 1;
      if (!aIsPast && bIsPast) return -1;
      
      // If both are upcoming or both are past, sort by date/time
      const aMoment = moment(`${a.date} ${a.time}`, 'YYYY-MM-DD HH:mm');
      const bMoment = moment(`${b.date} ${b.time}`, 'YYYY-MM-DD HH:mm');
      
      return aMoment.diff(bMoment);
    });
  };

  // Function to check and send notifications
  const checkForNotifications = () => {
    if (!Array.isArray(tasks) || tasks.length === 0) return;

    const currentTime = moment();
    const currentDate = moment().format('YYYY-MM-DD');

    tasks.forEach(task => {
      if (!task.date || !task.time) return;

      const userTime = moment(`${task.date} ${task.time}`, 'YYYY-MM-DD HH:mm');
      const timeDiff = userTime.diff(currentTime, 'minutes');

      if (task.date === currentDate && (timeDiff === 10 || timeDiff === 5)) {
        sendNotification(task.title, timeDiff);
      }
    });
  };

  // Send push notification
  const sendNotification = (taskTitle, timeDiff) => {
    PushNotification.localNotification({
      channelId: "user-reminders",
      title: "Reminder Alert",
      message: `Reminder: ${taskTitle}'s task is in ${timeDiff} minutes!`,
      playSound: true,
      soundName: 'default',
    });
  };

  // Set up notification checker on interval
  useEffect(() => {
    configureNotifications();
    const interval = setInterval(checkForNotifications, 60000);
    return () => clearInterval(interval);
  }, [tasks]);

  // Fetch users when screen is focused
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchUsers);
    return unsubscribe;
  }, [navigation]);

  // Handle user deletion
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      Alert.alert('Success', 'Task deleted successfully');
      fetchUsers();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Handle task press to show modal
  const handleTaskPress = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  const sortedTasks = sortTasks(tasks);

  return (
    <View style={styles.container}>
      <FlatList 
        data={sortedTasks}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const isPast = isPastEvent(item.date, item.time);
          
          return (
            <TouchableOpacity 
              onPress={() => handleTaskPress(item)}
              activeOpacity={0.8}
            >
              <View style={[
                styles.taskCard,
                isPast && styles.pastEventCard
              ]}>
                <View style={styles.taskInfo}>
                  <Text style={styles.taskTitle}>{item.title}</Text>
                  <Text style={styles.taskDetail}>Time: {item.time}</Text>
                  <Text style={styles.taskDetail}>Date: {item.date}</Text>
                </View>
                
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.editButton} 
                    onPress={() => navigation.navigate('EditUser', { task: item })}
                  >
                    <Icon name="edit" size={20} color="#4A90E2" />
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.deleteButton} 
                    onPress={() => handleDelete(item.id)}
                  >
                    <Icon name="delete" size={25} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks found</Text>
          </View>
        }
      />

      {/* Task Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedTask && (
              <>
                <Text style={styles.modalTitle}>{selectedTask.title}</Text>
                <Text style={styles.modalText}>Time: {selectedTask.time}</Text>
                <Text style={styles.modalText}>Date: {selectedTask.date}</Text>
                <Text style={styles.modalText}>Description: {selectedTask.discription}</Text>
                <Text style={styles.modalText}>Phone: {selectedTask.phone}</Text>
                {isPastEvent(selectedTask.date, selectedTask.time) && (
                  <Text style={styles.pastEventText}>This event has passed</Text>
                )}
                
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  taskCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pastEventCard: {
    backgroundColor: '#f8d7da',
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  taskDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  pastEventText: {
    fontSize: 12,
    color: '#dc3545',
    fontStyle: 'italic',
    marginTop: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    padding: 8,
    marginLeft: 10,
    borderRadius: 4,
    backgroundColor: '#e7f3ff',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 10,
    borderRadius: 4,
    backgroundColor: '#ffebee',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    marginTop: 10,
    color: '#999',
    fontSize: 16,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserListScreen;