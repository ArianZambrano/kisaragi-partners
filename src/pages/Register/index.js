import React from "react";
import CustomForm from "../../components/CustomForm";
import { postStore } from "../../services/StoreService";

export default function Register() {
    const onSubmit = async (data) => {
        const response = await postStore(data)
        .then(res => console.log(res)) 
    }

    const registerFields = [
        {
            key: 'address',
            label: 'Address',
            placeholder: 'Enter Address',
            type: 'text',
            validator: 'Address is required'
        }
    ] 

    const registerButtons = [
        {
          type: 'submit',
          label: 'Register'
        },
        {
          type: 'router',
          route: '/login',
          label: 'Sign in' 
        }
    ]

    const customizedForm = {
        title: 'Register your Store to Kisaragi',
        image: '../kisaragi.jpeg',
        fields: registerFields,
        buttons: registerButtons,
        onSubmit: onSubmit
    }

    return (
        <CustomForm {...customizedForm} />
    )
}