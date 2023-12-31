export type PlatformOSType = 'Android' | 'IOS' | 'web';

export type PlataformSelectSpecifics<T> = {
  [platform in PlatformOSType | 'default']?: T
};

export interface PlatformSelectOptions {
  fallbackToWeb?: boolean;
}

export type PlatformSelect<T> = (
  specifics: PlataformSelectSpecifics<T>,
  options: PlatformSelectOptions
) => T;
