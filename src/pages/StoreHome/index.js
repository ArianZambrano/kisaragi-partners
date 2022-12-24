import React, { useEffect, useState } from "react";
import './StoreHome.css'
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Checkbox } from 'primereact/checkbox';
import { ToastContainer, toast } from 'react-toastify';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import ProductsTable from '../../components/ProductsTable/ProductTable'
import CustomForm from "../../components/CustomForm/CustomForm";
import { getStore, postStoreCategories } from "../../services/StoreService";
import { getCategories } from "../../services/StoreCategoryService";
import { getProductsByStore, postProduct, getProductsByCategory } from "../../services/ProductsService"; 
import { getProductCategoriesByStore, postProductCategories } from "../../services/ProductsCategoryService";

export default function StoreHome() {
    const {storeId} = useParams();
    const [store, setStore]  = useState(undefined);
    const [storeCategories, setStoreCategories] = useState([])
    const [categories, setCategories] = useState(undefined)

    // DIALOG 
    const [dialogIsVisible, setDialogIsVisible] = useState(false)
    const [stageSelectedCategories, setStageSelectedCategories] = useState(undefined)

    // PRODUCTS
    const [productCategories, setProductCategories] = useState([])
    const [productCategorySelected, setProductCategorySelected] = useState('All')
    const [newProductIsVisible, setNewProductIsVisible] = useState(false)
    const [stageNewProductCategory, setStageNewProductCategory] = useState('')
    const [products, setProducts] = useState([])

    useEffect(()=> {
        async function fetchStore() {
            const res = await getStore(storeId);
            setStore(res.store_data)
            setStoreCategories(res.store_data.storeCategories)
            setStageSelectedCategories(res.store_data.storeCategories)
        }
        fetchStore()
    }, [])

    useEffect(() => {
        async function fetchCategories() {
            const res = await getCategories();
            setCategories(res);
        }
        fetchCategories()
    }, [])

    useEffect(() => {
        async function fetchProductCategories() {
            const res = await getProductCategoriesByStore(storeId);
            setProductCategories([
                {name: 'Todas las Categorías', id: 'All'},
                ...res
            ])
        }   
        fetchProductCategories()
    }, [])

    useEffect(() => {
        async function fetchProducts() {
            const res = await getProductsByStore(storeId);
            setProducts(res)
        }
        fetchProducts()
    }, [])

    // STORE CATEGORIES

    const onCategoryChange  = (e) => {
        let _selectedCategories = [...stageSelectedCategories];

        if (e.checked) {
            _selectedCategories.push(e.value);
        }
        else {
            const index = _selectedCategories.findIndex(cat => cat.id === e.value.id)
            if (index > -1) { // only splice array when item is found
                _selectedCategories.splice(index, 1); // 2nd parameter means remove one item only
            }
        }        
        setStageSelectedCategories(_selectedCategories)
    }

    const addStoreCategories = async () => {
        const res = await postStoreCategories(
            store.id,
            stageSelectedCategories.map(cat => cat.id)
        )

        if (res) {
            toast.success('Categorías actualizadas', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setStoreCategories(res.storeCategories)
        };
    }

    // PRODUCT CATEGORIES

    const onChangeProductCategory = async (e) => {
        const res_prod = e.value === 'All'? await getProductsByStore(storeId)
                        :  await getProductsByCategory(e.value);
        setProductCategorySelected(e.value);
        setProducts(res_prod)
    }

    const addProductCategory = async () => {
        const res = await postProductCategories({
            storeId,
            productCategoryName: stageNewProductCategory
        });
        
        if(res.id) {
            toast.success('Categorías de Productos actualizadas', {
                position: toast.POSITION.BOTTOM_RIGHT
            });

            const res_prodcat = await getProductCategoriesByStore(storeId);
            setProductCategories([
                {name: 'Todas las Categorías', id: 'All'},
                ...res_prodcat
            ])
        }
    }

    const newProduct = async (data) => {
        const res = await postProduct({
            ...data,
            categoryId: productCategorySelected
        })
        const res_prod = productCategorySelected === 'All'? await getProductsByStore(storeId)
                       :  await getProductsByCategory(productCategorySelected);
        setProducts(res_prod)
        setDialogIsVisible(false)
    }
    
    // PRODUCT FORM
    const newProductForm =  {
        title: 'Nuevo Producto',
        fields: [
            {
                key: 'name',
                label: 'Nombre',
                placeholder: 'Ingrese nombre del producto',
                type: 'text',
                validator: 'Nombre es requerido'
            },
            {
                key: 'description',
                label: 'Descripción',
                placeholder: 'Ingrese la descripción del producto',
                type: 'text',
                validator: 'Drscripción es requerido'
            },
            {
                key: 'stock',
                label: 'Stock',
                placeholder: 'Ingrese el stock',
                type: 'text',
                validator: 'Stock es requerido'
            },
            {
                key: 'unitPrice',
                label: 'Precio Unitario',
                placeholder: 'Ingrese precio unitario',
                type: 'text',
                validator: 'Precio unitario es requerido'
            }
        ],
        buttons: [
            {
                type: 'Submit',
                label: 'Añadir Producto'
            }
        ],
        size: 'small',
        onSubmit: newProduct
    }

    return store ? (
        <>
            <div className="container mt-3">
                <h2>Bienvenido a tu Tienda {store.name}</h2>
                <div className="store-categories my-5">
                <h4>Categorías:</h4> <br></br>
                <div className="checkboxes-container">
                        {
                            categories ? 
                                categories.map(category => {
                                    return (
                                        <div key={category.id} className="field-checkbox">                            
                                            <Checkbox inputId={category.id} value={category} name="category" onChange={onCategoryChange}
                                                    checked={stageSelectedCategories.some(cat => cat.id === category.id)}></Checkbox>
                                            <label  htmlFor={category.key}>{category.name}</label>
                                        </div>
                                    )
                                })
                            : 
                            (
                                <div>Cargando...</div>
                            )
                        }
                    </div>                
                    <Button label="Actualizar" onClick={addStoreCategories}/>
                </div>
                <div className="products-header">
                    <p className="mb-4">Tus productos son: </p>
                    <Dropdown value={productCategorySelected} options={productCategories} optionLabel="name" optionValue="id" placeholder="Seleccione una Categoría"
                              onChange={onChangeProductCategory}></Dropdown>
                    <Button label="Añadir nueva categoría de producto" onClick={()=>setNewProductIsVisible(true)}></Button>                    
                </div>
                {
                    newProductIsVisible?
                    <div className="products-header">
                        <InputText onChange={(e) => {setStageNewProductCategory(e.target.value)}}/>
                        <Button label="Añadir" onClick={addProductCategory}></Button>
                    </div> 
                    :
                    <></>
                }
                <ProductsTable products={products} disabled={productCategorySelected==='All'} onNewProduct={()=>setDialogIsVisible(true)}/> 
                <Dialog visible={dialogIsVisible} style={{ width: '50vw' }} onHide={()=>setDialogIsVisible(false)} draggable={false}>
                    <CustomForm {...newProductForm} />
                </Dialog>
            </div>
            <ToastContainer />
        </>
    )
    :
    (
        <div>
            Cargando...
        </div>
    )
}