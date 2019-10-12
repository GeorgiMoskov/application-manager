import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationListComponent } from './application-list/application-list.component';

@NgModule({
  declarations: [ApplicationListComponent],
  imports: [CommonModule],
  exports: [ApplicationListComponent]
})
export class ApplicationManagerModule {}
