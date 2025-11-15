import { Props } from './Props';

export class Entity {
  public type: string = 'unknown';
  public props = new Props();
  constructor(data?: {
    first: string;
    second: { m_target: number; m_online: boolean };
  }) {
    if (data == null) return;
    this.type = data.first;
    this.props = new Props(data.second);
  }
  toJSON() {
    return { first: this.type, second: this.props.toJSON() };
  }
}
