import { observable, action, computed } from 'mobx';
import Cell from './components/Cell/store';
import Seat from './components/Seat/store';

/**
 * Hall store
 * @author Ryazanov Ivan
 */
export default class HallStore {
  @observable cellsMap = null;
  @observable selectedCell = null;

  @computed get currentCell() {
    return this.selectedCell;
  }

  @computed get hasNeighbors() {
    return this.cellsMap[this.currentCell.rowIndex].some(cell => cell.hasSeat);
  }

  @computed get nextSeat() {
    const { currentCell } = this;
    const neighbors = this.getSeatsOnRow(currentCell.rowIndex);
    if (neighbors && neighbors.length) {
      return neighbors.find(cell => currentCell.cellIndex < cell.cellIndex);
    }
    return null;
  }

  @computed get previousSeat() {
    const { currentCell } = this;
    const neighbors = this.getSeatsOnRow(currentCell.rowIndex);
    if (neighbors && neighbors.length) {
      const prevSeats = neighbors.filter(neighbor => neighbor.cellIndex < currentCell.cellIndex);
      if (prevSeats && prevSeats.length) {
        return prevSeats.pop();
      }
    }
    return null;
  }

  @computed get previousRowNumber() {
    const { currentCell } = this;
    let rowsCount = 0;
    for (let rowIndex = 0; currentCell.rowIndex > rowIndex; rowIndex += 1) {
      if (this.cellsMap[rowIndex].some(cell => cell.hasSeat)) {
        rowsCount += 1;
      }
    }
    return rowsCount;
  }

  /**
   * Create empty cells map
   * @param {Number} maxRow
   * @param {Number} maxCol
   */
  @action createEmptyCellsMap(maxRow, maxCol) {
    const rows = [maxRow];
    for (let rowIndex = 0; rowIndex < maxRow; rowIndex += 1) {
      rows[rowIndex] = [maxCol];
      for (let cellIndex = 0; cellIndex < maxCol; cellIndex += 1) {
        rows[rowIndex][cellIndex] = new Cell(rowIndex, cellIndex, null, {
          isSelected: false,
        });
      }
    }
    this.cellsMap = rows;
  }

  /**
   * Select cell
   * @param {Cell} cell
   */
  @action selectCell(cell) {
    if (this.currentCell && !cell.isEqual(this.currentCell)) {
      this.currentCell.setSelection(false);
    }
    cell.setSelection(true);
    this.selectedCell = cell;
  }

  /**
    * Creates new seat obj at cell with precalculated row and cell numbers
    * @param {Cell} cell
    * @returns {Seat}
    */
  createSeat(cell) {
    let seatNumber = 1;
    let rowNumber = 1;
    let nearestNeighbor;

    if (this.hasNeighbors) {
      nearestNeighbor = this.previousSeat;
      if (nearestNeighbor) {
        seatNumber = nearestNeighbor.seat.number + 1;
      } else {
        nearestNeighbor = this.nextSeat;
        seatNumber = 1;
      }
      ({ rowNumber } = nearestNeighbor.seat);
    } else {
      rowNumber = this.previousRowNumber + 1;
    }

    return new Seat(cell, rowNumber, seatNumber);
  }

  /**
   * Add or remove seat from cell
   * Perform recalculating of all seats map indices
   * @param {Cell} cell
   */
  toggleSeat(cell) {
    if (cell.hasSeat) {
      this.shiftSeats(cell.rowIndex, cell.cellIndex + 1, -1);
      cell.removeSeat();
      if (!this.hasNeighbors) {
        this.shiftRows(cell.rowIndex + 1, -1);
      }
    } else {
      const seat = this.createSeat(cell);
      this.shiftSeats(seat.cell.rowIndex, seat.cell.cellIndex + 1, 1);
      this.shiftRows(seat.cell.rowIndex + 1, 1);
      cell.attachSeat(seat);
    }
  }

  /**
   * Shift all seats on row after startIndex
   * @param {Number} rowIndex
   * @param {Number} startIndex
   * @param {Number} shift
   */
  shiftSeats(rowIndex, startIndex, shift) {
    let cell;
    for (let cellIndex = startIndex; cellIndex < this.cellsMap[rowIndex].length; cellIndex += 1) {
      cell = this.cellsMap[rowIndex][cellIndex];
      if (cell.hasSeat) {
        cell.seat.number += shift;
      }
    }
  }

  /**
   * Shift all seats on rows after startRowIndex
   * @param {Number} startRow
   * @param {Number} shift shift count
   */
  shiftRows(startRow, shift) {
    for (let rowIndex = startRow; rowIndex < this.cellsMap.length; rowIndex += 1) {
      for (let cellIndex = 0; cellIndex < this.cellsMap[rowIndex].length; cellIndex += 1) {
        if (this.cellsMap[rowIndex][cellIndex].hasSeat) {
          this.cellsMap[rowIndex][cellIndex].seat.rowNumber += shift;
        }
      }
    }
  }

  /**
   * Select cell by indices
   * @param {Number} rowIndex
   * @param {Number} cellIndex
   */
  selectCellByIndices(rowIndex, cellIndex) {
    const targetCell = this.getCellByIndices(rowIndex, cellIndex);
    if (targetCell) {
      this.selectCell(targetCell);
    }
  }

  /**
   * Move current cell up
   */
  selectCellUp() {
    const oldCell = this.getCurrentOrFirstCell();
    this.selectCellByIndices(oldCell.rowIndex - 1, oldCell.cellIndex);
  }

  /**
   * Move current cell down
   */
  selectCellDown() {
    const oldCell = this.getCurrentOrFirstCell();
    this.selectCellByIndices(oldCell.rowIndex + 1, oldCell.cellIndex);
  }

  /**
   * Move current cell right
   */
  selectCellRight() {
    const oldCell = this.getCurrentOrFirstCell();
    this.selectCellByIndices(oldCell.rowIndex, oldCell.cellIndex + 1);
  }

  /**
   * Move current cell left
   */
  selectCellLeft() {
    const oldCell = this.getCurrentOrFirstCell();
    this.selectCellByIndices(oldCell.rowIndex, oldCell.cellIndex - 1);
  }

  /**
   * Get indices of current or first cell
   * @returns {Cell}
   */
  getCurrentOrFirstCell() {
    return this.currentCell || this.getCellByIndices(0, 0);
  }

  /**
   * Get cell by indices
   * @param {Number} rowIndex > 0
   * @param {Number} cellIndex > 0
   * @returns {Cell | Boolean} false if not exists
   */
  getCellByIndices(rowIndex, cellIndex) {
    return this.cellsMap && this.cellsMap[rowIndex] && this.cellsMap[rowIndex][cellIndex];
  }

  getSeatsOnRow(rowIndex) {
    return this.scanRow(rowIndex, neighbor => neighbor.hasSeat);
  }

  /**
   * Get all cells on row by filter
   * @param {Number} rowIndex
   * @param {Function} filterFunc
   * @returns {Object[]}
   */
  scanRow(rowIndex, filterFunc) {
    return this.cellsMap[rowIndex].filter(filterFunc);
  }
}
