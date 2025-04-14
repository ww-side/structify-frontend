import { UserSettings } from '@/core/user/components';

import { UserSettingsInfo } from '@/widgets/settings';

export default function Settings() {
  return (
    <>
      <UserSettingsInfo />
      <UserSettings />
    </>
  );
}
