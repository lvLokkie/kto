import { observable, action } from 'mobx';

/**
 * App state mobx store
 */
export default class AppStore {
  @observable authenticated = false;
  @observable authenticating = false;
  @observable mark = true;


  @action
  toggleMark() {
    this.mark = !this.mark;
  }

  @action
  authenticate() {
    this.authenticated = true;
    this.authenticating = false;
  }
}
