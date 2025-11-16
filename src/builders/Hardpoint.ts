import { HardpointType } from '../enum/HardpointType';
import { Props } from './Props';

export class Hardpoint {
  public type: HardpointType = HardpointType.UNKNOWN;
  public props = new Props();
  constructor(data?: {
    first: HardpointType;
    second: { m_target: number; m_online: boolean };
  }) {
    if (data == null) return;
    this.type = data.first;
    this.props = new Props(data.second);
  }

  setType(type: HardpointType) {
    this.type = type;
    return this;
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
    return { first: this.type, second: this.props.toJSON() };
  }
}
