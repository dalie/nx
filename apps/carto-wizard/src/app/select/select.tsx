import Button from '../button/button';
import Modal from '../modal/modal';

/* eslint-disable-next-line */
export interface SelectProps {}

export function Select(props: SelectProps) {
  return (
    <Modal>
      <div>
        <h1>Welcome to Select!</h1>
        <Button to="/">Back</Button>
      </div>
    </Modal>
  );
}

export default Select;
