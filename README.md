# StarCitizen Power Preset Utility

A small utility library for creating and serialising ship power presets used in the game **Star Citizen**. It provides a convenient API to build, modify and export ship power data in the format required by the game.

---

## Table of contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Building](#building)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Builder pattern** for constructing complex preset data.
- Supports both raw powerpreset files and building files from scratch.
- Simple API for adding systems and hardpoints.
- Works in the Browser!

---

## Installation

```bash
# Using npm
npm install @mandacorp/sc-powerpreset

# Using yarn
yarn add @mandacorp/sc-powerpreset
```

---

## Usage

```ts
import {
  PowerProfileBuilder,
  HardpointType,
  Hardpoint,
  System,
  SystemType,
  } from '@mandacorp/sc-powerpreset';

// Create a preset from scratch
const preset = new PowerProfileBuilder()
      .setShip('RSI_Polaris')
      .setData((data) =>
        data
          .setSystem([
            (sys) => sys
              .setType(SystemType.THRUSTER)
              .setPips(3)
              .setOnline(true),
            (sys) => sys.setType(SystemType.SHIELD).setPips(5).setOnline(false),
            (sys) => sys
              .setType(SystemType.TRACTOR_BEAM)
              .setPips(2)
              .setOnline(false),
            new System().setType(SystemType.WEAPON).setPips(1).setOnline(true),
          ])
          .setHardpoint([
            (hp) => hp
              .setType(HardpointType.COOLER)
              .setPips(3)
              .setOnline(true),
            (hp) => hp
              .setType(HardpointType.LIFE_SUPPORT)
              .setPips(2)
              .setOnline(true),
            (hp) => hp
              .setType(HardpointType.QUANTUM_DRIVE)
              .setPips(0)
              .setOnline(false),
            new Hardpoint()
              .setType(HardpointType.RADAR)
              .setPips(5)
              .setOnline(false),
          ])
      );

// Export to preset.powerpreset file contents
const xmlString = preset.toFile();

// 3️⃣ Parse an existing XML file
const existingXml = /* load XML string or Buffer */;
const builder = new PowerProfileBuilder(existingXml);
```

## Disabling Checks

> [!CAUTION]
> This tool will attempt to safeguard you against invalid tunings, such as adding components or systems that dont exist on a given ship, however as these things change during the development of the game, there may be a time you wish to disable these.
> You might need to use this if a ship changes and we don't yet have an update out.

This can be done by using a ship of `"unknown"`.

```ts
const myPreset = new PowerProfileBuilder().setName('DRAKE_Jalopy' as 'unknown').setData(...);
```

This will force disable all checking for valid components and let you enter anything. Note that this is the default behavior for Unknown ships.



# Building Locally

## Building

```bash
# Install dev dependencies first
npm install

# Build both CommonJS and ESM bundles + type declarations
npm run build
```

The built files will be available under the `dist/` directory.

---

## Testing

```bash
npm run test
```

We use `vitest` for unit tests. Feel free to add more tests in the `test/` folder.

---

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) before opening issues or pull requests.

---

## License

MIT © Ethan Snow
