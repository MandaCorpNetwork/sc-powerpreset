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
const preset2 = readFileSync(__dirname + '/data/NewPreset_2.powerpreset');

describe('Build a Preset', () => {
  test('Match Values 1', () => {
    const decoder = new TextDecoder();
    const powerpreset = decoder.decode(preset1);
    const generatedPreset = new PowerProfileBuilder()
      .setShip('RSI_Polaris')
      .setData((data) =>
        data
          .setSystem([
            (sys) =>
              sys.setType(SystemType.THRUSTER).setPips(3).setOnline(false),
            (sys) => sys.setType(SystemType.SHIELD).setPips(5).setOnline(false),
            (sys) =>
              sys.setType(SystemType.TRACTOR_BEAM).setPips(2).setOnline(false),
            new System().setType(SystemType.WEAPON).setPips(1).setOnline(false),
          ])
          .setHardpoint([
            (hp) =>
              hp.setType(HardpointType.COOLER).setPips(3).setOnline(false),
            (hp) =>
              hp
                .setType(HardpointType.LIFE_SUPPORT)
                .setPips(2)
                .setOnline(false),
            (hp) =>
              hp
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
  test('Match Values 2', () => {
    const decoder = new TextDecoder();
    const powerpreset = decoder.decode(preset2);
    const generatedPreset = new PowerProfileBuilder()
      .setShip('RSI_Polaris')
      .setData((data) =>
        data
          .setSystem([
            (sys) =>
              sys.setType(SystemType.THRUSTER).setPips(1).setOnline(true),
            (sys) => sys.setType(SystemType.SHIELD).setPips(5).setOnline(true),
            (sys) =>
              sys.setType(SystemType.TRACTOR_BEAM).setPips(2).setOnline(true),
            new System().setType(SystemType.WEAPON).setPips(1).setOnline(true),
          ])
          .setHardpoint([
            (hp) => hp.setType(HardpointType.COOLER).setPips(3).setOnline(true),
            (hp) =>
              hp.setType(HardpointType.LIFE_SUPPORT).setPips(2).setOnline(true),
            (hp) =>
              hp
                .setType(HardpointType.QUANTUM_DRIVE)
                .setPips(8)
                .setOnline(true),
            new Hardpoint()
              .setType(HardpointType.RADAR)
              .setPips(5)
              .setOnline(true),
          ])
      );
    expect(generatedPreset.toFile()).toEqual(powerpreset);
  });
});
