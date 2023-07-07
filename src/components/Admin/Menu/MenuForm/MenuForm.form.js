import * as Yup from 'yup';

export function initialValues(menu) {
    console.log(menu);
    return {
        title: menu ? menu.title : '',
        path: menu ? menu.path : '',
        protocol: 'https://',
        active: menu ? menu.active : true,
        order: menu ? menu.order : undefined
        
    }
}

export function validationSchema() {
    return Yup.object({
        title: Yup.string().required(true),
        path: Yup.string().required(true),
        order: Yup.number().required(true)
    })
}