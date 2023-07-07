import { Cache, Job, JobExecutor } from '@sonarwatch/portfolio-core';
import { platformId } from './constants';

const executor: JobExecutor = async (cache: Cache) => {
  // do some stuff
};

const job: Job = {
  id: `${platformId}-staking-apr`,
  executor,
};
export default job;
