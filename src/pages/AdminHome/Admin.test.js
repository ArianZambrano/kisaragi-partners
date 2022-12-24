import AdminHome from ".";
import * as router from 'react-router'
import { BrowserRouter as Router,
        Routes,
        Route } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserContext } from "../../context/userContext"
import { getStoresById } from "../../services/StoreService";
import { wait } from "@testing-library/user-event/dist/utils/misc/wait";

jest.mock("../../services/StoreService")

const navigate = jest.fn();

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)

    const stores = [
        {
            address: "Av. La Molina",
            adminId: "639ab4e7ea3c49c632389c61",
            email: null,
            id: 3,
            image: null,
            latitude: 0,
            longitude: 0,
            name: "Tienda Miguelón"
        }
    ]

    getStoresById.mockResolvedValueOnce(stores)

    render(   
        <UserContext.Provider value={
            {
                currentUser: {
                    user_id: "639ab4e7ea3c49c632389c61"
                },
                setCurrentUser: jest.fn()
            }
        }>
            <Router>
                <Routes>
                    <Route path="*" element={<AdminHome />} />
                </Routes>
            </Router>
        </UserContext.Provider>
    )
})

test('Debe mostrar título Mis Tiendas', () => {
    expect(screen.getByText('Mis Tiendas')).toBeInTheDocument();
})

test('Debe mostrar título Añadir Tiendas', () => {
    expect(screen.getByText('Añadir Tienda')).toBeInTheDocument();
})

test('Muestra de los componentes de formulario', async () => {
    await wait( async () => {
        await act( async () => {
            await fireEvent.click(screen.getByTestId('new-store-test'));
        }) 
        expect(screen.getByText('Dirección')).toBeInTheDocument();
    });
})

test('Navegación', async () => {
    await wait (async () => {
        await act( async () => {
            await fireEvent.click(screen.getByTestId('new-store-test'));
        });
        await act( async () => {
            await fireEvent.click(screen.getByTestId('navigate-test'));
        });
        expect(navigate).toHaveBeenCalled()
    })
})

test('Test new store', async () => {
    await wait(async () => {
        const newStore = jest.fn();
        const getLatLong = jest.fn();
    
        await act(async () => {
            await fireEvent.click(screen.getByTestId('new-store-test'))
        })

        await act(async () => {
            await fireEvent.submit(screen.getByTestId('form'))
        })

        expect(newStore).toHaveBeenCalled();
        expect(getLatLong).toHaveBeenCalled()
    })
}) 