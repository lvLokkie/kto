import React, { Component } from 'react';
import cn from 'classnames';
import { observer, inject } from 'mobx-react';
import ArrowKeysReact from 'arrow-keys-react';


/**
 * Hall`s cell
 * @author Ryazanov I.A
 */
@inject('hallEditorStore')
@observer
export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.store = props.hallEditorStore.getHallStore();
    ArrowKeysReact.config({
      left: () => { this.store.selectCellLeft(); },
      right: () => { this.store.selectCellRight(); },
      up: () => { this.store.selectCellUp(); },
      down: () => { this.store.selectCellDown(); },
    });
  }

  componentDidUpdate() {
    if (this.props.cell.isSelected) {
      this.td.focus();
    }
  }

  onKeyPress(ev) {
    if (ev) ev.preventDefault();
    if (ev.charCode === 13 || ev.charCode === 32) {
      const { currentCell } = this.store;
      this.store.toggleSeat(currentCell);
    }
  }

  render() {
    const { cell } = this.props;
    const classNames = cn({
      'cta-hall__seat': true,
      'cta-hall__seat_disabled': !cell.seat,
      'cta-hall__seat_selected': cell.isSelected,
    });
    return (
      <td
        role="gridcell"
        ref={(td) => { this.td = td; }}
        tabIndex={cell.rowIndex}
        className={classNames}
        title={cell.title}
        onKeyPress={(e) => { this.onKeyPress(e); }}
        onFocus={() => (this.store.selectCell(cell))}
        {...ArrowKeysReact.events}
      />
    );
  }
}
