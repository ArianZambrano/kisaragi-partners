import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CustomForm from "../../components/CustomForm/CustomForm";
import { postUser } from "../../services/UserService";

export default function Register() {
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const res = await postUser({
            ...data,
            role: process.env.REACT_APP_ROLE
        })
        if (res.hasOwnProperty('detail')) {
            toast.error('Algo salió mal. Vuelva a intentarlo', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return;
        }
        toast.success("Admin Creado !", {
            position: toast.POSITION.TOP_CENTER
        });
        navigate('/login')
    }

    const registerFields = [
        {
            key: 'user_name',
            label: 'Nombre de Administrador',
            placeholder: 'Ingrese su nombre de administrador',
            type: 'text',
            validator: 'Nombre de administrador es requerido'
        },
        {
            key: 'email',
            label: 'Correo',
            placeholder: 'Ingrese correo',
            type: 'email',
            validator: 'Correo es requerido'
        },
        {
            key: 'password',
            label: 'Contraseña',
            placeholder: 'Ingrese contraseña',
            type: 'password',
            validator: 'Contraseña es requerida'
        },
        {
            key: 'birth_date',
            label: 'Fecha de Nacimiento',
            placeholder: 'Ingrese fecha de nacimiento',
            type: 'date',
            validator: 'Fecha de nacimiento es requerida'
        },
        {
            key: 'telephone_number',
            label: 'Número de Teléfono',
            placeholder: 'Ingrese número de teléfono',
            type: 'text',
            pattern:  /^^9\d{8}$/,
            validator: 'Teléfono es requerido'
        }
    ] 

    const registerButtons = [
        {
          type: 'submit',
          label: 'Registrarse'
        },
        {
          type: 'router',
          route: '/login',
          label: 'Iniciar Sesión' 
        }
    ]

    const customizedForm = {
        title: 'Regístrate como administrador',
        image: '../kisaragi.jpeg',
        fields: registerFields,
        buttons: registerButtons,
        onSubmit: onSubmit
    }

    return (
        <>
            <CustomForm {...customizedForm} />
            <ToastContainer />
        </>
    )
}