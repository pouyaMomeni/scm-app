import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navigator from 'src/navigator';
import FlashMessage from 'react-native-flash-message';
import { Provider } from 'react-redux';
import store from 'src/store';

export default function App() {


  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Navigator/>
        <FlashMessage position='bottom'  />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : '#fff',
    padding : 15,
  },
});

// https://coolors.co/palette/0d1b2a-1b263b-415a77-778da9-e0e1dd
