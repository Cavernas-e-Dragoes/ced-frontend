import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { ClassDetailComponent } from './components/class-detail/class-detail.component';
import { RacesComponent } from './pages/races/races.component';
import { RaceDetailComponent } from './components/race-detail/race-detail.component';


const routes: Routes = [

  { path: 'home', component: HomeComponent  },
  { path: 'login', component: LoginComponent  },
  { path: 'header', component: HeaderComponent  },
  { path: 'register', component: RegisterComponent  },
  { path: 'footer', component: FooterComponent  },
  { path: 'classes', component: ClassesComponent  },
  { path: 'races', component: RacesComponent },
  { path: 'races/:index', component: RaceDetailComponent },

  { path: '', redirectTo: '/classes', pathMatch: 'full' },
  { path: 'classes/:index', component: ClassDetailComponent },
  { path: '**', redirectTo: '/classes' }

 // { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
