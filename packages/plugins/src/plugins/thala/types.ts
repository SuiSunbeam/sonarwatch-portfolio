export type LiquidityInfo = {
  data: {
    totalStability: number;
    emissionPerDay: number;
    apy: number;
  };
};

export type Guid = {
  id: {
    addr: string;
    creation_num: string;
  };
};

export type Event = {
  counter: string;
  guid: Guid;
};

export type VaultRessource = {
  account_address: string;
  collateral: {
    value: number;
  };
  debt: number;
  events: {
    borrow_events: Event[];
    deposit_events: Event[];
    liquidation_events: Event[];
    redemption_events: Event[];
    repay_events: Event[];
    withdraw_events: Event[];
  };
  interest: string;
  last_interest_rate_index_ratio: VFloat;
};

export type VFloat = {
  v: string;
};

export type VaultCollateralParamsRessource = {
  collateral_frozen: boolean;
  interest_annual_rate_ratio: VFloat;
  interest_last_update_seconds: string;
  interest_rate_index_ratio: VFloat;
  liquidations_frozen: boolean;
  mcr_penalty_multiplier: number;
  mcr_ratio: VFloat;
  mint_cap: string;
  param_change_event: Event;
  redemption_fee_ratio: VFloat;
  redemption_mode_enabled: boolean;
};
