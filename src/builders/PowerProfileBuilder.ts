import { XMLBuilder, XMLParser } from 'fast-xml-parser';
import { PresetData } from './PresetData';
import { IShipPowerPreset } from '../definitions/IShipPowerPreset';
import { ShipDataMap, ShipKey } from '../definitions/ShipDataMap';

export class PowerProfileBuilder<T extends string = keyof ShipDataMap> {
  #parser: XMLParser = new XMLParser({ ignoreAttributes: false });
  #builder: XMLBuilder = new XMLBuilder({
    ignoreAttributes: false,
    suppressEmptyNode: true,
    format: true,
    indentBy: ' ',
  });

  public ship: ShipKey<T> = 'unknown' as ShipKey<T>;
  public data = new PresetData<ShipKey<T>>();

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
    this.ship = properties['@_Ship'] as ShipKey<T>;
    const rawJSON = JSON.parse(properties['@_PresetData']);
    this.data = new PresetData<ShipKey<T>>(rawJSON);
  }

  /** This does NOT MUTATE, and will return a new class */
  setShip<S extends string>(ship_name: S): PowerProfileBuilder<S> {
    const newBuilder = new PowerProfileBuilder<S>(this.toFile());
    newBuilder.ship = ship_name as ShipKey<S>;
    return newBuilder;
  }

  setData(
    data:
      | PresetData<ShipKey<T>>
      | ConstructorParameters<typeof PresetData>[0]
      | ((builder: PresetData<ShipKey<T>>) => PresetData<ShipKey<T>>)
  ) {
    if (typeof data === 'function') {
      data = data(new PresetData());
    }
    this.data =
      data instanceof PresetData ? data : new PresetData<ShipKey<T>>(data);
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
  toFile(windows = true) {
    return this.#builder
      .build({
        SaveGame: {
          ShipPowerPreset: {
            '@_Ship': this.ship,
            '@_PresetData': JSON.stringify(this.data.toJSON()),
          },
        },
      })
      .replaceAll('\n', windows ? '\r\n' : '\n');
  }
}
