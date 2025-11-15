import { readFileSync } from 'node:fs';
import { describe, test, expect } from 'vitest';
import { PowerProfileBuilder } from '../src/builders/PowerProfileBuilder';
const preset1 = readFileSync(__dirname + '/data/NewPreset_1.powerpreset');
const preset2 = readFileSync(__dirname + '/data/NewPreset_2.powerpreset');

describe('Read raw XML data', () => {
  test('', () => {
    const powerpreset = new PowerProfileBuilder(preset1);
    console.dir(powerpreset, { depth: 10 });
  });
});
