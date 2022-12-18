import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import './AdminHome.css'
import { ToastContainer, toast } from 'react-toastify';
import Container from "../../components/Container/Container";
import { Card } from "react-bootstrap";
import { Button } from "primereact";
import { getStoresById, postStore } from '../../services/StoreService'
import { UserContext } from "../../context/userContext";
import CustomForm from "../../components/CustomForm/CustomForm";

export default function AdminHome() {
    const [stores, setStores] = useState([]); 
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [isOpenSotreForm, setIsOpenStoreForm] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchData() {
            const res = await getStoresById(currentUser.user_id);
            if (!res) return;
            setStores(res)
        };

        fetchData()
    }, [])

    const getLatLong = () => {
        let latitude = 0, longitude = 0;
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position)
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
        },
        {
            key: 'telephone',
            label: 'Teléfono de la tienda',
            placeholder: 'Ingrese el Teléfono de la tienda',
            type: 'text',
            validator: 'Ingrese el teléfono de la tienda'
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
                        stores.length !== 0 ? 
                        <div className="grid-container">
                            {
                                stores.map(store => (
                                    <Card className="grid-container-card">
                                        <Card.Header className="card-title">
                                            {store.name}
                                        </Card.Header>
                                        <Card.Body>
                                            <p>Dirección: {store.address}</p>
                                            <p>Teléfono: {store.telephone}</p>
                                        </Card.Body>
                                        <Card.Footer>
                                            <div className="d-flex justify-content-end">
                                                <Button label="Ir" onClick={()=>{navigate(`/store-home/${store.id}`)}}></Button>
                                            </div>
                                        </Card.Footer>
                                    </Card>
                                ))
                            }
                        </div>
                        :
                        <Card.Text style={{textAlign: 'center'}}>
                            No cuenta con tiendas creadas
                        </Card.Text>
                    }
                </Card.Body>
            </Card>
            {
                isOpenSotreForm ?
                <>
                    <CustomForm {...newStoreForm} />
                    <ToastContainer />
                </>
                :
                <></>
            }
        </Container>
    )
}