function noCircularJson(obj) {
  const cache = [];

  function noCircular(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found
        return '[*RECURSION*]';
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  }

  try {
    return JSON.stringify(obj, noCircular);
  } catch (_err) {
    // don't care
    return '';
  }
}

function skipLog(params) {
  const props = params?.consoleProps || {};
  // Filter out some things that keep CI running what essentially is a failed test
  return [
    props?.URL?.includes('127.0.0.1:8545'),
    props?.URL?.includes('infura.io'),
    props?.URL?.includes('thegraph.com'),
  ].some(Boolean);
}

export function onLogAdded(params) {
  if (skipLog(params)) {
    return;
  }

  console.log(
    Object.fromEntries(
      Object.entries(params.consoleProps)
        .map(([key, value]) => {
          if (key === 'Snapshot') {
            return [key, params.message];
          }
          if (key === 'subject' && value?.jquery) {
            return [
              key,
              Array.from(value[0].attributes)
                .map((att) => `${att?.name}=${att?.value}`)
                .join('|'),
            ];
          }

          if (key === 'Applied To' && value?.attributes) {
            return [
              key,
              Array.from(value.attributes)
                .map((att) => `${att?.name}=${att?.value}`)
                .join('|'),
            ];
          }
          if (Array.isArray(value)) {
            return [key, value.join('|')];
          }

          if (key === 'Request Headers') {
            return null;
          }

          if (['number', 'string'].includes(typeof value)) {
            return [key, value];
          }

          if (['object'].includes(typeof value)) {
            return [key, noCircularJson(value)];
          }

          return [key, noCircularJson({ value })];
        })
        .filter(Boolean)
    )
  );
}
