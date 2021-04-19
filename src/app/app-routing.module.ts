import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectDetailsComponent } from './pages/projects/project-details/project-details.component';

import { SignInComponent } from './pages/sign-in/sign-in.component';
import { E404Component } from './pages/e404/e404.component';

import { AuthGuard, NotAuthGuard } from '@/guards';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'project/:id',
    component: ProjectDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [NotAuthGuard],
  },
  {
    path: '**',
    component: E404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
