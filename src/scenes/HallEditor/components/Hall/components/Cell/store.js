import { observable, computed, action } from 'mobx';

/**
 * Cell store
 * @author Ryazanov Ivan
 */
export default class Cell {
  /**
   * Is cell focused?
   * @type {Boolean}
   */
  @observable isSelected;
  /**
   * Attached seat
   * @type {Seat | null}
   */
  @observable seat;

  /**
   * Cell constructor
   * @param {Number} rowIndex
   * @param {Number} colIndex
   * @param {Seat} [seat=null]
   * @param {Object} options
   */
  constructor(rowIndex, colIndex, seat = null, options = {}) {
    this.row = rowIndex;
    this.cell = colIndex;
    this.seat = seat;
    this.isSelected = !!options.isSelected;
  }

  /**
   * Get real cell`s array row index
   * @returns {Number}
   */
  @computed get rowIndex() {
    return this.row;
  }

  /**
   * Get real cell`s array cell index
   * @returns {Number}
   */
  @computed get cellIndex() {
    return this.cell;
  }

  /**
   * Get cell`s title for user displaying
   * @returns {String}
   */
  @computed get title() {
    return `Ряд ${this.rowNumber} ячейка ${this.cellNumber}`;
  }

  /**
   * Has this cell seat?
   * @returns {Boolean}
   */
  @computed get hasSeat() {
    return !!this.seat;
  }

  /**
   * Rows`s number for user displaying
   * @returns {Number}
   */
  @computed get rowNumber() {
    return this.rowIndex + 1;
  }

  /**
   * Cell`s number for user displaying
   * @returns {Number}
   */
  @computed get cellNumber() {
    return this.cellIndex + 1;
  }

  /**
   * Set focus on cell
   * @param {Boolean} isSelected
   */
  @action setSelection(isSelected) {
    this.isSelected = isSelected;
  }

  /**
   * Attach seat to cell
   * @param {Seat} seat
   */
  @action attachSeat(seat) {
    this.seat = seat;
  }

  /**
   * Remove seat from cell
   * @returns {Boolean}
   */
  removeSeat() {
    this.attachSeat(null);
  }

  /**
   * Is this cell equals another cell?
   * @param {Cell} cell
   * @returns {Boolean}
   */
  isEqual(cell) {
    return cell &&
      this.rowIndex === cell.rowIndex &&
      this.cellIndex === cell.cellIndex;
  }
}
