import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'react-toolbox';
import SeatEditor from './Hall/components/SeatEditor';

/**
 * Cell editor
 * @author Ryazanov I.A
 */
@inject('hallEditorStore')
@observer
export default class CellEditor extends Component {
  constructor(props) {
    super(props);
    this.store = props.hallEditorStore.getHallStore();
  }


  render() {
    const { currentCell } = this.store;
    return (
      <div className="cta-hall-editor__cell-editor">
        {
           currentCell
              ? <SeatEditor {...currentCell.seat} />
              : <Button disabled label="Ячейка не выбрана" />
        }
      </div>
    );
  }
}
