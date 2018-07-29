// Modules 3rd party
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Main
import { AppComponent } from './app.component';

// 404 page
import { PageNotFoundComponent } from './components/not-found/not-found.component';

// Pages
import { HomeComponent } from './components/home/home.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { MiscComponent } from './components/misc/misc.component';
import { BlockchainComponent } from './components/blockchain/blockchain.component';

// Components
import { SignupComponent } from './components/auth/signup.component';
import { SigninComponent } from './components/auth/signin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileSettingsComponent } from './components/profile/profile-settings.component';

// Protected
import { AuthGuardService } from './components/shared';

// Routing
const appRoutes: Routes = [
  // Public pages
  { path: '', redirectTo: '/home', pathMatch : 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutMeComponent },
  { path: 'misc', component: MiscComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SigninComponent },
  // Protected pages
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]  },
  { path: 'blockchain', component: BlockchainComponent, canActivate: [AuthGuardService] },
  { path: 'profile-settings', component: ProfileSettingsComponent, canActivate: [AuthGuardService] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
