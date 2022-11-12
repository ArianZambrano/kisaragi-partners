import Sidebar from "./Sidebar";
import { render, screen } from "@testing-library/react";

beforeEach(() => {
    render(<Sidebar />)
})

test('Item Home aparace', ()=> {
    expect(screen.getByText('Home')).toBeInTheDocument()
})

test('Item Editar aparace', ()=> {
    expect(screen.getByText('Editar')).toBeInTheDocument()
})

test('Item Clientes aparace', ()=> {
    expect(screen.getByText('Clientes')).toBeInTheDocument()
})

test('Item Productos aparace', ()=> {
    expect(screen.getByText('Productos')).toBeInTheDocument()
})

test('Item Órdenes aparace', ()=> {
    expect(screen.getByText('Órdenes')).toBeInTheDocument()
})
