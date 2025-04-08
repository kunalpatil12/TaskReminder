


import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const addTaskData = async (taskData) => {
  try {
    const user = auth().currentUser;
    console.log(user, "currentuserr");

    if (!user) throw new Error("User not authenticated");

    const taskDataWithUserId = {
      ...taskData,
      userId: user.uid,  // Changed from ownerId to userId to match rules
      createdAt: firestore.FieldValue.serverTimestamp(),
      updatedAt: firestore.FieldValue.serverTimestamp()
    };
console.log('user id',user.uid);
    const docRef = await firestore().collection('users').add(taskDataWithUserId);
    console.log('User added successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

// export const getUserData = async () => {
//   try {
//     const user = auth().currentUser;
//     if (!user) throw new Error("User not authenticated");

//     const userSnapshot = await firestore()
//       .collection('users')
//       .where('userId', '==', user.uid)
//       .orderBy('createdAt', 'desc')
//       .get();

//     const users = userSnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//       // Convert Firestore timestamps to readable format
//       createdAt: doc.data().createdAt?.toDate()?.toISOString(),
//       updatedAt: doc.data().updatedAt?.toDate()?.toISOString()
//     }));

//     console.log('Fetched users:', users);
//     return users;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error;
//   }
// };


export const getTaskData = async () => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error("User not authenticated");


   
  //   const userSnapshot = await firestore()
  //   .collection('users')
  //   .where('userId', '==', user.uid)
  //   .get();
  
  // const users = userSnapshot.docs
  //   .map(doc => ({ id: doc.id, ...doc.data() }))
  //   .sort((a, b) => b.createdAt - a.createdAt); // Local sorting


 //without indexing 
    const userSnapshot = await firestore()
      .collection('users')
      .where('userId', '==', user.uid)
      .orderBy('createdAt', 'desc')
      .get();

    if (userSnapshot.empty) {
      console.log('No matching documents.');
      return [];
    }

    const users = userSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Safely convert timestamps
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null
      };
    });

    console.log('Fetched users:', users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    console.log(error.message);
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};

export const updateUser = async (id, taskData) => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error("User not authenticated");

    // Verify the user owns the document they're trying to update
    const docRef = firestore().collection('users').doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) throw new Error("Document not found");
    if (doc.data().userId !== user.uid) throw new Error("Unauthorized access");

    await docRef.update({
      ...taskData,
      updatedAt: firestore.FieldValue.serverTimestamp()
    });
    console.log('task updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error("User not authenticated");

    // Verify the user owns the document they're trying to delete
    const docRef = firestore().collection('users').doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) throw new Error("Document not found");
    if (doc.data().userId !== user.uid) throw new Error("Unauthorized access");

    await docRef.delete();
    console.log('task deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};