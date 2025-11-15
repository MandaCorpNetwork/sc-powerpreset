import { readFileSync } from 'node:fs';
import { describe, test, expect } from 'vitest';
import { PowerProfileBuilder } from '../src/builders/PowerProfileBuilder';
const preset1 = readFileSync(__dirname + '/data/NewPreset_1.powerpreset');

describe('Read raw XML data', () => {
  test('', () => {
    const decoder = new TextDecoder()
    const powerpreset = new PowerProfileBuilder(preset1);
    // console.dir(powerpreset, { depth: 5 });
    expect(powerpreset.toXML()).toEqual(decoder.decode(preset1));
  });
});
