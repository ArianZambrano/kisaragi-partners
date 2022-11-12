import React from "react";
import CustomForm from "../../components/CustomForm/CustomForm";
import { login } from "../../services/AuthService";
import './Login.css'

export default function Login() {
  const onSubmit = async (data) => {
    await login(data)
    .then(res => console.log(res))
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
    <CustomForm {...customizedForm} />
  );
}