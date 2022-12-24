import CustomForm from "./CustomForm";
import { BrowserRouter as Router,
        Routes,
        Route } from "react-router-dom";     
import { render, screen, fireEvent, spyOn } from "@testing-library/react";
import { act } from "react-dom/test-utils";

const MOCK_FUNCT = jest.fn();

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
        onSubmit: MOCK_FUNCT
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

test('Simulando evento click al botón', async () => {
    await act( async () => {
        await fireEvent.submit(screen.getByTestId('form'));
    })
    expect(MOCK_FUNCT).toHaveBeenCalled();
})