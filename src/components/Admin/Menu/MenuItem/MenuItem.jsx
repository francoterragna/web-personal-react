import React from 'react';
import './MenuItem.scss'
import { Button, Confirm, Icon } from 'semantic-ui-react';

export function MenuItem(props) {
    const { menu } = props;
  return (
    <>
    <div className='menu-item' >
        <div className='menu-item__info' >
            <span className='menu-item__info-title'>{menu.title} </span>
            <span className='menu-item__info-path' >{menu.path}</span>
        </div>

        <div>
            <Button icon primary>
                <Icon name='pencil' />
            </Button>
            <Button icon color={menu.active ? 'orange' : 'teal'}>
                <Icon name={menu.active ? 'ban' : 'check'} />
            </Button>
            <Button icon color='red'>
                <Icon name='trash' />
            </Button>
        </div>
    </div>
        
    </>
  )
}
