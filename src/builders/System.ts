import { Props } from './Props';
import { SystemType } from '../enum/SystemType';
import { ShipDataMap, ShipKey } from '../definitions/ShipDataMap';

/**
 *Represents a ship system (e.g. thruster, weapon, shield).
 * @example
 * // Add Weapons with 4 pips, and be Enabled
 * new System()
 *   .setType(SystemType.WEAPON)
 *   .setPips(4)
 *   .setOnline(true);
 */
export class System<
  T extends string = keyof ShipDataMap,
  SYSTEM extends keyof ShipDataMap[ShipKey<T>]['systems'] = keyof ShipDataMap[ShipKey<T>]['systems']
> {
  public type = 'system_unknown';
  public id: SYSTEM = SystemType.UNKNOWN as SYSTEM;
  public props = new Props();
  constructor(data?: {
    first: SystemType;
    second: { m_target: number; m_online: false };
  }) {
    if (data == null) return;
    this.id = data.first as SYSTEM;
    this.type = System.getSystemType(data.first);
    this.props = new Props(data.second);
  }

  /** This does NOT MUTATE, and will return a new class */
  setType<S extends keyof ShipDataMap[ShipKey<T>]['systems']>(
    type: S
  ): System<T, S> {
    const newBuilder = new System<T, S>(this.toJSON() as any);
    newBuilder.id = type;
    newBuilder.type = System.getSystemType(type as unknown as number);
    return newBuilder;
  }

  /** Allocate power pips to the system */
  setPips(pips: number) {
    this.props.pips = pips;
    return this;
  }

  /** Set the state of the system */
  setOnline(value: boolean) {
    this.props.online = value;
    return this;
  }

  toJSON() {
    return { first: this.id as SystemType, second: this.props.toJSON() };
  }

  public static getSystemType(id: number) {
    switch (id) {
      default:
      case 0:
        return 'system_unknown';
      case SystemType.THRUSTER:
        return 'system_thruster';
      case SystemType.WEAPON:
        return 'system_weapon';
      case SystemType.SHIELD:
        return 'system_shield';
      case SystemType.TRACTOR_BEAM:
        return 'system_tractor_beam';
    }
  }
}
