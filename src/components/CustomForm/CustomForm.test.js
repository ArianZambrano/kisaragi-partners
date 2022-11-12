import CustomForm from "./CustomForm";
import { BrowserRouter as Router,
        Routes,
        Route } from "react-router-dom";     
import { render, screen, fireEvent } from "@testing-library/react";

console.log = jest.fn()

beforeEach(() => {
    const testProps = {
        title: 'Test Title',
        fields: [{
            key: 'testKey',
            label: 'Test Field'
        }],
        buttons: [{
            label: 'Test Button'
        }],
        onSubmit: () => {log('Test submit')}
    }
    render(
        <Router>
            <Routes>
                <Route path="*" element={<CustomForm  {...testProps}/>} />
            </Routes>
        </Router>
    )
})

test('Debe mostrar el título del formulario customizado', () =>{
    expect(screen.getByText('Test Title')).toBeInTheDocument();
});

test('Debe mostrar el label del field de prueba', () => {
    expect(screen.getByText('Test Field')).toBeInTheDocument()
})

test('Debe mostrar el label del botón de prueba', () => {
    expect(screen.getByText('Test Button')).toBeInTheDocument()
})

test('Simulando evento click al botón', () => {
    const button = screen.getByRole('button');
    fireEvent.click(button);
})