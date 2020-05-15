import { action, computed, observable } from 'mobx';
import * as LOOP from 'types/generated/loop_pb';

export default class Swap {
  // native values from the Loop api
  @observable id = '';
  @observable type = 0;
  @observable amount = 0;
  @observable initiationTime = 0;
  @observable state = 0;

  constructor(loopSwap: LOOP.SwapStatus.AsObject) {
    this.update(loopSwap);
  }

  /**
   * The numeric swap type as a user friendly string
   */
  @computed get typeName() {
    switch (this.type) {
      case LOOP.SwapType.LOOP_IN:
        return 'Loop In';
      case LOOP.SwapType.LOOP_OUT:
        return 'Loop Out';
    }
    return 'Unknown';
  }

  /**
   * The numeric swap `state` as a user friendly string
   */
  @computed get stateLabel() {
    switch (this.state) {
      case LOOP.SwapState.INITIATED:
        return 'Initiated';
      case LOOP.SwapState.PREIMAGE_REVEALED:
        return 'Preimage Revealed';
      case LOOP.SwapState.HTLC_PUBLISHED:
        return 'HTLC Published';
      case LOOP.SwapState.SUCCESS:
        return 'Success';
      case LOOP.SwapState.FAILED:
        return 'Failed';
      case LOOP.SwapState.INVOICE_SETTLED:
        return 'Invoice Settled';
    }

    return 'Unknown';
  }

  @computed get createdOn() {
    return new Date(this.initiationTime / 1000 / 1000);
  }

  /**
   * Updates this swap model using data provided from the Loop GRPC api
   * @param loopSwap the swap data
   */
  @action.bound
  update(loopSwap: LOOP.SwapStatus.AsObject) {
    this.id = loopSwap.id;
    this.type = loopSwap.type;
    this.amount = loopSwap.amt;
    this.initiationTime = loopSwap.initiationTime;
    this.state = loopSwap.state;
  }
}