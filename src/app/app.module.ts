import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService } from './service/auth-guard/auth-guard.service';
import { ApiService } from './service/api/api.service';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from './common/components/shared.module';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule,
    SharedModule,
  ],
  providers: [AuthGuardService, ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
