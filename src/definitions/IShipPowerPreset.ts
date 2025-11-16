import { HardpointType } from '../enum/HardpointType';
import { SystemType } from '../enum/SystemType';

export interface IShipPowerPreset {
  m_poolTargets: Array<{
    first: SystemType;
    second: { m_target: number; m_online: boolean };
  }>;
  m_entityTargets: Array<{
    first: HardpointType;
    second: { m_target: number; m_online: boolean };
  }>;
}
