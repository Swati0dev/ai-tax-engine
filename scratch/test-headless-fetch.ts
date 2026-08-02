import { HeadlessFetchStrategy } from '../src/engines/regulatory-intelligence/fetch/headless-fetch.strategy';
import { FetchContext } from '../src/engines/regulatory-intelligence/fetch/request-context';
import * as dotenv from 'dotenv';

dotenv.config();

async function run() {
  const strategy = new HeadlessFetchStrategy();
  const context: FetchContext = {
    url: 'https://www.incometax.gov.in/',
    originalUrl: 'https://www.incometax.gov.in/',
    depth: 0,
    startTime: Date.now(),
    headers: {}
  };

  try {
    const result = await strategy.execute(context);
    console.log(`Success! Extracted ${result.contentLength} bytes.`);
    console.log(`Content-Type: ${result.contentType}`);
    console.log(`Preview:`, result.rawBody.toString('utf-8').slice(0, 200));
  } catch (err: any) {
    console.error("Failed:", err.message);
  }
}

run();
