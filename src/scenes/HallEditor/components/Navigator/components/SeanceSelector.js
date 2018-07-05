import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Dialog, Autocomplete } from 'react-toolbox';

// TODO: link to bl
import {
  convertToAutoCompleteSource,
  INSTITUTIONS,
  HALLS,
  SEANCES,
} from 'Scenes/HallEditor/service/resources/data';


/**
 * Seance selector dialog
 * @author Ryazanov I.A
 */
@inject('hallEditorStore')
@observer
export default class SeanceSelector extends Component {
  constructor(props) {
    super(props);
    this.store = props.hallEditorStore.seanceSelector;
  }
  render() {
    const { store } = this;
    return (
      <div className="cta-container">
        <Dialog
          className="cta-dialog"
          // actions={[{ label: 'Новый сеанс' }, { primary: true, label: 'Продолжить' }]}
          active={store.isSeanceSelectorVisible}
          onEscKeyDown={() => { store.hideSeanceSelector(); }}
          onOverlayClick={() => { store.hideSeanceSelector(); }}
        >
          <Autocomplete
            className="cta-autocomplete"
            direction="down"
            value={store.theater.id}
            multiple={false}
            label="Выбранное заведение"
            error={store.theater.error}
            onChange={(ev, val) => { store.selectInstitution(ev, val); }}
            source={convertToAutoCompleteSource(INSTITUTIONS, 'id', 'title')}
          />
          <Autocomplete
            className="cta-autocomplete"
            direction="down"
            value={store.hall.id}
            error={store.hall.error}
            multiple={false}
            label="Выбранный зал"
            onChange={(ev, val) => { store.selectHall(ev, val); }}
            source={convertToAutoCompleteSource(HALLS, 'id', 'title')}
          />
          <Autocomplete
            className="cta-autocomplete"
            direction="down"
            value={store.seance.id}
            error={store.seance.error}
            multiple={false}
            label="Выбранный сеанс"
            onChange={(ev, val) => { store.selectSeance(ev, val); }}
            source={convertToAutoCompleteSource(SEANCES, 'id', 'title')}
          />
        </Dialog>
      </div>
    );
  }
}
