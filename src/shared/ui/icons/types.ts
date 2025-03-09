import type * as Icons from '.';

export type IconComp = React.FC<
  { size?: number; color?: string } & React.SVGProps<SVGSVGElement>
>;

export type IconName = keyof typeof Icons;
