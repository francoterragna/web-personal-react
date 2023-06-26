import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { BasicModal } from '../../../Shared';
import { Menu } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { MenuForm } from '../MenuForm';
import './MenuItem.scss';

const menuController = new Menu();

export function MenuItem(props) {
    const { menu, onReload } = props;
    const { accessToken } = useAuth();

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [isDelete, setIsDelete] = useState(false);


    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const openUpdateMenu = () => {
        setTitleModal(`Actualizar menu: ${menu.title}`);
        onOpenCloseModal();
    };

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage(
            menu.active 
            ? <p className='activate-menu'>Desactivar el menú <b>{menu.title}</b></p> 
            : <p className='activate-menu'>Activar el menú <b>{menu.title}</b></p>
        );
        onOpenCloseConfirm();
    };

    const onDesactivateActivate = async () => {
        try {
            await menuController.updateMenu(accessToken, { active: !menu.active } , menu._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    };

    const openDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Eliminar el menú de ${menu.title}`);
        onOpenCloseConfirm();
    }

    const onDelete = async () => {
        try {
            await menuController.deleteMenu(accessToken, menu._id);
            onReload();
            onOpenCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }


  return (
    <>
    <div className='menu-item' >
        <div className='menu-item__info' >
            <span className='menu-item__info-title'>{menu.title} </span>
            <span className='menu-item__info-path' >{menu.path}</span>
        </div>

        <div>
            <Button icon primary onClick={openUpdateMenu}>
                <Icon name='pencil' />
            </Button>
            <Button 
                icon 
                color={menu.active ? 'orange' : 'teal'} 
                onClick={openDesactivateActivateConfirm}
            >
                <Icon name={menu.active ? 'ban' : 'check'} />
            </Button>
            <Button icon color='red' onClick={openDeleteConfirm}>
                <Icon name='trash' />
            </Button>
        </div>
    </div>
        
        <BasicModal 
            show={showModal} 
            onClose={onOpenCloseModal} 
            title={titleModal}
        >
            <MenuForm 
                onClose={onOpenCloseModal} 
                onReload={onReload} 
                menu={menu}
            />
        </BasicModal>

        <Confirm
            open={showConfirm}
            onCancel={onOpenCloseConfirm}
            onConfirm={isDelete ? onDelete : onDesactivateActivate }
            content={confirmMessage}
            size='mini'
        />
    </>
  )
}
