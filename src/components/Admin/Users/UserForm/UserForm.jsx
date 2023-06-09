import React, { useCallback } from 'react';
import { Form, Image, Message } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useDropzone } from 'react-dropzone';
import { User } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { image } from '../../../../assets';
import { ENV } from '../../../../utils'
import { initialValues, validationSchema } from './UserForm.form';
import './UserForm.scss';

const userController = new User();

let errorFormulario = false;

export function UserForm(props) {
    const { onClose, onReload, user } = props;
    const { accessToken } = useAuth();


    const formik = useFormik({
      initialValues: initialValues(user),
      validationSchema: validationSchema(user),
      validateOnChange: false,
      onSubmit: async (formValue) => {
        try {
          if(!user) {
            console.log("Estoy en el try");
            await userController.createUser(accessToken, formValue);
          } else {
            console.log(formValue);
            await userController.updateUser(accessToken, user._id, formValue);
          }
          onReload();
          onClose();
          return;
        } catch (error) {
          console.log("Estoy en el catch");
          console.error(error);
          errorFormulario = true;

          // Espero 100ms para poner la variable en false porque sino no detecta el true.
          setTimeout(() => {
            errorFormulario = !errorFormulario;
          }, '100');
          
        }
      }
    });

    const onDrop = useCallback(acceptedFiles => {
      const file = acceptedFiles[0];
      formik.setFieldValue('avatar', URL.createObjectURL(file));
      formik.setFieldValue('fileAvatar', file)
    });

    const { getInputProps, getRootProps } = useDropzone({
      accept: 'image/jpeg, image/png',
      onDrop
    });

    const getAvatar = () => {
      if(formik.values.fileAvatar) {
        return formik.values.avatar;
      } else if(formik.values.avatar){
        return `${ENV.BASE_API}/${formik.values.avatar}`
      }
      return image.noAvatar
    }

    return (
    <Form error className='user-form' onSubmit={formik.handleSubmit}>
        <div className='user-form__avatar' {...getRootProps()}>
          <input {...getInputProps()} />
          <Image avatar size='small' src={getAvatar()}/>
        </div>
        <Form.Group widths='equal'>

          <Form.Input 
            name='firstname' 
            placeholder='Nombre' 
            onChange={formik.handleChange}
            value={formik.values.firstname}
            error={formik.errors.firstname}
          />

          <Form.Input 
            name='lastname' 
            placeholder='Apellidos'
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />
        </Form.Group>        

        <Form.Group widths='equal'>

          <Form.Input 
            name='email' 
            placeholder='Correo Electrónico' 
            autoComplete="new-email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />

          <Form.Dropdown 
            placeholder='Selecciona un rol' 
            options={roleOptions} 
            selection
            onChange={(_, data) => formik.setFieldValue('role', data.value)}
            value={formik.values.role}
            error={formik.errors.role}
          />
        </Form.Group>       

        <Form.Input 
          type='password' 
          name='password' 
          placeholder='Contraseña'
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.errors.password}
          autoComplete="new-password"
        />

        <Form.Button type='submit' primary fluid loading={formik.isSubmitting} >
          {user ? "Actualizar usuario" : "Crear usuario"}
        </Form.Button>

        {
        errorFormulario ? 
        <Message error
        header='Error al crear el usuario'
        content='El email ya existe en la base de datos'/> : ''
        }
    </Form>
  )
}


const roleOptions = [
  {
    key: 'user',
    text: 'Usuario',
    value: 'user'
  },
  {
    key: 'admin',
    text: 'Administrador',
    value: 'admin'
  }
]