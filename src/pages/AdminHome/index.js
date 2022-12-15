import React, { useState, useEffect, useContext } from "react";
import './AdminHome.css'
import { ToastContainer, toast } from 'react-toastify';
import Container from "../../components/Container/Container";
import { Card } from "react-bootstrap";
import { Button } from "primereact";
import { getStoresById, postStore } from '../../services/StoreService'
import { UserContext } from "../../context/userContext";
import CustomForm from "../../components/CustomForm/CustomForm";

export default function AdminHome() {
    const [stores, setStores] = useState(undefined); 
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [isOpenSotreForm, setIsOpenStoreForm] = useState(false);

    useEffect(()=>{
        async function fetchData() {
            const res = await getStoresById(currentUser.user_id);
            if (!res) return;
            setStores(res)
        };

        fetchData()
    }, [])

    const getLatLong = () => {
        let latitude, longitude = 0;
        navigator.geolocation.getCurrentPosition((position) => {
            if (position) {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude
            }
        });
        return {latitude, longitude}
    }

    const newStore =  async (data) => {
        const {latitude, longitude} = getLatLong(); 

        const res = await postStore({
            ...data,
            adminId: currentUser.user_id,
            telephone: currentUser.telephone_number,
            latitude,
            longitude
        }); 

        if (res.hasOwnProperty('detail')) {
            toast.error('Algo salió mal. Vuelva a intentarlo', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            return;
        };

        const res_stores = await getStoresById(currentUser.user_id);
        if (!res_stores) return;

        setStores(res_stores)
        setIsOpenStoreForm(false)

    }

    const newStoreFields = [
        {
            key: 'name',
            label: 'Nombre de la Tienda',
            placeholder: 'ingrese Nombre de la Tienda',
            type: 'text',
            validator: 'Nombre de la Tienda es requerida'
        },
        {
            key: 'address',
            label: 'Dirección',
            placeholder: 'Ingrese Dirección',
            type: 'text',
            validator: 'Dirección es requerida'
        }
    ]

    const newStoreForm = {
        title: 'Nueva Tienda',
        fields: newStoreFields,
        buttons: [{type: 'submit', label: 'Agregar Tienda'}],
        onSubmit: newStore
    }

    return (
        <Container>
            <Card className="card">
                <Card.Header>
                    <Card.Title className="card-title">
                        Mis Tiendas
                    </Card.Title>                    
                </Card.Header>
                <Card.Body>
                    <Button label="Añadir Tienda" icon="pi pi-plus" onClick={()=>{setIsOpenStoreForm(true)}}/>
                    {
                        stores ? 
                        <></>
                        :
                        <Card.Text style={{textAlign: 'center'}}>
                            No cuenta con tiendas creadas
                        </Card.Text>
                    }
                </Card.Body>
            </Card>
            {
                isOpenSotreForm ?
                <CustomForm {...newStoreForm} />
                :
                <></>
            }
        </Container>
    )
}