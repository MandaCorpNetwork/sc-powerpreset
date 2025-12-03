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
    systems: {
      /** Thruster */
      [SystemType.THRUSTER]: true;
      /** Shield */
      [SystemType.SHIELD]: true;
      /** Tractor */
      [SystemType.TRACTOR_BEAM]:true
      /** Weapon */
      [SystemType.WEAPON]: true;
    };
    components: {
      [HardpointType.COOLER]: true;
      [HardpointType.LIFE_SUPPORT]: true;
      [HardpointType.QUANTUM_DRIVE]: true;
      [HardpointType.RADAR]: true;
      [HardpointType.POWERPLANT]: true;
    };
  };
  AEGS_Idris_M: {
    systems: {
      [SystemType.THRUSTER]: true
      [153]: true
      [162]: true
      [172]: true
      [173]: true
      [SystemType.WEAPON]: true
      [184]: true
    };
    components: {
      [HardpointType.COOLER_LEFT]: true;
      [HardpointType.COOLER_RIGHT]: true;
      [HardpointType.LIFE_SUPPORT]: true;
      [HardpointType.QUANTUM_DRIVE]: true;
      [HardpointType.RADAR]: true;
      [HardpointType.POWERPLANT_01]: true;
      [HardpointType.POWERPLANT_02]: true;
    };
  };
  AEGS_Retaliator: {
    systems: {
      [SystemType.THRUSTER]: true
      [153]: true
      [162]: true
      [172]: true
      [173]: true
      [SystemType.WEAPON]: true
      [184]: true
    };
    components: {
      [HardpointType.COOLER_LEFT]: true;
      [HardpointType.COOLER_RIGHT]: true;
      [HardpointType.LIFE_SUPPORT]: true;
      [HardpointType.QUANTUM_DRIVE]: true;
      [HardpointType.RADAR]: true;
      [HardpointType.POWERPLANT_LEFT]: true;
      [HardpointType.POWERPLANT_RIGHT]: true;
    };
  };
}
