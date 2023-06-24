import React, {useState}  from 'react';
import './UserItem.scss';
import { Image, Button, Icon, Confirm } from 'semantic-ui-react'
import { ENV } from '../../../../utils';
import { image } from '../../../../assets';
import { UserForm } from '../UserForm';
import { User } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { BasicModal } from '../../../Shared';

const userController = new User();

export function UserItem(props) {

    const { user, onReload } = props;
    const { accessToken } = useAuth()

    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState('');

    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [isDelete, setIsDelete] = useState('');

    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    const onCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    const openUpdateUser = () => {
        setTitleModal(`Actualizar ${user.email}`);
        onOpenCloseModal();
    };

    const openDesactivateActivateConfirm = () => {
        setIsDelete(false);
        setConfirmMessage(user.active ? `¿Desea desactivar al usuario ${user.email}?` : `¿Desea activar al usuario ${user.email}?`);
        onCloseConfirm();
    }

    const onActivateDesactivate = async () => {
        try {
            await userController.updateUser(accessToken, user._id, {
                active: !user.active
            });
            onReload();
            onCloseConfirm();
        } catch (error) {
            throw error
        }
       
    };

    const OpenDeleteConfirm = () => {
        setIsDelete(true);
        setConfirmMessage(`Eliminar usuario ${user.email}`);
        onCloseConfirm();
    };

    const OnDelete = async () => {
        try {
            await userController.deleteUser(accessToken, user._id);
            onReload();
            onCloseConfirm();
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <>
        <div className='user-item' >
            <div className='user-item__info' > 
            <Image avatar src={user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar }/>                <div>
                    <p>{user.firstname} {user.lastname}</p>
                    <p>{user.email}</p>
                </div>
            </div>

            <div>
                <Button icon primary onClick={openUpdateUser}>
                    <Icon name='pencil' />
                </Button>
                <Button 
                    icon 
                    color={user.active ? 'orange' : 'teal'} 
                    onClick={openDesactivateActivateConfirm}
                >
                    <Icon name={user.active ? 'ban' : 'check'} />
                </Button>
                <Button icon color='red' onClick={OpenDeleteConfirm}>
                    <Icon name='trash' />
                </Button>
            </div>
        </div>

        <BasicModal show={showModal} close={onOpenCloseModal} title={titleModal} >
            <UserForm 
                close={onOpenCloseModal} 
                onReload={onReload} 
                user={user} 
            />
        </BasicModal>

        <Confirm 
            open={showConfirm} 
            onCancel={onCloseConfirm} 
            onConfirm={isDelete ? OnDelete : onActivateDesactivate} 
            content={confirmMessage} 
            size='mini' 
        />
    </>
  )
}
