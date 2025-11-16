import { IShipPowerPreset } from '../definitions/IShipPowerPreset';
import { Hardpoint } from './Hardpoint';
import { HardpointType } from '../enum/HardpointType';
import { System } from './System';
import { SystemType } from '../enum/SystemType';

export class PresetData {
  public systems: Map<SystemType, System> = new Map();
  public hardpoints: Map<Hardpoint['type'], Hardpoint> = new Map();

  constructor(data?: { m_poolTargets: []; m_entityTargets: [] }) {
    if (data == null) return;
    if (data.m_poolTargets) {
      this.systems = new Map(
        data.m_poolTargets.map((t) => {
          const s = new System(t);
          return [s.id, s];
        })
      );
    }
    if (data.m_entityTargets) {
      this.hardpoints = new Map(
        data.m_entityTargets.map((t) => {
          const s = new Hardpoint(t);
          return [s.type, s];
        })
      );
    }
  }

  public setSystem(
    key: SystemType | Array<System | ((builder: System) => System)>,
    value?:
      | System
      | ConstructorParameters<typeof System>[0]
      | ((builder: System) => System)
  ) {
    if (typeof value === 'function') {
      value = value(new System());
    }
    if (Array.isArray(key)) {
      for (const sys of key) {
        this.setSystem((sys as System)?.id ?? sys, sys);
      }
      return this;
    }
    this.systems.set(key, value instanceof System ? value : new System(value));
    return this;
  }

  public setHardpoint(
    key: HardpointType | Array<Hardpoint | ((builder: Hardpoint) => Hardpoint)>,
    value?:
      | Hardpoint
      | ConstructorParameters<typeof Hardpoint>[0]
      | ((builder: Hardpoint) => Hardpoint)
  ) {
    if (typeof value === 'function') {
      value = value(new Hardpoint());
    }
    if (Array.isArray(key)) {
      for (const hp of key) {
        this.setHardpoint((hp as Hardpoint)?.type ?? hp, hp);
      }
      return this;
    }
    this.hardpoints.set(
      key,
      value instanceof Hardpoint ? value : new Hardpoint(value)
    );
    return this;
  }

  toJSON(): IShipPowerPreset {
    return {
      m_poolTargets: Array.from(this.systems.values()).map((t) => t.toJSON()),
      m_entityTargets: Array.from(this.hardpoints.values()).map((t) =>
        t.toJSON()
      ),
    };
  }
}
