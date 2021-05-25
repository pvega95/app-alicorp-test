import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProcessComponent } from './features/list-process/list-process.component';

const routes: Routes = [
  { path: '', component: ListProcessComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
