import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplicationListComponent } from './application-list/application-list.component';
import { ViewEditAddApplicationComponent } from './view-edit-add-application/view-edit-add-application.component';

@NgModule({
  declarations: [ApplicationListComponent, ViewEditAddApplicationComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ApplicationListComponent]
})
export class ApplicationManagerModule {}
