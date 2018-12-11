import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CvComponent } from './cv.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';

export const routes = [
  { path: '', component: CvComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule,

  ],
  declarations: [
    CvComponent
  ],
})
export class CvModule { }

