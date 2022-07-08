import Button from '../button/button';

/* eslint-disable-next-line */
export interface SelectProps {}

export function Select(props: SelectProps) {
  return (
    <div>
      <h1>Welcome to Select!</h1>
      <Button to="/">Back</Button>
    </div>
  );
}

export default Select;
