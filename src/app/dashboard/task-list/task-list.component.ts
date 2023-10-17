import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskserviceService } from 'src/app/taskservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  page: number = 1;
  taskform: any = FormGroup;
  ref: any;
  taskarray: any = [];
  additionalFields: any = {};
  id: any;
  searchText: string = '';
  title: any;
  description: any;
  dueDate:any;
  priority: any;
  status: any;
  totalTask:any
  submitted:boolean=false;
  totalCompletedTasks:number=0;
  totalProgrssTasks:number=0;
  pendingTasks:number=0;
  attachment:any;
  constructor(private serviceobj: TaskserviceService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.taskform = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      priority: [''],
      status: ['', [Validators.required]],
      attachment: ['', [Validators.required]],
    })
    this.getAllTaskData();
  }
  get f() { return this.taskform.controls }

  getAllTaskData() {
    this.serviceobj.getAllVendorData().subscribe((res: any) => {
      this.taskarray = res;
      this.totalTask=res.length;
      this.totalCompletedTasks = this.taskarray.filter((res:any) => res.status === 'Completed').length;
      this.totalProgrssTasks = this.taskarray.filter((res:any) => res.status === 'In Progress').length;
      this.pendingTasks = this.taskarray.filter((res:any) => res.status === 'Pending').length;
    })
  }
  onselectfile(event: any) {
    this.attachment = event.target.files[0]
    console.log("file name :", this.attachment?.name)
  }
  setTaskData(data: any) {
    this.id = data.id;
    this.id = data.id,
    this.taskform.patchValue({
      title : data.title,
      description : data.description,
      dueDate :data.dueDate,
      priority :data.priority,
      status : data.status,
    });
  }
  updateTaskData() {
    this.serviceobj.updateTaskData(this.id, this.taskform.value).subscribe((response: any) => {
      // console.log('Data Updated successfully.', response);
      this.ref = document.getElementById('cancle1');
      this.ref?.click();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Record Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      this.taskform.reset();
      this.getAllTaskData();
    },
      (error) => {
        console.error('Error inserting data:', error);
      }
    )
  }

  deleteRow(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceobj.deleteVendorData(id).subscribe((rrr:any) => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Record Has Been Deleted',
            showConfirmButton: false,
            timer: 1000
          })
          this.getAllTaskData();
          // window.location.reload();
        });
      }
    })
  }
  viewDetails(data:any){
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.dueDate = data.dueDate;
    this.priority = data.priority;
    this.status = data.status;
  }

  search() {
    if (this.searchText == '') {
      this.ngOnInit();
    }
    this.taskarray = this.taskarray.filter((res: any) => {
      // return res.status.toLowerCase().includes(this.searchText.toLowerCase());
      return JSON.stringify(res).toLowerCase().includes(this.searchText.toLowerCase());
    })
  }
}
