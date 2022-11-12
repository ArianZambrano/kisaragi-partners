import React from 'react';
import { TieredMenu } from 'primereact/tieredmenu';

const sidebarItems = [
    {
        label: 'Home',
        icon: 'pi pi-fw pi-home'
    },
    {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil'
    },
    {
        label: 'Products',
        icon: 'pi pi-fw pi-box'
    },
    {
        label: 'Clients',
        icon: 'pi pi-fw pi-user'
    },
    {
        label: 'Orders',
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