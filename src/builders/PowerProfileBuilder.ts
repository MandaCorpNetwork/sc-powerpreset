import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { TextEncoder } from 'node:util';
import { PresetData } from '../data/PresetData';

export class PowerProfileBuilder {
  #parser: XMLParser = new XMLParser({ ignoreAttributes: false });
  #builder: XMLBuilder = new XMLBuilder();

  public ship: string = 'Unknown';
  public data = new PresetData();

  constructor(properties: unknown);
  constructor(fileRaw: string);
  constructor(fileRaw: ArrayBufferLike);
  constructor(input?: string | ArrayBufferLike) {
    if (input == null) return;
    let inputString: string;
    if (typeof input === 'string') {
      inputString = input;
    } else {
      const dec = new TextDecoder();
      inputString = dec.decode(input as ArrayBufferLike);
    }
    const rawXml = this.#parser.parse(inputString) as {
      SaveGame: {
        ShipPowerPreset: {
          '@_Ship': string;
          '@_PresetData': string;
        };
      };
    };
    const properties = rawXml.SaveGame.ShipPowerPreset;
    this.ship = properties['@_Ship'];
    const rawJSON = JSON.parse(properties['@_PresetData']);
    this.data = new PresetData(rawJSON);
  }
}
