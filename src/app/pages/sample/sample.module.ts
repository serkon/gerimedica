import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

import { SampleComponent } from './sample.component';
import { SampleRoutingModule } from './sample-routing.module';

@NgModule({
  declarations: [SampleComponent],
  imports: [CommonModule, SampleRoutingModule, SharedModule],
})
export class SampleModule {}
