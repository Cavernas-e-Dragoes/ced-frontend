import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CharactersComponent } from './pages/characters/characters.component';
import { AuthGuard } from './auth.guard';
import { CharacterSheetComponent } from './pages/character-sheet/character-sheet.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'characters', component: CharactersComponent },
  // { path: 'characters', canActivate: [AuthGuard], component: CharactersComponent },
  { path: 'character-sheet', component: CharacterSheetComponent },




  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
