import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Api } from '../services/api/api';

export const authGuard: CanActivateFn = (route, state) => {
  const api = inject(Api)
  const router = inject(Router)

  // const user = api.user
  // if(user){
  //   return true
  // }else{
  //   return false;
  // }
  return true 
};
