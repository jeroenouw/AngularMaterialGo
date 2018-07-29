// Modules 3rd party
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatProgressBarModule,
         MatCardModule, MatIconModule } from '@angular/material';

// Components
import { SignupComponent } from './signup.component';
import { SigninComponent } from './signin.component';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MatButtonModule, MatInputModule, MatProgressBarModule,
    MatCardModule, MatIconModule
  ],
  providers: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    SignupComponent,
    SigninComponent
  ]
})
export class AuthModule {
}
