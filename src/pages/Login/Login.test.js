import Login from ".";
import { BrowserRouter as Router,
        Routes,
        Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";

beforeEach(() => {
    render(   
        <Router>
            <Routes>
                <Route path="*" element={<Login />} />
            </Routes>
        </Router>
    )
})

test('Debe mostrar el campo de correo', () =>{
    expect(screen.getByText('Correo')).toBeInTheDocument();
});

test('Debe mostrar el campo de contraseña', () => {
    expect(screen.getByText('Contraseña')).toBeInTheDocument()
})