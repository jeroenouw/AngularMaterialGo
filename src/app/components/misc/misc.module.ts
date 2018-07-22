import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCheckboxModule, MatInputModule, MatNativeDateModule,
         MatSlideToggleModule, MatStepperModule, MatTooltipModule, MatSidenavModule,
         MatTableModule, MatCardModule, MatDatepickerModule, MatExpansionModule,
         MatIconModule, MatToolbarModule } from '@angular/material';

import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';

import { MiscComponent } from './misc.component';
import { ChangeDetectionComponent } from './change/change-detection.component';
import { ChangeDetailComponent } from './change/change-detail.component';
import { StepperComponent } from './stepper/stepper.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';

@NgModule({
  declarations: [
    MiscComponent,
    ChangeDetectionComponent,
    ChangeDetailComponent,
    StepperComponent,
    ExpansionPanelComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule, MatInputModule, MatNativeDateModule,
    MatSlideToggleModule, MatStepperModule, MatTooltipModule, MatSidenavModule,
    MatTableModule, MatCardModule, MatDatepickerModule, MatExpansionModule,
    MatIconModule, MatToolbarModule,
    FormsModule,
    PipesModule,
  ],
  exports: [
    MiscComponent,
    ChangeDetectionComponent,
    ChangeDetailComponent,
    StepperComponent,
    ExpansionPanelComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class MiscModule {
}
