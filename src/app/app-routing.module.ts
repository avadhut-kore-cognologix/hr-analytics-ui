import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitiateReportProcessingComponent } from './components/initiate-report-processing/initiate-report-processing.component';
import { DownloadReportComponent } from './components/download-report/download-report.component';
import { UnknownErrorPageComponent } from './components/unknown-error-page/unknown-error-page.component';
import { ServerErrorPageComponent } from './components/server-error-page/server-error-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'initiate-report-processing', pathMatch: 'full' },
  { path: 'initiate-report-processing', component: InitiateReportProcessingComponent },
  { path: 'download-report', component: DownloadReportComponent },
  { path: 'download-report/:requestId', component: DownloadReportComponent },
  { path: 'server-error', component: ServerErrorPageComponent },
  { path: '**', pathMatch: 'full', component: UnknownErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
