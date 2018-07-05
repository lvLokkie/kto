import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import uniqueKey from 'unique-key';

import Cell from './Cell';

/**
 * Hall`s row
 * @author Ryazanov I.A
 */
@inject('hallEditorStore')
@observer
export default class Row extends Component {
  constructor(props) {
    super(props);
    this.store = props.hallEditorStore;
  }
  render() {
    const { rowMap } = this.props;
    return (
      <tr className="cta-hall__row">
        { rowMap.map((cell, i) => (
          <Cell
            key={uniqueKey(16, i)}
            cell={cell}
          />)) }
      </tr>
    );
  }
}
