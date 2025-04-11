import { useQuery } from '@apollo/client';

import { GET_FULL_VIEWS } from '@/features/view/services';

import type { IconName } from '@/shared/ui/icons';

export const useGetFullViews = () => {
  return useQuery<{
    views: { id: string; name: string; icon: IconName; formats: string[] }[];
  }>(GET_FULL_VIEWS);
};
