export class Props {
  public pips = 0;
  public online = false;
  constructor(data?: { m_target: number; m_online: boolean }) {
    if (data == null) return;
    this.pips = data.m_target;
    this.online = data.m_online;
  }
  toJSON() {
    return { m_target: this.pips, m_online: this.online };
  }
}
