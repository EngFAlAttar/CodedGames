import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { StartComponent } from './start/start.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'start', component: StartComponent}
];
