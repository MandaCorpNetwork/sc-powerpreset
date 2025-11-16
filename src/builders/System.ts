import { Props } from './Props';
import { SystemType } from '../enum/SystemType';

export class System {
  public type = 'system_unknown';
  public id: SystemType = SystemType.UNKNOWN;
  public props = new Props();
  constructor(data?: {
    first: number;
    second: { m_target: number; m_online: false };
  }) {
    if (data == null) return;
    this.id = data.first;
    this.type = System.getSystemType(data.first);
    this.props = new Props(data.second);
  }

  setType(type: SystemType) {
    this.id = type;
    this.type = System.getSystemType(type);
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

  enable() {
    this.props.online = true;
    return this;
  }
  disable() {
    this.props.online = false;
    return this;
  }

  toJSON() {
    return { first: this.id, second: this.props.toJSON() };
  }
  public static getSystemType(id: number) {
    switch (id) {
      default:
      case 0:
        return 'system_unknown';
      case 78:
        return 'system_thruster';
      case 182:
        return 'system_weapon';
      case 161:
        return 'system_shield';
      case 172:
        return 'system_tractor_beam';
    }
  }
}
