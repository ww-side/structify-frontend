import { useQuery } from '@apollo/client';

import { GET_VIEW } from '@/features/view/services';

import type { IconName } from '@/shared/ui/icons';

export const useGetView = (id: string) => {
  return useQuery<{
    view: { name: string; icon: IconName; formats: string[] };
  }>(GET_VIEW, {
    variables: { id },
  });
};
