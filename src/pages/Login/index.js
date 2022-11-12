import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import CustomForm from "../../components/CustomForm/CustomForm";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/AuthService";
import './Login.css'

export default function Login() {
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const res = await login(data)
    if (!res) {
      toast.error('Algo salió mal. Vuelva a intentarlo', {
          position: toast.POSITION.BOTTOM_RIGHT
      })
      return;
    }
    navigate('../admin-home') 
  }

  const loginFields = [
    {
      key: 'email',
      label: 'Correo',
      placeholder: 'Ingrese coreo',
      type: 'email',
      validator: 'Correo es requerido'
    },
    {
      key: 'password',
      label: 'Contraseña',
      placeholder: 'Ingrese contraseña',
      type: 'password',
      validator: 'Contraseña es requerida'
    }
  ];

  const loginButtons = [
    {
      type: 'submit',
      label: 'Iniciar Sesión'
    },
    {
      type: 'router',
      route: '/register',
      label: 'Registrarte como admin' 
    }
  ]

  const customizedForm = {
    title: 'Kisaragi Partners',
    image: '../kisaragi.jpeg',
    fields: loginFields,
    buttons: loginButtons,
    onSubmit: onSubmit
  }

  return (
    <>
      <CustomForm {...customizedForm} />
      <ToastContainer />
    </>
  );
}