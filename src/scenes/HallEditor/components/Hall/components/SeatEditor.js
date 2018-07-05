import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Switch } from 'react-toolbox';

/**
 * Seat editor
 * @author Ryazanov I.A
 */
@inject('hallEditorStore')
@observer
export default class SeatEditor extends Component {
  constructor(props) {
    super(props);
    this.store = props.hallEditorStore.getHallStore();
  }

  render() {
    const { currentCell } = this.store;
    const { seat } = currentCell;
    return (
      <div className="cta-hall-editor__seat-editor">
        <Switch
          className="cta-hall-editor__cell-activator"
          checked={!!seat}
          label={seat ? 'Вкл' : 'Выкл'}
          onChange={() => { this.store.toggleSeat(currentCell); }}
        />
        <Input
          disabled={!seat}
          className="cta-hall-editor__input"
          label="Ряд"
          type="numeric"
          value={seat ? this.store.currentCell.seat.rowNumber : 0}
        />
        <Input
          disabled={!seat}
          className="cta-hall-editor__input"
          label="Место"
          type="numeric"
          value={seat ? this.store.currentCell.seat.number : 0}
        />
      </div>
    );
  }
}
