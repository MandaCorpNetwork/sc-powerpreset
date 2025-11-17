import { SystemType } from '../enum/SystemType';
import { HardpointType } from '../enum/HardpointType';

export type ShipKey<T extends string> = T extends keyof ShipDataMap
  ? T
  : 'unknown';

export type GenericSystems = {
  [SystemType.THRUSTER]: true;
  [SystemType.SHIELD]: true;
  [SystemType.WEAPON]: true;
};
export type GenericSystemsWithTractor = GenericSystems & {
  [SystemType.TRACTOR_BEAM]: true;
};
export interface ShipDataMap {
  unknown: {
    systems: {
      [key in SystemType]?: true;
    };
    components: {
      [key in HardpointType]?: true;
    };
  };
  RSI_Polaris: {
    systems: GenericSystemsWithTractor;
    components: {
      [HardpointType.COOLER]: true;
      [HardpointType.LIFE_SUPPORT]: true;
      [HardpointType.QUANTUM_DRIVE]: true;
      [HardpointType.RADAR]: true;
      [HardpointType.POWERPLANT]: true;
    };
  };
}
