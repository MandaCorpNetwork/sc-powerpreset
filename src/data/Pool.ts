import { getSystemType } from './getSystemType';
import { Props } from './Props';

export class Pool {
  public type = 'system_unknown';
  public id = 0
  public props = new Props();
  constructor(data?: {
    first: number;
    second: { m_target: number; m_online: false };
  }) {
    if (data == null) return;
    this.id = data.first
    this.type = getSystemType(data.first)
    this.props = new Props(data.second);
  }
  toJSON() {
    return { first: this.id, second: this.props.toJSON() };
  }
}
