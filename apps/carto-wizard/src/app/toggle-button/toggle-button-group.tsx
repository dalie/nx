import { PropsWithChildren } from 'react';

/* eslint-disable-next-line */
export interface ToggleButtonGroupProps extends PropsWithChildren {
  direction?: 'horizontal' | 'vertical';
}

export function ToggleButtonGroup({ direction = 'horizontal' }: ToggleButtonGroupProps) {
  return (
    <div>
      <h1>Welcome to ToggleButtonGroup!</h1>
    </div>
  );
}

export default ToggleButtonGroup;
