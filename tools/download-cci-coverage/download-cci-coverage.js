#!/usr/bin/env node

const fetch = require('node-fetch');
const https = require('https');
const fs = require('fs');

function req(env) {
  throw new Error(`${env} is required`);
}

const [WORKFLOW_NAME = req('WORKFLOW_NAME arg'), OUT_DIR = '/tmp/cov'] = process.argv.slice(2);

const { CIRCLE_WORKFLOW_ID = req('CIRCLE_WORKFLOW_ID env') } = process.env;

async function get(path) {
  const res = await fetch(`https://circleci.com/api/v2/${path}`, { method: 'GET' });
  if (!res.ok) {
    throw new Error(`Failed fetching ${path}, ${await res.text()}`);
  }
  const json = await res.json();
  return json;
}

async function download(url, out) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res1) => {
      res1.once('error', reject);
      res1.once('end', resolve);
      https.get(res1.headers.location, (res2) => {
        res2.pipe(fs.createWriteStream(out));
        res2.once('error', reject);
        res2.once('end', resolve);
      });
    });
    req.once('error', reject);
  });
}

async function run() {
  const currentWorkflow = await get(`/workflow/${CIRCLE_WORKFLOW_ID}/job`);
  console.dir({ currentWorkflow }, { depth: Infinity });

  const targetJob = currentWorkflow.items.find((item) => item.name === WORKFLOW_NAME);
  console.dir({ targetJob }, { depth: Infinity });

  const { project_slug: PROJECT_SLUG, job_number: JOB_NUMBER } = targetJob;
  const artifacts = await get(`/project/${PROJECT_SLUG}/${JOB_NUMBER}/artifacts`);
  console.dir({ artifacts }, { depth: Infinity });

  const coverageArtifacts = artifacts.items.filter(
    ({ path }) => path.startsWith('coverage/') && path.endsWith('.json')
  );
  console.dir({ coverageArtifacts }, { depth: Infinity });

  await fs.promises.mkdir(OUT_DIR, { recursive: true });
  await coverageArtifacts.reduce(async (promise, artifact) => {
    await promise;
    const filename = `${WORKFLOW_NAME}-${artifact.node_index}.json`;
    console.log('...Downloading', artifact.path, 'to', `${OUT_DIR}/${filename}`);
    await download(artifact.url, `${OUT_DIR}/${filename}`);
    console.log('Saved', `${OUT_DIR}/${filename}`);
  }, Promise.resolve());
}

run();
