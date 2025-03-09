import * as IconList from '..';
import type { IconComp, IconName as IconNameList } from '../types';

export const useIcon = (name: IconNameList): IconComp | undefined => {
  const icon = IconList[name] as object;
  return icon ? (icon as IconComp) : undefined;
};
