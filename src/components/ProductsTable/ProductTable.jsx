import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";

const ProductsTable = ({products, onNewProduct, disabled, onDelete}) => {
    return (
        <div className="card">
            <DataTable value={products} responsiveLayout="scroll"> 
                <Column field="name" header="Nombre"></Column>
                <Column field="description" header="Descripción"></Column>
                <Column field="stock" header="Stock"></Column>
                <Column field="unitPrice" header="Precio Unitario"></Column>
            </DataTable>
            <div className="my-3 mx-1 d-flex justify-content-end">
                <Button label="Añadir Producto" onClick={onNewProduct} disabled={disabled}></Button>
            </div>
        </div>
    )
}

export default ProductsTable