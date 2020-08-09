/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, StatusBar, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Game from './Game';

const App: () => React$Node = () => {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView>
        <View styles={styles.sectionContainer}>
          <Text style={styles.sectionDescription}>
            Tick Tac Toe Hiver Assignment
          </Text>
          <Game
            setCurrentPlayer={player => {
              setCurrentPlayer(player);
            }}
          />
          <Text style={styles.sectionDescription}>
            Player {currentPlayer} turn
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 50,
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
