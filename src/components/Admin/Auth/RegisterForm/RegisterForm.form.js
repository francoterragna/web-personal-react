import * as Yup from "yup";

export function initialValues () {
    return {
        email:'',
        password:'',
        repeatPassword:'',
        conditionsAccepted: false
    }
}


export function validationSchema(){
    return Yup.object({
        email:Yup.string().email("El email no es válido")
        .required("Campo obligatorio"),
        password: Yup.string().required("Campo obligatorio"),
        repeatPassword: Yup.string()
        .required("Campo obligatorio")
        .oneOf([Yup.ref("password")], "Las contraseñas tienen que ser iguales"),
        conditionsAccepted: Yup.bool().isTrue(true) // Al ponerle true no mostrará ningún mensaje y sólo se pondrá rojo 
    });
}