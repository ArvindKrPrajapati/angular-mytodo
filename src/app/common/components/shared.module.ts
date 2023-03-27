import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { StarryComponent } from './starry/starry.component';

const comp = [LoadingComponent, StarryComponent];
@NgModule({
  declarations: comp,
  imports: [CommonModule],
  exports: comp,
})
export class SharedModule {}
