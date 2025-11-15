export const getSystemType = (id: number) => {
  switch (id) {
    default:
    case 0:
      return 'system_unknown';
    case 78:
      return 'system_thruster';
    case 182:
      return 'system_weapon';
    case 161:
      return 'system_shield';
    case 172:
      return 'system_tractor_beam';
  }
};
