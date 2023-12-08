import { TEACHER_TYPE } from '../../utils/constants';
import _ from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

export const teacherEducationTree = {
  1: {
    1: 'Class',
    2: 'Subject'
  },
  2: {
    1: 'Class',
    2: 'Subject'
  },
  3: {
    1: 'TypeOfEducation',
    2: 'Major',
    3: 'Level',
    4: 'Subject'
  },
  4: {
    1: 'University',
    2: 'College',
    3: 'Major',
    4: 'Subject'
  },
  5: {
    1: 'University',
    2: 'College',
    3: 'Major',
    4: 'Subject'
  }
};

export const studentEducationTree = {
  1: {
    1: 'Class'
  },
  2: {
    1: 'Class'
  },
  3: {
    1: 'TypeOfEducation',
    2: 'Major',
    3: 'Level'
  },
  4: {
    1: 'University',
    2: 'College',
    3: 'Major'
  },
  5: {
    1: 'University',
    2: 'College',
    3: 'Major'
  }
};

export const getLvlName = (
  parent_id: number,
  lvl: any,
  userType: number
): any => {
  let selectNames: any;
  if (userType === TEACHER_TYPE) {
    selectNames = teacherEducationTree;
  } else {
    selectNames = studentEducationTree;
  }

  return selectNames[parent_id][lvl];
};

export const getItemId = (props: any) => {
  if (props.items.selectedLvl4 != '') {
    return props.items.selectedLvl4;
  } else if (props.items.selectedLvl3 != '') {
    return props.items.selectedLvl3;
  } else if (props.items.selectedLvl2 != '') {
    return props.items.selectedLvl2;
  } else if (props.items.selectedLvl1 != '') {
    return props.items.selectedLvl1;
  }
};
