/**
 * Represents a hard‑point type on a ship.
 */
export enum HardpointType {
  /**
   * Unknown or unspecified hard‑point.
   */
  UNKNOWN = 'unknown',
  /**
   * Cooling system hard‑point.
   */
  COOLER = 'hardpoint_cooler',
  /**
   * Life‑support system hard‑point.
   */
  LIFE_SUPPORT = 'hardpoint_life_support',
  /**
   * Power‑plant hard‑point.
   */
  POWERPLANT = 'hardpoint_powerplant',
  /**
   * Quantum drive hard‑point.
   */
  QUANTUM_DRIVE = 'hardpoint_quantum_drive',
  /**
   * Radar hard‑point.
   */
  RADAR = 'hardpoint_radar',
}
