import { readFileSync } from 'node:fs';
import { describe, test, expect } from 'vitest';
import { PowerProfileBuilder, HardpointType } from '../src';
const preset1 = readFileSync(__dirname + '/data/NewPreset_1.powerpreset');
const preset2 = readFileSync(__dirname + '/data/NewPreset_2.powerpreset');
const os = require('node:os');

const platform = os.platform();
const isWindows = platform === 'win32';
describe('Read raw XML data', () => {
  test('Serialize Preset 1', () => {
    const decoder = new TextDecoder();
    const powerpreset = new PowerProfileBuilder(preset1);
    expect(powerpreset.toFile(isWindows)).toEqual(decoder.decode(preset1));
  });
  test('Serialize Preset 2', () => {
    const decoder = new TextDecoder();
    const powerpreset = new PowerProfileBuilder(preset2);
    expect(powerpreset.toFile(isWindows)).toEqual(decoder.decode(preset2));
  });
  test('Match Values', () => {
    const powerpreset = new PowerProfileBuilder(preset1);
    expect(powerpreset.ship).toEqual('RSI_Polaris');
    expect(
      powerpreset.data.hardpoints.get(HardpointType.LIFE_SUPPORT)?.props.pips
    ).toEqual(2);
    expect(
      powerpreset.data.hardpoints.get(HardpointType.COOLER)?.props.pips
    ).toEqual(3);
    expect(
      powerpreset.data.hardpoints.get(HardpointType.QUANTUM_DRIVE)?.props.pips
    ).toEqual(0);
    expect(
      powerpreset.data.hardpoints.get(HardpointType.RADAR)?.props.pips
    ).toEqual(5);
  });
});
