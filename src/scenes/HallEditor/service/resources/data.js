const INSTITUTIONS = [
  {
    id: 1,
    title: 'Тюменский драматический театр',
  },
  {
    id: 2,
    title: 'Тюменский немного драматический театр',
  },
];

const HALLS = [
  {
    id: 1,
    title: 'Большой зал',
    seatsCount: 250,
    defaultScale: '60%',
  }, {
    id: 2,
    title: 'Малый зал',
    seatsCount: 40,
    defaultScale: '100%',
  },
];

const HALL_SECTIONS = [
  { id: 0, title: 'Партер' },
  { id: 1, title: 'Амфитеатр' },
  { id: 2, title: 'Ложе' },
];

const SEATS_MAP = [
  {
    type: 0, section: 0, row: 0, number: 1,
  },
  {
    type: 0, section: 0, row: 0, number: 1,
  },
  {
    type: 0, section: 0, row: 0, number: 1,
  },
  {
    type: 0, section: 0, row: 0, number: 1,
  },
  {
    type: 0, section: 0, row: 0, number: 1,
  },

  {
    type: 0, section: 1, row: 1, number: 1,
  },
  {
    type: 1, section: 1, row: 1, number: 1,
  },
  {
    type: 2, section: 1, row: 1, number: 1,
  },
  {
    type: 3, section: 1, row: 1, number: 1,
  },
  {
    type: 4, section: 1, row: 1, number: 1,
  },

  {
    type: 0, section: 2, row: 0, number: 1,
  },
  {
    type: 0, section: 2, row: 0, number: 1,
  },
  {
    type: 0, section: 2, row: 0, number: 1,
  },
  {
    type: 0, section: 2, row: 0, number: 1,
  },
  {
    type: 0, section: 2, row: 0, number: 1,
  },
];

const SEANCES = [
  {
    id: 1,
    hallId: 1,
    versionId: 1,
    title: 'Горе от ума',
    date: new Date(),
  },
  {
    id: 2,
    hallId: 2,
    versionId: 1,
    title: 'Горе от ума',
    date: new Date(),
  },
];

function convertToAutoCompleteSource(objArr, keyTitle, valueTitle) {
  return objArr.reduce((acc, cur) => {
    acc[cur[keyTitle]] = cur[valueTitle];
    return acc;
  }, {});
}

export {
  SEATS_MAP,
  HALL_SECTIONS,
  HALLS,
  INSTITUTIONS,
  SEANCES,
  convertToAutoCompleteSource,
};
