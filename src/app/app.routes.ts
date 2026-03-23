import { Routes } from '@angular/router';
import { Home } from './assets/home/home';
import { ViewProduct } from './assets/view-product/view-product';
import { AddProduct } from './assets/add-product/add-product';
import { SignIn } from './assets/signIn-Up/sign-in/sign-in';
import { CardItems } from './assets/card/cardItems';
import { SignUp } from './assets/signIn-Up/sign-up/sign-up';


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
    {
        path:"sign-in", component: SignIn, data: {
            title: 'Log-in | Sissoko-Room',
            description: 'Log in to your account and start booking room'
        }
    },
    {
        path:"sign-up", component: SignUp, data: {
            title: "Sign-Up | Sissoko-Room",
            description: "Create an account and start booking room"
        }
    },
    {
        path:"room/card", component: CardItems, data: {
            title: "Card | Sissoko-Room",
            description: "list of room booked"
        }
    },
];
