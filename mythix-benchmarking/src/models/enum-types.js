'use strict';

const SYSTEM_TYPE_ENUM = {
  'phone': 1,
  'fax':   2,
  'email': 3,
  'pager': 4,
  'url':   4,
  'sms':   5,
  'other': 6,
};

const USE_TYPE_ENUM = {
  'home':   1,
  'work':   2,
  'temp':   3,
  'old':    4,
  'mobile': 5,
};

const GENDER_TYPE_ENUM = {
  'male':    1,
  'female':  2,
  'other':   3,
  'unknown': 4,
};

const CARETEAM_STATUS_CODE_ENUM = {
  'proposed':         1,
  'active':           2,
  'suspended':        3,
  'inactive':         4,
  'entered-in-error': 5,
};

const ENCOUNTER_STATUS_CODE_ENUM = {
  'planned':     1,
  'arrived':     2,
  'triaged':     3,
  'in-progress': 4,
  'onleave':     5,
  'finished':    6,
  'cancelled':   7,
};

const ENCOUNTER_TYPE_ENUM = {
  'ADMS':       1,
  'BD/BM-clin': 2,
  'CCS60':      3,
  'OKI':        4,
};

module.exports = {
  SYSTEM_TYPE_ENUM,
  USE_TYPE_ENUM,
  GENDER_TYPE_ENUM,
  CARETEAM_STATUS_CODE_ENUM,
  ENCOUNTER_STATUS_CODE_ENUM,
  ENCOUNTER_TYPE_ENUM,
};