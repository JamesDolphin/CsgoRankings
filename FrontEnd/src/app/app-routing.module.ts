import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './general/home-page/home-page.component';
import { BaseLayoutComponent } from './general/base-layout/base-layout.component';

const routes: Routes = [
  { path: "", component: BaseLayoutComponent, children: [{ path: "", component: HomePageComponent}] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


