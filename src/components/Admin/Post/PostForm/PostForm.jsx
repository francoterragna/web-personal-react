import React, {useCallback} from 'react';
import { Form, Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import './PostForm.scss';

export function PostForm() {

    const onDrop = useCallback((acceptedFile) => {
        const file =acceptedFile[0];
        console.log(file);
    })

    const {getInputProps, getRootProps} = useDropzone({
        accept: 'image/jpeg, image/png',
        onDrop
    });

    const getMiniature = () => {
        return null;
    }

  return (
    <Form className='post-form' >
        <Form.Group widths='equal'>
            <Form.Input name='title' placeholder='Título del post'/>
            <Form.Input name='path' placeholder='Path del post'/>
        </Form.Group>

        <div className='post-form__miniature' {...getRootProps()} >
            <input {...getInputProps()} />
            {getMiniature() ? (
                <Image size='small' src={getMiniature()}/>
            ):(
                <div>
                    <span>Arrastra tu imagen</span>
                </div>
            )}
        </div>

        <Form.Button type='submit' primary fluid>
            Crear Post
        </Form.Button>
    </Form>
  )
}
