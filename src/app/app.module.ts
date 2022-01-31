import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FrontendFrameworksChartComponent } from './components/frontend-frameworks-chart/frontend-frameworks-chart.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, FrontendFrameworksChartComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
