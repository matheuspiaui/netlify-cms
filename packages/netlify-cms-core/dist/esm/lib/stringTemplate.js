"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseDateFromEntry = parseDateFromEntry;
exports.compileStringTemplate = compileStringTemplate;
exports.extractTemplateVars = extractTemplateVars;
exports.SLUG_MISSING_REQUIRED_DATE = exports.dateParsers = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _collections = require("../reducers/collections");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// prepends a Zero if the date has only 1 digit
function formatDate(date) {
  return `0${date}`.slice(-2);
}

const dateParsers = {
  year: date => date.getFullYear(),
  month: date => formatDate(date.getMonth() + 1),
  day: date => formatDate(date.getDate()),
  hour: date => formatDate(date.getHours()),
  minute: date => formatDate(date.getMinutes()),
  second: date => formatDate(date.getSeconds())
};
exports.dateParsers = dateParsers;
const SLUG_MISSING_REQUIRED_DATE = 'SLUG_MISSING_REQUIRED_DATE';
exports.SLUG_MISSING_REQUIRED_DATE = SLUG_MISSING_REQUIRED_DATE;
const FIELD_PREFIX = 'fields.';
const templateContentPattern = '[^}{]+';
const templateVariablePattern = `{{(${templateContentPattern})}}`; // Allow `fields.` prefix in placeholder to override built in replacements
// like "slug" and "year" with values from fields of the same name.

function getExplicitFieldReplacement(key, data) {
  if (!key.startsWith(FIELD_PREFIX)) {
    return;
  }

  const fieldName = key.substring(FIELD_PREFIX.length);
  return data.get(fieldName, '');
}

function parseDateFromEntry(entry, collection, fieldName) {
  const dateFieldName = fieldName || (0, _collections.selectInferedField)(collection, 'date');

  if (!dateFieldName) {
    return;
  }

  const dateValue = entry.getIn(['data', dateFieldName]);
  const dateMoment = dateValue && (0, _moment.default)(dateValue);

  if (dateMoment && dateMoment.isValid()) {
    return dateMoment.toDate();
  }
}

function compileStringTemplate(template, date) {
  let identifier = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  let data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Map();
  let processor = arguments.length > 4 ? arguments[4] : undefined;
  let missingRequiredDate; // Turn off date processing (support for replacements like `{{year}}`), by passing in
  // `null` as the date arg.

  const useDate = date !== null;
  const slug = template.replace(RegExp(templateVariablePattern, 'g'), (_, key) => {
    let replacement;
    const explicitFieldReplacement = getExplicitFieldReplacement(key, data);

    if (explicitFieldReplacement) {
      replacement = explicitFieldReplacement;
    } else if (dateParsers[key] && !date) {
      missingRequiredDate = true;
      return '';
    } else if (dateParsers[key]) {
      replacement = dateParsers[key](date);
    } else if (key === 'slug') {
      replacement = identifier;
    } else {
      replacement = data.get(key, '');
    }

    if (processor) {
      return processor(replacement);
    }

    return replacement;
  });

  if (useDate && missingRequiredDate) {
    const err = new Error();
    err.name = SLUG_MISSING_REQUIRED_DATE;
    throw err;
  } else {
    return slug;
  }
}

function extractTemplateVars(template) {
  const regexp = RegExp(templateVariablePattern, 'g');
  const contentRegexp = RegExp(templateContentPattern, 'g');
  const matches = template.match(regexp) || [];
  return matches.map(elem => elem.match(contentRegexp)[0]);
}