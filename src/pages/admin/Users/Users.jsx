import React, {useState} from 'react';
import {Tab, Button} from 'semantic-ui-react';
import { BasicModal } from '../../../components/Shared' 
import './Users.scss';

export function Users() {
  const [showModal, setShowModal] = useState(false);

  const onOpenCloseModal = () => setShowModal((prevState) => !prevState);

  
  const panes = [
    {
      menuItem: 'Usuarios activos',
      render: () => (
        <Tab.Pane attached={false}>
          <h2>Usuarios activos</h2>
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Usuarios inactivos',
      render: () => (
        <Tab.Pane attached={false}>
          <h2>Usuarios inactivos</h2>
        </Tab.Pane>
      )
    }
  ]
  
  return (
    <>
    <div className='users-page' >
      <Button className='users-page__add' primary onClick={onOpenCloseModal}>
        Nuevo Usuario
      </Button>
      <Tab menu={{ secondary: true }} panes={panes}/>
    </div>

    <BasicModal show={showModal} close={onOpenCloseModal} title='Crear nuevo usuario'>
      <h1>Formulario para crear usuarios</h1>
    </BasicModal>
    </>
  );
}
