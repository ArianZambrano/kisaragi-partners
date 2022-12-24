import Register from ".";
import * as router from 'react-router'
import { BrowserRouter as Router,
        Routes,
        Route } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { render, screen, fireEvent } from "@testing-library/react";

const navigate = jest.fn();

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)

    render(   
        <Router>
            <Routes>
                <Route path="*" element={<Register />} />
            </Routes>
        </Router>
    )
})

test('Debe mostrar el campo de correo', () =>{
    expect(screen.getByText('Correo')).toBeInTheDocument();
});

test('Debe mostrar el campo de contraseña', () => {
    expect(screen.getByText('Contraseña')).toBeInTheDocument()
});

test('Debe mostrar el campo de nombre de usuario', () => {
    expect(screen.getByText('Nombre de Administrador')).toBeInTheDocument()
});

test('Debe mostrar el campo de fecha de nacimiento', () => {
    expect(screen.getByText('Fecha de Nacimiento')).toBeInTheDocument()
});

test('Debe mostrar el campo de número de teléfono', () => {
    expect(screen.getByText('Número de Teléfono')).toBeInTheDocument()
})

test('Test onSubmit', async () => {
    await act( async () => {
        await fireEvent.submit(screen.getByTestId('form'));
    })
    expect(navigate).not.toHaveBeenCalled()
})