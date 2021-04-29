import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkbenchComponent } from './workbench/workbench.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'work', component: WorkbenchComponent },
      {
        path: '',
        redirectTo: '/work',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
