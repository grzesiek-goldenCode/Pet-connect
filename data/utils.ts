import { gameCell } from "@/types/types";
import { useGameStore } from "@/store/gameStore";

// check for edges to generate empty cells around game board - images can be paired on edge of board
function isEdgeCell(
  row: number,
  col: number,
  rows: number,
  cols: number
): boolean {
  return row === 0 || row === rows - 1 || col === 0 || col === cols - 1;
}

export function generateBoard(rows: number, cols: number): gameCell[] {
  const totalTiles = (rows - 2) * (cols - 2);
  console.log(totalTiles);
  const types: number[] = [];

  // generating pairs
  for (let i = 0; i < totalTiles / 2; i++) {
    const type = i % 30;
    types.push(type, type);
  }
  // random sort items in list
  types.sort(() => Math.random() - 0.5);

  const board: gameCell[] = [];
  let typeIndex = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      board.push({
        id: row * cols + col,
        value: isEdgeCell(row, col, rows, cols) ? -1 : types[typeIndex++],
        row,
        col,
      });
    }
  }
  return board;
}
export function checkMatch(
  tile1: gameCell,
  tile2: gameCell,
  rows: number,
  cols: number,
  gameBoard: gameCell[]
) {
  let match: boolean = false;
  const tilesIds: number[] = [tile1.id, tile2.id];
  // sort id to start always from lower id, no matter what was clicked first
  tilesIds.sort((a, b) => a - b);
  // check if tiles are in same column
  match = checkLine(gameBoard, tile1, tile2, tilesIds, cols);

  if (!match) {
    match = checkOneAngle(gameBoard, tilesIds, cols);
  }
  if (!match) {
    match = checkTwoAngles(tilesIds, gameBoard, cols);
  }

  return match;
}

function checkLine(
  gameBoard: gameCell[],
  tile1: gameCell,
  tile2: gameCell,
  tilesIds: number[],
  cols: number
) {
  let match: boolean = false;

  if (tile1.col === tile2.col) {
    // iterate to check if other tiles in column are empty
    for (let i = tilesIds[0] + cols; i < tilesIds[1]; i += cols) {
      if (gameBoard[i].value !== -1) {
        return false;
      }
    }
    return true;
    // check if tiles are in same row
  } else if (tile1.row === tile2.row) {
    // iterate to check if tiles can be connected in straight line
    for (let i = tilesIds[0] + 1; i < tilesIds[1]; i++) {
      if (gameBoard[i].value !== -1) {
        return false;
      }
    }
    return true;
  }
  return false;
}
function checkOneAngle(
  gameBoard: gameCell[],
  tilesIds: number[],
  cols: number
) {
  let match: boolean = false;

  const pointOne = gameBoard.findIndex(
    ({ col, row }) =>
      gameBoard[tilesIds[0]].row === row && gameBoard[tilesIds[1]].col === col
  );
  const pointTwo = gameBoard.findIndex(
    ({ col, row }) =>
      gameBoard[tilesIds[1]].row === row && gameBoard[tilesIds[0]].col === col
  );

  if (gameBoard[pointOne].value === -1) {
    let rowClean: boolean = false;
    let colClean: boolean = false;
    // sprawdzanie co ma niższe id - punkt zaznaczony czy punkt przeciecia w danym rzedzie
    const rowLower = tilesIds[0] > pointOne ? pointOne : tilesIds[0];
    const rowHiger = tilesIds[0] > pointOne ? tilesIds[0] : pointOne;
    for (let i = rowLower; i <= rowHiger; ) {
      if (i === rowHiger) {
        rowClean = true;
        break;
      } else if (gameBoard[i + 1].value === -1 || i + 1 === rowHiger) {
        i++;
      } else {
        break;
      }
    }

    const colLower = tilesIds[1] > pointOne ? pointOne : tilesIds[1];
    const colHiger = tilesIds[1] > pointOne ? tilesIds[1] : pointOne;

    for (let i = colLower; i <= colHiger; ) {
      if (i === colHiger) {
        colClean = true;
        break;
      } else if (gameBoard[i + cols].value === -1 || i + cols === colHiger) {
        i = i + 16;
      } else {
        colClean = false;
        break;
      }
    }
    if (rowClean && colClean) {
      return (match = true);
    }
  }
  if (gameBoard[pointTwo].value === -1) {
    let rowClean: boolean = false;
    let colClean: boolean = false;
    const rowLower = tilesIds[1] > pointTwo ? pointTwo : tilesIds[1];
    const rowHiger = tilesIds[1] > pointTwo ? tilesIds[1] : pointTwo;

    for (let i = rowLower; i <= rowHiger; ) {
      if (i === rowHiger) {
        rowClean = true;
        break;
      } else if (gameBoard[i + 1].value === -1 || i + 1 === rowHiger) {
        i++;
      } else {
        break;
      }
    }

    const colLower = tilesIds[0] > pointTwo ? pointTwo : tilesIds[0];
    const colHiger = tilesIds[0] > pointTwo ? tilesIds[0] : pointTwo;

    for (let i = colLower; i <= colHiger; ) {
      if (i === colHiger) {
        colClean = true;
        break;
      } else if (gameBoard[i + cols].value === -1 || i + cols === tilesIds[1]) {
        i = i + 16;
      } else {
        colClean = false;
        break;
      }
    }

    if (rowClean && colClean) {
      return (match = true);
    } else {
      return (match = false);
    }
  } else {
    return (match = false);
  }
}

function checkTwoAngles(
  tilesIds: number[],
  gameBoard: gameCell[],
  cols: number
) {
  const p1Id = tilesIds[0];

  const col0Id = gameBoard[p1Id].row * cols;
  const col = p1Id % cols;
  const row0Id = col;
  const rowMaxId = 11 * cols + col;

  for (let i = p1Id - 1; i >= col0Id; i--) {
    const tile = gameBoard[i];
    if (tile.value !== -1) {
      break;
    }
    let checkIds = [i, tilesIds[1]];
    let match = checkOneAngle(gameBoard, checkIds, cols);

    if (match) {
      return true;
    }
  }

  for (let i = p1Id + 1; i <= col0Id + (cols - 1); i++) {
    const tile = gameBoard[i];
    if (tile.value !== -1) {
      break;
    }
    let checkIds = [i, tilesIds[1]];

    let match = checkOneAngle(gameBoard, checkIds, cols);

    if (match) {
      return true;
    }
  }

  for (let i = p1Id - cols; i >= row0Id; i -= cols) {
    const tile = gameBoard[i];
    if (tile.value !== -1) {
      break;
    }
    let checkIds = [i, tilesIds[1]];
    let match = checkOneAngle(gameBoard, checkIds, cols);

    if (match) {
      return true;
    }
  }
  for (let i = p1Id + cols; i <= rowMaxId; i += cols) {
    const tile = gameBoard[i];
    if (tile.value !== -1) {
      break;
    }
    let checkIds = [i, tilesIds[1]];
    let match = checkOneAngle(gameBoard, checkIds, cols);

    if (match) {
      return true;
    }
  }
  return false;
}

// hint search
export function findHint(
  gameBoard: gameCell[],
  rows: number,
  cols: number,
  checkMatch: (
    tile1: gameCell,
    tile2: gameCell,
    rows: number,
    cols: number,
    gameBoard: gameCell[]
  ) => boolean
): [number, number] | null {
  for (let i = 0; i < gameBoard.length; i++) {
    const tile1 = gameBoard[i];
    if (tile1.value === -1) continue; //Skip empty tile
    for (let j = i + 1; j < gameBoard.length; j++) {
      const tile2 = gameBoard[j];
      if (tile2.value === -1) continue;
      if (tile1.value === tile2.value) {
        if (checkMatch(tile1, tile2, rows, cols, gameBoard)) {
          return [tile1.id, tile2.id];
        }
      }
    }
  }
  return null;
}

export function hasAvailAbleMoves(
  gameBoard: gameCell[],
  rows: number,
  cols: number,
  checkMatch: (
    tile1: gameCell,
    tile2: gameCell,
    rows: number,
    cols: number,
    gameBoard: gameCell[]
  ) => boolean
): boolean {
  return findHint(gameBoard, rows, cols, checkMatch) !== null;
}
