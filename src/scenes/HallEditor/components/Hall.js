import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import uniqueKey from 'unique-key';

import Row from './Hall/components/Row';

/**
 * Hall grid
 * @author Ryazanov I.A
 */
@inject('hallEditorStore')
@observer
export default class Hall extends Component {
  constructor(props) {
    super(props);
    this.store = props.hallEditorStore;
  }

  render() {
    const hallStore = this.store.getHallStore();

    if (!hallStore.cellsMap) {
      const { maxRow, maxCell } = this.props;
      hallStore.createEmptyCellsMap(maxRow, maxCell);
    }

    return (
      <div role="grid" className="cta-hall">
        <div className="cta-hall__scene">
          Сцена
        </div>
        <table className="cta-hall__rows">
          <tbody>
            { hallStore.cellsMap
              .map((el, i) => (
                <Row
                  key={uniqueKey(16, i)}
                  rowMap={el}
                />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
