export function subgraph(req) {
  const body = JSON.parse(req.body);
  if (body.query.trim().startsWith('query pool($id: String)')) {
    return req.reply({
      data: {
        pool: {
          id: body.variables.id,
          name: 'TEST_POOL',
          total_weight: (1e18).toString(),
          configurations: [],
        },
      },
    });
  }

  return req.reply({ data: null });
}
