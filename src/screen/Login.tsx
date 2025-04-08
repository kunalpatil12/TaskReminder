

// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
//     KeyboardAvoidingView,
//     Platform,
//     SafeAreaView,
//     ScrollView,
//     Alert,
//     Button,
// } from 'react-native';
// import { registerUser } from '../services/auth';

// const Login = ({navigation}) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword,setConfirmPassword]=useState('');


//     const handleLogin =async () => {
//         if (!email || !password) {
//             Alert.alert('Please enter both email and password');
//             return;
//         }
//         if(password !== confirmPassword){
//             Alert.alert('Please enter same password in both fields');
//             return;
//         }

//         try {
//                     console.log("this is in login function")
//                     await registerUser(email,password);
//                     Alert.alert('success','varification emai is send');
//                     setEmail('');
//                     setPassword('');
//                   } catch (error) {
//                     Alert.alert('Error registering user:',error.message);
//                   }
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <KeyboardAvoidingView 
//                 behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
//                 style={styles.keyboardContainer}
//             >
               
//                     <View style={styles.innerContainer}>
//                         <Text style={{marginTop:50,color:'green',fontSize:22}}>Welcome Back!</Text>
//                         <Text style={styles.subtitle}>Sign in to continue</Text>

//                         {/* Email Field */}
//                         <View style={styles.inputContainer}>
//                             <Text style={styles.label}>Email</Text>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Enter your email"
//                                 placeholderTextColor="#ccc"
//                                 keyboardType="email-address"
//                                 autoCapitalize="none"
//                                 autoCorrect={false}
//                                 value={email}
//                                 onChangeText={setEmail}
//                             />
//                         </View>

//                         {/* Password Field */}
//                         <View style={styles.inputContainer}>
//                             <Text style={styles.label}>Password</Text>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Enter your password"
//                                 placeholderTextColor="#ccc"
//                                 secureTextEntry
//                                 autoCapitalize="none"
//                                 autoCorrect={false}
//                                 value={password}
//                                 onChangeText={setPassword}
//                             />
//                         </View>

//                         <View style={styles.inputContainer}>
//                             <Text style={styles.label}>Confirm Password</Text>
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Confirm your password"
//                                 placeholderTextColor="#ccc"
//                                 secureTextEntry
//                                 autoCapitalize="none"
//                                 autoCorrect={false}
//                                 value={confirmPassword}
//                                 onChangeText={setConfirmPassword}
//                             />
//                         </View>

//                         {/* Login Button */}
//                         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//                             <Text style={styles.buttonText}>Login</Text>
//                         </TouchableOpacity>

//                         <Button
//         title="Go to Register"
//         onPress={() => navigation.navigate('Register')}
//       />
//                     </View>
              
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
// };

// export default Login;

// const styles = StyleSheet.create({
//     container: {
//         justifyContent:'space-between',
        
//     },
//     keyboardContainer: {
//         flex: 1,
//     },
//     scrollView: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         paddingHorizontal: 20,
//     },
//     innerContainer: {
//         flexDirection:'column',
//         justifyContent:'space-between',
//         alignItems: 'center',
//         width: '100%',
//     },
//     title: {
//         fontSize: 26,
//         fontWeight: 'bold',
//         color: 'red',
//         marginBottom: 5,
//     },
//     subtitle: {
//         fontSize: 16,
//         color: 'red',
//         marginBottom: 30,
//     },
//     inputContainer: {
//         flex:1,
//         paddingHorizontal:20,
//         flexDirection:"column",
//         width: '100%',
//         backgroundColor:'pink',
//         marginBottom: 65,  // Reduced margin to fix spacing
//     },
//     label: {
//         fontSize: 14,
//         color: '#fff',
//         marginBottom: 5,
//     },
//     input: {
//         height: 50,
//         backgroundColor: '#333',
//         color: '#fff',
//         borderRadius: 8,
//         paddingHorizontal: 15,
//         fontSize: 16,
//     },
//     button: {
//         height: 50,
//         width: '100%',
//         backgroundColor: '#ff6f00',
//         borderRadius: 8,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 10,
//         elevation: 3,
//         shadowColor: '#ff6f00',
//         shadowOffset: { width: 0, height: 3 },
//         shadowOpacity: 0.4,
//         shadowRadius: 4,
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Alert,
  Button,
  ScrollView,
  Dimensions
} from 'react-native';
import { loginUser } from '../services/auth';
import { useAuth } from '../context/AuthContext';

const Login = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      await login(email,password,name);
            Alert.alert('Success', 'You are login');
            console.log(name , "before to nevigate home ");
            navigation.navigate('Home',{name});
  
     
    } catch (error) {
      Alert.alert('Error', error.message);
      setName('');
      setEmail('');
      setPassword('');
    }
  };

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
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>


            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your Name"
                placeholderTextColor="#999"
                keyboardType="default"
                autoCapitalize="words"
                autoCorrect={true}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
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

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              {/* <Button
                title="Don't have an account? Register"
                onPress={() => navigation.navigate('Register')}
              /> */}

<TouchableOpacity style={{marginTop:20, alignContent:'center',alignItems:'flex-end'}} onPress={() => navigation.navigate('Register')}>
                <Text style={[styles.buttonText,{color:'skyblue'}]}>Don't have an account? Register</Text>
              </TouchableOpacity>

<TouchableOpacity style={{marginTop:20, alignContent:'center',alignItems:'flex-end'}} onPress={()=>navigation.navigate('ForgotPassword')}>
                <Text style={[styles.buttonText,{color:'skyblue'}]}>Reset Password ?</Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: Dimensions.get('window').height - 100,
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    height: 50,
    backgroundColor: '#ff6f00',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;