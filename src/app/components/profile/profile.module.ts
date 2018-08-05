// Modules 3rd party
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatInputModule,
         MatToolbarModule, MatCardModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

// Components
import { ProfileComponent } from './profile.component';
import { ProfileSettingsComponent } from './profile-settings.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileSettingsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatMenuModule, MatInputModule,
    MatToolbarModule, MatCardModule,
    FormsModule
  ],
  exports: [
    ProfileComponent,
    ProfileSettingsComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ProfileModule {
}
