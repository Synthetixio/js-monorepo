/* global window, document */

async function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function safeImport(importer, { RETRY_DELAY = 2000, RETRY_LIMIT = 10 } = {}) {
  if (window?.localStorage?.UNSAFE_IMPORT === 'true') {
    return importer();
  }

  for (let step = 0; step < RETRY_LIMIT; step++) {
    try {
      return await importer();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      await timeout(RETRY_DELAY);
    }
  }

  // We went over the limit, did not return the import result successfully so need a full reload
  document.location.reload();
}

module.exports = {
  safeImport,
};
