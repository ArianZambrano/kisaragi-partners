import React, { useEffect, useState } from "react";
import './StoreHome.css'
import { useParams } from "react-router-dom";
import { Button } from "primereact";
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { getStore } from "../../services/StoreService";
import { getCategoriesByStore } from "../../services/StoreCategory";
import { getCategories } from "../../services/StoreCategory";

export default function StoreHome() {
    const {storeId} = useParams();
    const [store, setStore]  = useState(undefined);
    const [storeCategories, setStoreCategories] = useState([])
    const [categorySelected, setCategorySelected] = useState('All')

    useEffect(()=> {
        async function fetchStore() {
            const res = await getStore(storeId);
            setStore(res.store_data)
            
            const storeCategoriesAux = [
                {label: 'Todas las Categorías', value: 'All'},
                ...res.store_data.storeCategories.map(item => ({label: item, value: item}))
            ];
            setStoreCategories(storeCategoriesAux)
        }
        fetchStore()
    }, [])

    const getAllCategories = async() => {
        const res = await getCategories();
        console.log(res)
    }

    return store ? (
        <div className="container mt-3">
            <h2>Bienvenido a tu Tienda {store.name}</h2>
            <div className="store-categories my-5">
                <Dropdown value={categorySelected} options={storeCategories} optionLabel="label" placeholder="Seleccione una Categoría"></Dropdown>
                <Button label="Añadir Categoría" icon="pi pi-plus" onClick={()=>{}}/>
            </div>
            <p>Tus productos son: </p>
        </div>
    )
    :
    (
        <div>
            Cargando...
        </div>
    )
}