import React from 'react';
import { Modal } from 'semantic-ui-react'

export function BasicModal(props) {

    const {show, onClose, title, size, children} = props;

  return (
    <Modal closeIcon open={show} onClose={onClose} size={size}>
        {title && <Modal.Header>{title}</Modal.Header>}
        <Modal.Content>{children}</Modal.Content>
    </Modal>
    )
}


BasicModal.defaultProps = {
    size: 'tiny'
}