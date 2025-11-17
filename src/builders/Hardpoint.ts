import { ShipDataMap, ShipKey } from '../definitions/ShipDataMap';
import { HardpointType } from '../enum/HardpointType';
import { Props } from './Props';

export class Hardpoint<
  T extends string = keyof ShipDataMap,
  HARDPOINT extends keyof ShipDataMap[ShipKey<T>]['components'] = keyof ShipDataMap[ShipKey<T>]['components']
> {
  public type: HARDPOINT = HardpointType.UNKNOWN as HARDPOINT;
  public props = new Props();
  constructor(data?: {
    first: HardpointType;
    second: { m_target: number; m_online: boolean };
  }) {
    if (data == null) return;
    this.type = data.first as HARDPOINT;
    this.props = new Props(data.second);
  }

  /** This does NOT MUTATE, and will return a new class */
  setType<C extends keyof ShipDataMap[ShipKey<T>]['components']>(
    type: C
  ): Hardpoint<T, C> {
    const newBuilder = new Hardpoint<T, C>(this.toJSON() as any);
    newBuilder.type = type;
    return newBuilder;
  }

  setPips(pips: number) {
    this.props.pips = pips;
    return this;
  }

  setOnline(value: boolean) {
    this.props.online = value;
    return this;
  }

  toJSON() {
    return { first: this.type as HardpointType, second: this.props.toJSON() };
  }
}
