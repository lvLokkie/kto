import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Snackbar } from 'react-toolbox';

import Navigator from './components/Navigator';
import Hall from './components/Hall';
import CellEditor from './components/Editor';

@inject('hallEditorStore')
@observer
export default class HallEditor extends Component {
  constructor(props) {
    super(props);
    this.store = props.hallEditorStore;
  }

  render() {
    const { store } = this;
    return (
      <div
        className="cta-hall-editor"
      >
        <div className="cta-hall-editor__head">
          <Navigator />
          <CellEditor />
        </div>
        <Hall
          className="cta-hall-editor__hall"
          maxRow={100}
          maxCell={100}
        />
        <Snackbar
          active={store.isSnackbarVisible}
          label={store.snackbarMessage}
          onTimeout={() => store.hideSnackbar()}
          timeout={3000}
        />
      </div>
    );
  }
}
