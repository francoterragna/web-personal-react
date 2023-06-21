import React from 'react';
import {Button, Icon} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks'

export function Logout() {

    const {logout} = useAuth();
    console.log(logout);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/admin')
    }
  return (
    <Button negative onClick={onLogout}>
        <Icon name='power off'/> Cerrar Sesión
    </Button>
  )
}