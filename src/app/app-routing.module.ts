import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { TokenAuthGuard } from './guards/token-auth.guard';

const routes: Routes = [

  { path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },

  { path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [TokenAuthGuard],  
  },
  { path: '**',
    redirectTo: '/auth/login' 
  },
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
