/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens';
import Posts from './screens/Component/Posts';
import PostDetail from './screens/Component/PostDetail';
import { Provider } from 'react-redux';
import store from './redux/store/store'


type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createStackNavigator()

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen
            name="Login" options={{
              title: 'Welcome Back!', headerStyle: {
                backgroundColor: '#fff',
              }, headerTitleStyle: {
                color: '#0D094E',
                fontSize: 30,
                marginTop: 20,
                fontWeight: 'bold'
              }
            }} component={LoginScreen} />
          <Stack.Screen
            name="Posts"
            options={{
              headerStyle: {
                backgroundColor: '#fff',
              }, headerTitleStyle: {
                color: '#0D094E',
                fontSize: 20,
                fontWeight: 'bold',

              }
            }}
            component={Posts} />
          <Stack.Screen
            options={{
              headerStyle: {
                backgroundColor: '#fff',
              }, headerTitleStyle: {
                color: '#0D094E',
                fontSize: 20,
                fontWeight: 'bold',

              }
            }}
            name="PostDetail" component={PostDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


export default App;
