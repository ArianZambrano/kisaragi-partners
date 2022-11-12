import React from 'react';
import { TieredMenu } from 'primereact/tieredmenu';

const sidebarItems = [
    {
        label: 'Home',
        icon: 'pi pi-fw pi-home'
    },
    {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil'
    },
    {
        label: 'Productos',
        icon: 'pi pi-fw pi-box'
    },
    {
        label: 'Clientes',
        icon: 'pi pi-fw pi-user'
    },
    {
        label: 'Órdenes',
        icon: 'pi pi-fw pi-shopping-bag'
    },
    {
        separator: true
    },
    {
        label: 'Quit',
        icon: 'pi pi-fw pi-power-off'
    }
]

export default function Sidebar() {
    return (
        <TieredMenu model={sidebarItems} />
    )
}