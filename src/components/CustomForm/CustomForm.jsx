import React from "react";
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

// Styled Components 

const FormContainer = styled.div`
    padding: 60px 0;
    margin: 0 auto;
    max-width: 320px
`

const FormHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin: 16px 0;
`

const FormTitle = styled.h2`
    text-align: center;
`

const FormActions = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px
`

const LinkNavigate = styled.a`
    font-style: italic;
    cursor: pointer
    
`

export default function CustomForm({title, image, fields, buttons, onSubmit}) {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <FormContainer>
            <FormHeader>
                <FormTitle>{title}</FormTitle>
                <img src={image} alt={image} />
            </FormHeader>
            <Form onSubmit={handleSubmit(onSubmit)}>
                {
                    fields.map(field => 
                        <Form.Group size="lg" controlId={field.key}>
                            <div className="p-2">
                                <Form.Label style={{fontWeight: 'bold'}}>{field.label}</Form.Label>
                            </div>
                            <Form.Control 
                                type={field.type}
                                placeholder={field.placeholder}
                                pattern={field.pattern}
                                {...register(field.key, {required: field.validator})}
                            />
                            {
                                errors[field.key] && (
                                    <Form.Text className="text-danger">
                                        {errors[field.key].message}
                                    </Form.Text>
                                )
                            }
                        </Form.Group>
                    )
                }
                <FormActions>
                    {
                        buttons.map(button => (
                            button.type === 'router' ?
                            <LinkNavigate onClick={()=>{navigate(button.route)}}>
                                {button.label}
                            </LinkNavigate>
                            : 
                            <Button block="true" size="lg" type={button.type}>
                                {button.label}
                            </Button>
                        ))
                    }
                </FormActions>
            </Form>
        </FormContainer>
    )
}