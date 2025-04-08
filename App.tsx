
// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { StyleSheet, View } from 'react-native';
// import Login from './src/screen/Login';
// import HomeScreen from './src/screen/HomeScreen';
// import Register from './src/screen/Register';


// function App(): React.JSX.Element {

// const Stack=createStackNavigator();

//   return (
//    <NavigationContainer>
//     <Stack.Navigator initialRouteName='Login'>
//     <Stack.Screen name="Login" component={Login}/>
//     <Stack.Screen name="Register" component={Register} />
//     <Stack.Screen name="Home" component={HomeScreen}/>


//     </Stack.Navigator>

//    </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;


// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Login from './src/screen/Login';
// import Register from './src/screen/Register';
// import HomeScreen from './src/screen/HomeScreen';
// import AddUserScreen  from './src/screen/AddUserScreen';

// import UserListScreen from './src/screen/UserListScreen';
// import EditUserScreen from './src/screen/EditUserScreen';
// import ForgotPassword from './src/screen/ForgotPassword';

// const Stack = createStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home" >
//         {/* <Stack.Screen name="Login" component={Login} options={
//           {headerShown:false,}
//         }/>
//         <Stack.Screen name="Register" component={Register} options={
//           {headerShown:false,}
//         } />
//          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={
//           {headerShown:false,}
//         } /> */}
//         <Stack.Screen name="Home" component={HomeScreen} options={
//           {headerShown:false,}
//         }/>

// <Stack.Screen name="UserListScreen" component={UserListScreen} />
//         <Stack.Screen name="AddUser" component={AddUserScreen} />
//         <Stack.Screen name="EditUser" component={EditUserScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;




// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import Login from './src/screen/Login';
import Register from './src/screen/Register';
import HomeScreen from './src/screen/HomeScreen';
import AddUserScreen from './src/screen/AddUserScreen';
import UserListScreen from './src/screen/UserListScreen';
import EditUserScreen from './src/screen/EditUserScreen';
import ForgotPassword from './src/screen/ForgotPassword';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ headerShown: false }}
    />
    <Stack.Screen name="UserListScreen" component={UserListScreen} />
    <Stack.Screen name="AddUser" component={AddUserScreen} />
    <Stack.Screen name="EditUser" component={EditUserScreen} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <AppStack /> : <AuthStack />;
};

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;