import React, {useCallback} from 'react';
import { Form, Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { useFormik } from 'formik';
import { Course } from '../../../../api';
import { useAuth } from '../../../../hooks';
import { initialValues, validationSchema } from './CourseForm.form';
import './CourseForm.scss';

const courseController = new Course();

export function CourseForm(props) {

    const { onClose, onReload } = props;

    const {accessToken} = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validationOnChange: false,
        onSubmit: async(formValue) => {
            try {
                await courseController.createCourse(accessToken, formValue);

                //CERRAR EL MODAL
                //REFRESCAR LA LISTA DE CURSOS
                onReload();
                onClose();
            } catch (error) {
                console.error(error);
            }
        }
    })

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        formik.setFieldValue('miniature', URL.createObjectURL(file));
        formik.setFieldValue('file', file);
    });

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/jpg, image/png',
        onDrop
    })

    const getMiniature = () => {
        if(formik.values.file) {
            return formik.values.miniature;
        }
        return null;
    }
  return (
    <Form className='course-form' onSubmit={formik.handleSubmit}>
        <div className='course-form__miniature' {...getRootProps()}>
            <input {...getInputProps()} />
            {getMiniature() ? (
                <Image size='small' src={getMiniature()} />
            ) : (
                <div>
                    <span>Arrastra tu imagen</span>
                </div>
            )}
        </div>

        <Form.Input 
            name='title' 
            placeholder='Nombre del curso' 
            onChange={formik.handleChange} 
            value={formik.values.title} 
            error={formik.errors.title}
        />
        <Form.Input 
            name='url' 
            placeholder='Link del curso' 
            onChange={formik.handleChange} 
            value={formik.values.url} 
            error={formik.errors.url}  
        />
        <Form.TextArea 
            name='description' 
            placeholder='Pequeña descripción del curso'
            onChange={formik.handleChange} 
            value={formik.values.description} 
            error={formik.errors.description}
        />

        <Form.Group widths='equal'>
            <Form.Input 
                type='number' 
                name='price' 
                placeholder='Precio del curso'
                onChange={formik.handleChange} 
                value={formik.values.price} 
                error={formik.errors.price} 
            />
            <Form.Input 
                type='number' 
                name='score' 
                placeholder='Puntuación del curso'
                onChange={formik.handleChange} 
                value={formik.values.score} 
                error={formik.errors.score} 
            />
        </Form.Group>

        <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
            Crear Curso
        </Form.Button>
    </Form>
  )
}
