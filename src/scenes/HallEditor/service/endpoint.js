/**
 * @author Ryazanov I.A
 * Data loading component
 */

import {
  INSTITUTIONS,
  HALLS,
  HALL_SECTIONS,
  SEATS_MAP,
  SEANCES,
} from './resources/data';

/**
 * Method for getting hall map from BL
 * @returns {*[]}
 */
function getHallFloors(hallId) {
  return [{
    title: 'Первый этаж',
    mount: {
      rowsCount: 12,
      columnsCount: 24,
    },
    seats: SEATS_MAP,
    sections: HALL_SECTIONS,
  }];
}

/**
 * Get exists institutions
 * @param institutionId
 * @returns {*[]}
 */
function getHallsList(institutionId) {
  return HALLS;
}

/**
 * Get institutions list
 * @returns {*[]}
 */
function getInstitutionsList() {
  return INSTITUTIONS;
}


/**
 * Get seance info
 * @param seanceId
 * @returns {{id, hallId, versionId, title, date}|*}
 */
function getSeance() {
  return SEANCES[0];
}


export default {
  getInstitutionsList,
  getSeance,
  getHallsList,
  getHallFloors,
};
