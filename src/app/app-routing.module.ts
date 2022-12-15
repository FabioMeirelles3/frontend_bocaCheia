import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { UserAuthenticatedGuard } from './components/sistema/guards/services/userAuthenticated.guard';
import { UserNotAuthenticatedGuard } from './components/sistema/guards/services/userNotAuthenticated.guard';
import { LoginComponent } from './components/sistema/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UserNotAuthenticatedGuard]},
  {
    path: '', component: PrincipalComponent, canActivate: [UserAuthenticatedGuard],
      children: [
        { path: 'restaurant', component: RestaurantComponent,},
        { path: 'restaurant/:id', component: MenuComponent},
    ]
  }
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
