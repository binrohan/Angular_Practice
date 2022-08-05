import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LoggingService } from '../logging.service';



@NgModule({
  declarations: [
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    DropdownDirective,
    PlaceholderDirective,
    LoadingSpinnerComponent,
    CommonModule
  ],
  providers: [LoggingService]
})
export class SharedModule { }
