import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskserviceService } from 'src/app/taskservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskform: any = FormGroup;
  attachment: any;
  submitted: boolean = false;
  constructor(private serviceobj: TaskserviceService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.taskform = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: ['',[Validators.required]],
      priority: ['',[Validators.required]],
      status: ['',[Validators.required]],
      attachment: ['',[Validators.required]],
    })
  }
  get f() { return this.taskform.controls }

  onselectfile(event: any) {
    this.attachment = event.target.files[0]
    console.log("file name :", this.attachment?.name)
  }

  addTaskData() {
    this.submitted = true;
    if (this.taskform.valid) {
      this.serviceobj.addTaskData(this.taskform.value).subscribe((res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Record Added Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.submitted = false;
        this.router.navigate(['/task-list']);
      })
    } else {
      return
    }
  }
}
