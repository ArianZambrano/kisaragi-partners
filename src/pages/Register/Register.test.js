import Register from ".";
import { BrowserRouter as Router,
        Routes,
        Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";

beforeEach(() => {
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
