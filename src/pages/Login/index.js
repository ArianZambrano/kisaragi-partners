import React from "react";
import CustomForm from "../../components/CustomForm";
import './Login.css'

export default function Login() {
  const onSubmit = (data) => {
    console.log(data);
  }

  const loginFields = [
    {
      key: 'email',
      label: 'Email',
      placeholder: 'Enter Email',
      type: 'email',
      validator: 'Email is required'
    },
    {
      key: 'password',
      label: 'Password',
      placeholder: 'Enter Password',
      type: 'password',
      validator: 'Password is required'
    }
  ];

  const loginButtons = [
    {
      type: 'submit',
      label: 'Login'
    },
    {
      type: 'router',
      route: '/register',
      label: 'Register your store' 
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