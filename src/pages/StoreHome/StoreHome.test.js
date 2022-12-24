import StoreHome from ".";
import * as router from 'react-router'
import { BrowserRouter as Router,
        Routes,
        Route } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserContext } from "../../context/userContext"
import { getStore } from "../../services/StoreService";
import { wait } from "@testing-library/user-event/dist/utils";
import { getProductCategoriesByStore } from "../../services/ProductsCategoryService";

jest.mock("../../services/StoreService")
jest.mock("../../services/ProductsCategoryService")

const navigate = jest.fn();

beforeEach(() => {
    const store = {
        store_data: {
            storeCategories: [{
                id: 'test',
                name: 'Test Category'
            }]
        }
    };

    const productCategories = [
        {name: 'Test Store', id: '1'}
    ]

    getStore.mockResolvedValueOnce(store)
    getProductCategoriesByStore.mockResolvedValueOnce(productCategories)

    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)

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
                    <Route path="*" element={<StoreHome />} />
                </Routes>
            </Router>
        </UserContext.Provider>
    )
})

test('Debe mostrar título Bienvenido', async () => {
    await wait(()=> {
        expect(screen.getByText('Bienvenido a tu tienda')).toBeInTheDocument();
    })
});

test('Debe mostrar título Categoría', async () => {
    await wait(()=> {
        expect(screen.getByText('Categorías: ')).toBeInTheDocument();
    })
});

test('Debe mostrar título Tus Productos', async () => {
    await wait(() => {
        expect(screen.getByText('Tus productos son: ')).toBeInTheDocument();
    })
})

test('Test Category Name', async () => {
    await wait(() => {
        expect(screen.getByText('Test Category Name')).toBeInTheDocument()
    })
})

test('On Change Category Selected', async () => {
    const onCategoryChange = jest.fn();
    await wait(async () => {
        await act(async () => {
            await fireEvent.change(screen.getByInputId('test'),
            {
                value: true
            })
        });
        expect(onCategoryChange).toHaveBeenCalled();
    })
})