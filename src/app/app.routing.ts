import { Routes, RouterModule } from '@angular/router';
 
import { HomeComponent } from './home';
import { CategoryComponent } from './category';
import { TopicComponent } from './topic';
import { AdditionComponent } from './addition';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AdminComponent } from './admin';
import { AuthGuard } from './_guards';
import {DataResolve} from './resolve';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'category', component: CategoryComponent,  canActivate: [AuthGuard]},
    { path: 'topic', component: TopicComponent,  canActivate: [AuthGuard],  resolve: {
        data: DataResolve,
      } },
    { path: 'addition', component: AdditionComponent,  canActivate: [AuthGuard], resolve: {
        data: DataResolve,
      }},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
 
export const routing = RouterModule.forRoot(appRoutes);