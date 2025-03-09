import * as IconList from '..';
import type { IconComp, IconName as IconNameList } from '../types';

export const useAllIcons = (): Record<IconNameList, IconComp> =>
  IconList as unknown as Record<IconNameList, IconComp>;
