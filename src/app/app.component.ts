import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../../core/services/application.service';
import { IApplication } from '../../core/interfaces/application.interface';
import { ToastrService } from '@servoy/ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  applicationForm: FormGroup;

  get Name() { return this.applicationForm.controls['name'] }
  get Phone() { return this.applicationForm.controls['phone'] }
  get Email() { return this.applicationForm.controls['email'] }

  constructor(
    private readonly applicationService: ApplicationService,
    private readonly toasterService: ToastrService
  ) {
    this.applicationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }


  sendApplication(): void {
    let application: IApplication = this.applicationForm.value;
    this.applicationService.sendApplication(application).subscribe({
      next: () => {
        this.toasterService.success('Your application was sended', 'Success');
      },
      error: (err) => {
        this.toasterService.error(err.message ?? err, 'Error');
      }
    })
  }
}
