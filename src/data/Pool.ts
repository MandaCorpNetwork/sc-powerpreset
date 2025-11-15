import { Props } from './Props';

export class Pool {
  public index = 0;
  public props = new Props();
  constructor(data?: {
    first: number;
    second: { m_target: number; m_online: false };
  }) {
    if (data == null) return;
    this.index = data.first;
    this.props = new Props(data.second);
  }
  toJSON() {
    return { first: this.index, second: this.props.toJSON() };
  }
}
