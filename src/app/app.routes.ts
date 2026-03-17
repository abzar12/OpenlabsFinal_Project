import { Routes } from '@angular/router';
import { Home } from './assets/home/home';
import { ViewProduct } from './assets/view-product/view-product';
import { AddProduct } from './assets/add-product/add-product';


export const routes: Routes = [
    {path: "", component: Home , data: {
        title: 'Home | Sissoko-Room ',
        description: 'Welcome to my homepage',
    }},
    {path: "view-product/:slug", component: ViewProduct, data: {
        title: 'View-Room | Sissoko-Room',
        description: 'Browse our rooms',
    }},
    {path:"products/add", component: AddProduct, data: {
        title: 'Create room | Sissoko-Room',
        description: 'create new room description',
    }},
];
