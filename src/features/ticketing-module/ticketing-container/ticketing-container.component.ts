import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ComponentRef, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-ticketing-container',
  templateUrl: './ticketing-container.component.html',
  styleUrls: ['./ticketing-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketingContainerComponent implements OnInit {
  forms: FormGroup = new FormGroup({});
  currentStep = 1;
  ticket: any;
  imageList = [];
  selectedFiles: any;

  constructor(
    private http: HttpClient
  ){}

  ngOnInit() {
    this.initForm();
  }

  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  onSubmit() {
    this.ticket = { ...this.forms.value };
    console.log(this.ticket);
  }

  isStepValid(): boolean {
    const currentStepForm = this.forms.get(`step${this.currentStep}`);
    return currentStepForm ? currentStepForm.valid : false;  
  }

  handleFileChange(event: any) {
    this.selectedFiles = event.fileList;
  }

  onUploadPhoto() {
    const formData = new FormData();
    this.selectedFiles.forEach((file: string | Blob | any) => {
      formData.append('file', file);
    });
    this.http.post('/upload', formData).subscribe(response => {
      // handle response
    });
  }


  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      console.log('1')
      // this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      console.log('2')
      // this.msg.error(`${file.name} file upload failed.`);
    }
  }

  initForm() {
    this.forms = new FormGroup({
      step1: new FormGroup({
        plan: new FormControl('', Validators.required),
      }),
      step2: new FormGroup({
        vin: new FormControl('', Validators.required),
        make: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required),
        model: new FormControl('', Validators.required),
        mileage: new FormControl('', Validators.required)

      }),
      step3: new FormGroup({
        damage: new FormControl('', Validators.required),
      }),
      step4: new FormGroup({
        imageUpload: new FormControl(''),
      }),
    });
  }
}
