import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'react-toolbox';

import SeanceSelector from './Navigator/components/SeanceSelector';

/**
 * Hall editor navigator
 * @author Ryazanov I.A
 */
@inject('hallEditorStore')
@observer
export default class Navigator extends Component {
  constructor(props) {
    super(props);
    this.seanceSelectorStore = props.hallEditorStore.seanceSelector;
  }

  render() {
    const { seanceSelectorStore } = this;
    return (
      <div className="cta-hall-editor__navigator">
        <div className="cta-hall-editor__navigator-title" />
        <div className="cta-hall-editor__navigator-actions">
          <Button
            className="cta-hall-editor__chooseButton"
            label={seanceSelectorStore.theater.title}
            onClick={() => seanceSelectorStore.showSeanceSelector()}
          />
          <Button
            className="cta-hall-editor__chooseButton"
            label={seanceSelectorStore.hall.title}
            onClick={() => seanceSelectorStore.showSeanceSelector()}
            primary
          />
          <Button
            className="cta-hall-editor__chooseButton"
            label={seanceSelectorStore.seanceCaption}
            onClick={() => seanceSelectorStore.showSeanceSelector()}
            accent
          />
        </div>
        <SeanceSelector />
      </div>
    );
  }
}
