import {
  NetworkId,
  PortfolioElementType,
  solanaNativeAddress,
  solanaNetwork,
} from '@sonarwatch/portfolio-core';
import BigNumber from 'bignumber.js';
import { Cache } from '../../Cache';
import { Fetcher, FetcherExecutor } from '../../Fetcher';
import { platformId, tensorProgram } from './constants';
import { getClientSolana } from '../../utils/clients';
import { getParsedProgramAccounts } from '../../utils/solana';
import { poolFilter } from './filters';
import { getMultipleAccountsInfoSafe } from '../../utils/solana/getMultipleAccountsInfoSafe';
import { poolStruct } from './struct';
import tokenPriceToAssetToken from '../../utils/misc/tokenPriceToAssetToken';

const executor: FetcherExecutor = async (owner: string, cache: Cache) => {
  const client = getClientSolana();

  const bidsAccounts = await getParsedProgramAccounts(
    client,
    poolStruct,
    tensorProgram,
    poolFilter(owner)
  );

  if (bidsAccounts.length === 0) return [];

  const escrowAccountsInfo = await getMultipleAccountsInfoSafe(
    client,
    bidsAccounts.map((account) => account.solEscrow)
  );
  if (escrowAccountsInfo.length === 0) return [];

  const rent = await client.getMinimumBalanceForRentExemption(8);
  const solRawBalance = escrowAccountsInfo.reduce(
    (accu, escrow) => (escrow ? accu + escrow.lamports - rent : accu + 0),
    0
  );

  const solTokenPrice = await cache.getTokenPrice(
    solanaNativeAddress,
    NetworkId.solana
  );

  const amount = new BigNumber(solRawBalance)
    .dividedBy(10 ** solanaNetwork.native.decimals)
    .toNumber();

  const asset = tokenPriceToAssetToken(
    solanaNativeAddress,
    amount,
    NetworkId.solana,
    solTokenPrice
  );

  return [
    {
      type: PortfolioElementType.single,
      label: 'Deposit',
      networkId: NetworkId.solana,
      platformId,
      name: 'Bids',
      value: asset.value,
      data: { asset },
    },
  ];
};

const fetcher: Fetcher = {
  id: `${platformId}-bids`,
  networkId: NetworkId.solana,
  executor,
};

export default fetcher;