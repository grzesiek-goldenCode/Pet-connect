import { gameCell } from "@/types/types";

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
