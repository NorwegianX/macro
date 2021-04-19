import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { E404Component } from './pages/e404/e404.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectDetailsComponent } from './pages/projects/project-details/project-details.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

import { HeaderService, AuthService } from '@/services';

import { MainInterceptor } from './interceptors/main.interceptor';

import { googleIcons } from '@app/svg/google';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ProjectsComponent,
    E404Component,
    SignInComponent,
    HeaderComponent,
    ProjectDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SvgIconsModule.forRoot({
      icons: [...googleIcons],
    }),
  ],
  providers: [
    HeaderService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: MainInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
