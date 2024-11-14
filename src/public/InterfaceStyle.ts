export enum InterfaceStyle {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export namespace InterfaceStyle {
  export function fromString(value: string): InterfaceStyle {
    switch (value) {
      case 'LIGHT':
        return InterfaceStyle.LIGHT;
      case 'DARK':
        return InterfaceStyle.DARK;
      default:
        return InterfaceStyle.LIGHT;
    }
  }
}
