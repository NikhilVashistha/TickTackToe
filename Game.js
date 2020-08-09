import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, TouchableHighlight, Alert} from 'react-native';

const GRID_LENGTH = 3;
let turn = 'X';
let gameActive = true;

const Game = ({setCurrentPlayer}) => {
  const [grid, setGrid] = useState([]);

  const initializeGrid = () => {
    const tempGrid = [];
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
      const tempArray = [];
      for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
        tempArray.push(0);
      }
      tempGrid.push(tempArray);
    }
    setGrid(tempGrid);
  };

  const getBox = (index, colIdx, rowIdx) => {
    let backgroundColor = 'red';
    const sum = colIdx + rowIdx;
    if (sum % 2 === 0) {
      backgroundColor = 'blue';
    }
    const gridValue = grid[colIdx][rowIdx];
    let content = '-';
    if (gridValue === 1) {
      content = 'X';
    } else if (gridValue === 2) {
      content = 'O';
    }
    return (
      <TouchableHighlight
        key={`row_${index}`}
        onPress={() => {
          onPress(colIdx, rowIdx, turn === 'X' ? 1 : 2);
        }}
        underlayColor={'#ccc'}
        style={{
          ...styles.boxStyle,
          borderStartWidth: rowIdx === 0 ? 0 : 2,
          borderTopWidth: colIdx === 0 ? 0 : 2,
        }}>
        <Text style={styles.contentStyle}>{content}</Text>
      </TouchableHighlight>
    );
  };

  const onPress = (colIdx, rowIdx, figure) => {
    /*
      Check whether the call has already been played,
      or if the game is paused. If either of those is true we will simply ignore the click.
    */
    if (!gameActive || grid[colIdx][rowIdx] !== 0) {
      return;
    }

    const tempGrid = [...grid];

    /*
      Update our internal game state to reflect the played move,
      as well as update the user interface to reflect the played move
    */
    tempGrid[colIdx][rowIdx] = figure;

    setGrid(tempGrid);
  };

  const getRow = (row, colIdx) => {
    return row.map((item, index) => {
      return getBox(index, colIdx, index);
    });
  };

  const getColumns = () => {
    return grid.map((row, index) => {
      return (
        <View style={styles.rowStyle} key={`column_${index}`}>
          {getRow(row, index)}
        </View>
      );
    });
  };

  const renderMainGrid = () => {
    return (
      <View style={styles.mainContainerStyle}>
        <View style={styles.columnsStyle}>{getColumns()}</View>
      </View>
    );
  };

  const checkWinner = gameState => {
    // Having all winning conditions in array including rows, columns and diagonal
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];

      // Skip the position if any of the items are not selected
      if (a === 0 || b === 0 || c === 0) {
        continue;
      }

      // Player win if a, b and c matches
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      // user wins show dialog
      showMsg(`Player ${turn} has won!`);
      gameActive = false;
      return;
    }

    /*
      Check weather there are any values in our game state array
      that are still not populated with a player sign
    */

    let roundDraw = !gameState.includes(0);
    if (roundDraw) {
      // game draw show dialog
      showMsg('Game ended in a draw!');
      gameActive = false;
      return;
    }

    /*
      No one won the game yet, and there are still moves to be played,
      so we continue by changing the current player.
    */

    if (turn === 'X') turn = 'O';
    else turn = 'X';

    setCurrentPlayer(turn);
  };

  /*
      Function will reset the game
  */
  const resetGame = () => {
    initializeGrid();
    gameActive = true;
    turn = 'X';
    setCurrentPlayer(turn);
  };

  const showMsg = msg => {
    Alert.alert(
      'Game Finish',
      msg,
      [{text: 'Restart Game', onPress: () => resetGame()}],
      {cancelable: false},
    );
  };

  useEffect(() => {
    if (grid.length !== 0) {
      checkWinner([].concat(...grid));
    }
  }, [grid]);

  useEffect(() => {
    initializeGrid();
  }, []);

  if (grid.length === 0) {
    return <Text> initializing </Text>;
  }
  return renderMainGrid();
};

const styles = StyleSheet.create({
  mainContainerStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  columnsStyle: {
    flexDirection: 'column',
  },
  rowStyle: {
    flexDirection: 'row',
  },
  boxStyle: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentStyle: {
    fontSize: 20,
  },
});

export default Game;
