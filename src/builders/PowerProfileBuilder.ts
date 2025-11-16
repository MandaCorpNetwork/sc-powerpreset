import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { PresetData } from './PresetData';
import { IShipPowerPreset } from '../definitions/IShipPowerPreset';

export class PowerProfileBuilder {
  #parser: XMLParser = new XMLParser({ ignoreAttributes: false });
  #builder: XMLBuilder = new XMLBuilder({
    ignoreAttributes: false,
    suppressEmptyNode: true,
    format: true,
    indentBy: ' ',
  });

  public ship: string = 'Unknown';
  public data = new PresetData();

  constructor();
  constructor(fileRaw: string);
  constructor(fileRaw: ArrayBufferLike | Buffer);
  constructor(properties: IShipPowerPreset);
  constructor(
    input?: string | ArrayBufferLike | Buffer | IShipPowerPreset | undefined
  ) {
    if (input == null) return;
    let inputString: string;
    if (typeof input === 'string') {
      inputString = input;
    } else {
      const dec = new TextDecoder();
      inputString = dec.decode(input as Buffer);
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

  setShip(ship_name: string) {
    this.ship = ship_name;
    return this;
  }

  setData(
    data:
      | PresetData
      | ConstructorParameters<typeof PresetData>[0]
      | ((builder: PresetData) => PresetData)
  ) {
    if (typeof data === 'function') {
      data = data(new PresetData());
    }
    this.data = data instanceof PresetData ? data : new PresetData(data);
    return this;
  }

  toJSON() {
    return {
      SaveGame: {
        ShipPowerPreset: {
          '@_Ship': this.ship,
          '@_PresetData': this.data.toJSON(),
        },
      },
    };
  }
  toFile() {
    return this.#builder
      .build({
        SaveGame: {
          ShipPowerPreset: {
            '@_Ship': this.ship,
            '@_PresetData': JSON.stringify(this.data.toJSON()),
          },
        },
      })
      .replaceAll('\n', '\r\n');
  }
}
