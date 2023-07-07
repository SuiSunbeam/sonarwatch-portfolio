import { Cache, Job, JobExecutor } from '@sonarwatch/portfolio-core';
import {
  platformId,
  programAdressThala,
  vaultCollateralParamsFilter,
} from './constants';
import { getClientAptos } from '../../utils/clients';
import { VaultCollateralParamsRessource } from './types';
import { fp64ToFloat, getNestedType } from './helpers';

const executor: JobExecutor = async (cache: Cache) => {
  const connection = getClientAptos();
  const vaultsRate = await getAccountResources(connection, programAdressThala);
  if (!vaultsRate) return;

  vaultsRate.forEach((resource) => {
    if (!resource.type.startsWith(vaultCollateralParamsFilter)) return;
    if (!resource.data) return;
    const vaultData = resource.data as VaultCollateralParamsRessource;
    if (!vaultData) return;
    cache.setItem(
      getNestedType(resource.type),
      fp64ToFloat(BigInt(vaultData.interest_annual_rate_ratio.v)),
      {
        prefix: platformId,
      }
    );
  });
};

const job: Job = {
  id: `${platformId}-vaults-rates`,
  executor,
};
export default job;
