import React from 'react';
import {Form, Dropdown, Input} from 'semantic-ui-react';


export function MenuForm(props) {
    const {onClose, onReload, menus} = props;
    console.log(menus);

  return (
    <Form>
        <Form.Group widths='equal'>
            <Form.Input name='title' placeholder='Título'/>
            <Form.Input name='number' placeholder='Orden'/>
        </Form.Group>

        <Input 
        name='path' 
        placeholder='URL'
        fluid
        label={!menus ? ( <Dropdown options={options} /> ) : null} />

        <Form.Group/>

        <Form.Button type='submit' primary fluid >
            {menus ? 'Actualizar Menú' : 'Crear Menú'}
        </Form.Button>
    </Form>
  )
}

const options = [
    {key: 'https://', text: 'https://', value:'https://'},
    {key: 'http://', text: 'http://', value:'http://'},
    {key: '/', text: '/', value:'/'}
]
