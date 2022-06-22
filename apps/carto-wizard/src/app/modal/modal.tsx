import React from 'react';

export interface ModalProps extends React.PropsWithChildren {
  id: string;
}

export function Modal(props: ModalProps) {
  return <div>{props.children}</div>;
}

export default Modal;
