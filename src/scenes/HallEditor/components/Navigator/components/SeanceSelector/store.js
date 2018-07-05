import { observable, action, computed } from 'mobx';

/**
 * Seance selector state store
 * @author Ryazanov Ivan
 */
export default class SeanceSelectorStore {
  @observable isSeanceSelectorVisible = false;
  @observable selectedTheater = {
    id: 1,
    title: 'Тюменский драматический театр',
    error: null,
  };
  @observable selectedHall = {
    id: 1,
    title: 'Большой зал',
    error: null,
  };
  @observable selectedSeance = {
    id: 1,
    title: 'Горе от ума',
    date: new Date(),
    error: null,
  };

  @computed get theater() {
    return this.selectedTheater;
  }

  @computed get hall() {
    return this.selectedHall;
  }

  @computed get seance() {
    return this.selectedSeance;
  }

  @computed get seanceCaption() {
    const { seance } = this;
    return `${seance.title} (${seance.date.toLocaleDateString()})`;
  }

  @action showSeanceSelector() {
    this.isSeanceSelectorVisible = true;
  }

  @action hideSeanceSelector() {
    this.isSeanceSelectorVisible = false;
  }

  // @action selectInstitution(ev, val) {
  //   console.log(val);
  // }
  //
  // @action selectHall(ev, val) {
  //   console.log(val);
  // }
  //
  // @action selectSeance(ev, val) {
  //   console.log(val);
  // }
}
