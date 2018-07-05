import { observable, action } from 'mobx';

import Hall from './components/Hall/store';
import SeanceSelector from './components/Navigator/components/SeanceSelector/store';


/**
 * Hall editor page store
 * @author Ivan Ryazanov
 */
class HallEditorStore {
  @observable hall = new Hall();
  @observable seanceSelector = new SeanceSelector();
  @observable isSnackbarVisible = false;
  @observable snackbarMessage = '';

  getHallStore() {
    return this.hall;
  }

  @action showSnackbar(message) {
    this.snackbarMessage = message;
    this.isSnackbarVisible = true;
  }

  @action hideSnackbar() {
    this.isSnackbarVisible = false;
    this.snackbarMessage = '';
  }
}

const hallEditorStore = new HallEditorStore();
export default hallEditorStore;
export { HallEditorStore };
