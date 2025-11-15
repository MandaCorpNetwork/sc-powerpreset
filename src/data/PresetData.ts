import { Entity } from './Entity';
import { Pool } from './Pool';

export class PresetData {
  public pool: Pool[] = [];
  public entities: Entity[] = [];

  constructor(data?: { m_poolTargets: []; m_entityTargets: [] }) {
    if (data == null) return;
    if (data.m_poolTargets) {
      this.pool = data.m_poolTargets.map((t) => new Pool(t));
    }
    if (data.m_entityTargets) {
      this.entities = data.m_entityTargets.map((t) => new Entity(t));
    }
  }
  toJSON(){
    return {
      m_poolTargets: this.pool.map(t=>t.toJSON()),
      m_entityTargets: this.entities.map(t=>t.toJSON())
    }
  }
}
