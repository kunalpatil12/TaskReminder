// import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
// import React from 'react'
// import { sendPasswordResetEmail } from '../services/auth'

// const ForgotPassword = ({navigation}) => {
//     const [email, setEmail] = React.useState('')
    
//     const handleForgotPassword=async()=>{
//         if(!email){
//             Alert.alert('Please enter your email')
//             return;
//         }
//         try {
//             await sendPasswordResetEmail(email);
//             Alert.alert('Password reset email sent to your email')
//             setEmail('');
//         } catch (error) {
//             Alert.alert('Error',error.message);
//         }
//     }

//   return (
//     <View>
//       <Text>ForgotPassword</Text>

//        <View >
//                     <Text >Email</Text>
//                     <TextInput
//                       placeholder="Enter your email"
//                       placeholderTextColor="#999"
//                       keyboardType="email-address"
//                       autoCapitalize="none"
//                       autoCorrect={false}
//                       value={email}
//                       onChangeText={setEmail}
//                     />
//                   </View>

//             <TouchableOpacity  onPress={handleForgotPassword}>
//                             <Text >Resest Password</Text>
//                           </TouchableOpacity>

//                           <TouchableOpacity   onPress={() => navigation.goBack()}>
//                             <Text >Back to Login</Text>
//                           </TouchableOpacity>
            
//     </View>
//   )
// }

// export default ForgotPassword


import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Image,
    Dimensions,
    ScrollView
  } from 'react-native';
  import React from 'react';
  import { sendPasswordResetEmail } from '../services/auth';
  
  const ForgotPassword = ({navigation}) => {
      const [email, setEmail] = React.useState('');
      
      const handleForgotPassword = async() => {
          if(!email){
              Alert.alert('Error', 'Please enter your email');
              return;
          }
          try {
              await sendPasswordResetEmail(email);
              Alert.alert('Success', 'Password reset email sent to your email');
              setEmail('');
          } catch (error) {
              Alert.alert('Error', error.message);
              setEmail(''); 
          }
      }
  
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
               behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
               style={styles.keyboardContainer}
               keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
             >
               <ScrollView
                 contentContainerStyle={styles.scrollContainer}
                 keyboardShouldPersistTaps="handled"
               >
          <View style={styles.innerContainer}>
           
            
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>
  
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
              />
            </View>
  
            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={handleForgotPassword}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>
  
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
              activeOpacity={0.6}
            >
              <Text style={styles.backButtonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1E1E1E',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        minHeight: Dimensions.get('window').height - 100,
      },
    keyboardContainer: {
      flex: 1,
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 30,
    },
    image: {
      width: 200,
      height: 200,
      alignSelf: 'center',
      marginBottom: 30,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 10,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: '#fff',
      marginBottom: 40,
      textAlign: 'center',
    },
    inputContainer: {
      marginBottom: 25,
    },
    label: {
      fontSize: 14,
      color: '#fff',
      marginBottom: 8,
      fontWeight: '500',
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 15,
      fontSize: 16,
      backgroundColor: '#f9f9f9',
    },
    resetButton: {
      height: 50,
      backgroundColor: '#4A90E2',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      elevation: 3,
      shadowColor: '#4A90E2',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    backButton: {
      marginTop: 20,
      alignSelf: 'center',
    },
    backButtonText: {
      color: '#4A90E2',
      fontSize: 14,
      fontWeight: '500',
    },
  });
  
  export default ForgotPassword;