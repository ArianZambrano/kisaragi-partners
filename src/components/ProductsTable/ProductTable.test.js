import ProductTable from "./ProductTable";
import { BrowserRouter as Router,
    Routes,
    Route } from "react-router-dom";     
import { render, screen, fireEvent, spyOn } from "@testing-library/react";

beforeEach(() => {
    const testProps = {
        products: [
            {
                name: 'Test P Name',
                description: 'Test P Description',
                stock: 10,
                unitPrice: 10
            },
        ]
    }
    render(
        <Router>
            <Routes>
                <Route path="*" element={<ProductTable  {...testProps}/>} />
            </Routes>
        </Router>
    )
})

test('Debe mostrar nombre de producto', () => {
    expect(screen.getByText('Test P Name')).toBeInTheDocument();
});

test('Debe mostrar descripción de producto', () => {
    expect(screen.getByText('Test P Description')).toBeInTheDocument();
});

