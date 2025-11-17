import { IShipPowerPreset } from '../definitions/IShipPowerPreset';
import { Hardpoint } from './Hardpoint';
import { HardpointType } from '../enum/HardpointType';
import { System } from './System';
import { SystemType } from '../enum/SystemType';
import { ShipDataMap } from '../definitions/ShipDataMap';

export class PresetData<T extends keyof ShipDataMap = keyof ShipDataMap> {
  public systems: Map<SystemType, System<T>> = new Map();
  public hardpoints: Map<Hardpoint<T>['type'], Hardpoint<T>> = new Map();

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
    systems: Array<System<T> | ((builder: System<T>) => System<T>)>
  ): this;
  public setSystem(
    key: SystemType,
    value?:
      | System<T>
      | ConstructorParameters<typeof System<T>>[0]
      | ((builder: System<T>) => System<T>)
  ): this;
  public setSystem(
    key: SystemType | Array<System<T> | ((builder: System<T>) => System<T>)>,
    value?:
      | System<T>
      | ConstructorParameters<typeof System<T>>[0]
      | ((builder: System<T>) => System<T>)
  ): this {
    if (typeof value === 'function') {
      value = value(new System<T>());
    }
    if (Array.isArray(key)) {
      for (const sys of key) {
        this.setSystem(((sys as System<T>)?.id as any) ?? sys, sys);
      }
      return this;
    }
    this.systems.set(
      key,
      value instanceof System ? value : new System<T>(value)
    );
    return this;
  }

  public setHardpoint(
    hardpoints: Array<Hardpoint<T> | ((builder: Hardpoint<T>) => Hardpoint<T>)>
  ): this;
  public setHardpoint(
    key: HardpointType,
    value?:
      | Hardpoint
      | ConstructorParameters<typeof Hardpoint<T>>[0]
      | ((builder: Hardpoint<T>) => Hardpoint<T>)
  ): this;
  public setHardpoint(
    key:
      | HardpointType
      | Array<Hardpoint<T> | ((builder: Hardpoint<T>) => Hardpoint<T>)>,
    value?:
      | Hardpoint
      | ConstructorParameters<typeof Hardpoint<T>>[0]
      | ((builder: Hardpoint<T>) => Hardpoint<T>)
  ) {
    if (typeof value === 'function') {
      value = value(new Hardpoint<T>()) as any;
    }
    if (Array.isArray(key)) {
      for (const hp of key) {
        this.setHardpoint(((hp as Hardpoint<T>)?.type as any) ?? hp, hp as any);
      }
      return this;
    }
    this.hardpoints.set(
      key as any,
      value instanceof Hardpoint ? value : new Hardpoint<T>(value as any)
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
