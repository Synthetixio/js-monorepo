const { lazy } = require('react');
const { safeImport } = require('./safeImport');

function safeLazy(importer) {
  return lazy(() => safeImport(importer));
}

module.exports = {
  safeLazy,
};
