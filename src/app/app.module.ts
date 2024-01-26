import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DownloadReportComponent } from './components/download-report/download-report.component';
import { InitiateReportProcessingComponent } from './components/initiate-report-processing/initiate-report-processing.component';

@NgModule({
  declarations: [
    AppComponent,
    DownloadReportComponent,
    InitiateReportProcessingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
