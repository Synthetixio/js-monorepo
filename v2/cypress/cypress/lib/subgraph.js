export function subgraph(req) {
  if (req.body.query.startsWith('{loans(')) {
    return req.reply({ data: { loans: [] } });
  }
  if (req.body.query.startsWith('{rateUpdates(')) {
    return req.reply({
      data: { rateUpdates: [{ rate: '4.20', timestamp: Math.floor(Date.now() / 1000) }] },
    });
  }
  if (req.body.query.startsWith('{issueds(')) {
    return req.reply({ data: { issueds: [] } });
  }
  if (req.body.query.startsWith('{burneds(')) {
    return req.reply({ data: { burneds: [] } });
  }
  if (req.body.query.startsWith('{debtSnapshots(')) {
    return req.reply({ data: { debtSnapshots: [] } });
  }
  if (req.body.query.startsWith('{feesClaimeds(')) {
    return req.reply({ data: { feesClaimeds: [] } });
  }

  return req.reply({ data: null });
}
