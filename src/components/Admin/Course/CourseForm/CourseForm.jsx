import React from 'react';
import { Form, Image } from 'semantic-ui-react'
import './CourseForm.scss';

export function CourseForm() {

    const getMiniature = () => {
        return null;
    }
  return (
    <Form className='course-form' >
        <div className='course-form__miniature'>
            {getMiniature() ? (
                <Image size='small' src={getMiniature} />
            ) : (
                <div>
                    <span>Arrastra tu imagen</span>
                </div>
            )}
        </div>

        <Form.Input name='title' placeholder='Nombre del curso'/>
        <Form.Input name='url' placeholder='Link del curso'/>
        <Form.TextArea 
            name='description' 
            placeholder='Pequeña descripción del curso'
        />

        <Form.Group widths='equal'>
            <Form.Input type='numer' name='price' placeholder='Precio del curso' />
            <Form.Input type='numer' name='score' placeholder='Puntuación del curso' />
        </Form.Group>

        <Form.Button type='submit' primary fluid>
            Crear Curso
        </Form.Button>
    </Form>
  )
}
