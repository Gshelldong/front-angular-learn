import {Component, ElementRef, ViewChild} from '@angular/core';
import {ButtonComponent} from "../../../shared/button/button.component";
import {ControlComponent} from "../../../shared/control/control.component";
import {Title} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [
    ButtonComponent,
    ControlComponent,
    FormsModule
  ],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {

  protected readonly Title = Title;
  @ViewChild('form') private form?: ElementRef<HTMLFormElement>;


  onSubmit(title: string, request:string) {
    console.log('SUBMITED!');
    console.log(title, request);
    this.form?.nativeElement.reset();
  }
}
