import React, { useState, useEffect } from "react";
import './AdminHome.css'
import Container from "../../components/Container/Container";
import { Card } from "react-bootstrap";
import { Button } from "primereact";
import { getStoresById } from '../../services/StoreService'

export default function UserHome() {
    const [stores, setStores] = useState(); 

    useEffect(()=>{
        
    }, [])

    return (
        <Container>
            <Card className="card">
                <Card.Header>
                    <Card.Title className="card-title">
                        Mis Tiendas
                    </Card.Title>                    
                </Card.Header>
                <Card.Body>
                    <Button label="Añadir Tienda" icon="pi pi-plus" />
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
        </Container>
    )
}