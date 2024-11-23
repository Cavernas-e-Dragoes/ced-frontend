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
import { MagiasComponent } from './pages/magias/magias.component';
import { MagicDetailComponent } from './components/magic-detail/magic-detail.component';
import { LoadingComponent } from './components/loading/loading.component';
import { EquipamentosCategoriasComponent } from './pages/equipamentos/equipamentos-categorias/equipamentos-categorias.component';
import { AtaqueComponent } from './pages/equipamentos/ataque/ataque.component';
import { DefesaComponent } from './pages/equipamentos/defesa/defesa.component';
import { KitsComponent } from './pages/equipamentos/kits/kits.component';
import { MagicosComponent } from './pages/equipamentos/magicos/magicos.component';
import { MontariaComponent } from './pages/equipamentos/montaria/montaria.component';
import { UtilitariosComponent } from './pages/equipamentos/utilitarios/utilitarios.component';


const routes: Routes = [

  { path: 'home', component: HomeComponent  },
  { path: 'login', component: LoginComponent  },
  { path: 'header', component: HeaderComponent  },
  { path: 'register', component: RegisterComponent  },
  { path: 'footer', component: FooterComponent  },

  { path: 'classes', component: ClassesComponent  },
  { path: 'classes/:index', component: ClassDetailComponent },

  { path: 'races', component: RacesComponent },
  { path: 'races/:index', component: RaceDetailComponent },

  { path: 'magias', component: MagiasComponent },
  { path: 'magias/:index', component: MagicDetailComponent },

  { path: 'equipamentos-categorias', component: EquipamentosCategoriasComponent },
  { path: 'ataque', component: AtaqueComponent },
  { path: 'defesa', component: DefesaComponent },
  { path: 'kits', component: KitsComponent },
  { path: 'magicos', component: MagicosComponent },
  { path: 'montaria', component: MontariaComponent },
  { path: 'utilitarios', component: UtilitariosComponent },





  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
