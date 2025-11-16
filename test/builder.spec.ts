import { readFileSync } from 'node:fs';
import { describe, test, expect } from 'vitest';
import {
  PowerProfileBuilder,
  HardpointType,
  Hardpoint,
  System,
  SystemType,
} from '../src/';
const preset1 = readFileSync(__dirname + '/data/NewPreset_1.powerpreset');

describe('Build a Preset', () => {
  test('Match Values 1', () => {
    const decoder = new TextDecoder();
    const powerpreset = decoder.decode(preset1);
    const generatedPreset = new PowerProfileBuilder()
      .setShip('RSI_Polaris')
      .setData((data) =>
        data
          .setSystem([
            new System()
              .setType(SystemType.THRUSTER)
              .setPips(3)
              .setOnline(false),
            new System().setType(SystemType.SHIELD).setPips(5).setOnline(false),
            new System()
              .setType(SystemType.TRACTOR_BEAM)
              .setPips(2)
              .setOnline(false),
            new System().setType(SystemType.WEAPON).setPips(1).setOnline(false),
          ])
          .setHardpoint([
            new Hardpoint()
              .setType(HardpointType.COOLER)
              .setPips(3)
              .setOnline(false),
            new Hardpoint()
              .setType(HardpointType.LIFE_SUPPORT)
              .setPips(2)
              .setOnline(false),
            new Hardpoint()
              .setType(HardpointType.QUANTUM_DRIVE)
              .setPips(0)
              .setOnline(false),
            new Hardpoint()
              .setType(HardpointType.RADAR)
              .setPips(5)
              .setOnline(false),
          ])
      );

    expect(generatedPreset.toFile()).toEqual(powerpreset);
  });
  // test.skip('Match Values 2', () => {
  //   const decoder = new TextDecoder();
  //   const powerpreset = decoder.decode(preset2);
  // });
});
