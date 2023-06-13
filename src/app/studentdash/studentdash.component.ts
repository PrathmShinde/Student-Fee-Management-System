import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { StudentDashModel } from './studentDash.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-studentdash',
  templateUrl: './studentdash.component.html',
  styleUrls: ['./studentdash.component.css']
})
export class StudentdashComponent {

  showAdd !: boolean;
  showUpdate !: boolean;

  addDetails!: FormGroup;
  StudentModelObj : StudentDashModel = new StudentDashModel();      //Object creation

  studentAll : any;

  constructor(public fb : FormBuilder, private api : ApiService) {
    
  this.addDetails = this.fb.group({
    fname : ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
    lname : ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
    studentEmail : ['', [Validators.required, Validators.email]],
    mobileNo : ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]],
    fees : ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
  })

  this.getAllStudent();   //Automatically called when application get start
  }


  clickAddStudent() {
    this.addDetails.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  //CREATE
  postStudentDetails() {
    this.StudentModelObj.firstName = this.addDetails.value.fname;
    this.StudentModelObj.lastName = this.addDetails.value.lname;
    this.StudentModelObj.emailId = this.addDetails.value.studentEmail;
    this.StudentModelObj.mobile = this.addDetails.value.mobileNo;
    this.StudentModelObj.fees = this.addDetails.value.fees;

    this.api.postStudent(this.StudentModelObj).subscribe(res => {
      console.log(res);
      alert("Student record added successfully..!")
      this.addDetails.reset();
      this.getAllStudent();
    }),
    () =>  {
        alert("Something went wrong.")
    }
  }
  //READ
  getAllStudent() {
     this.api.getStudent().subscribe(res => {
      this.studentAll = res;
     })
  }

  //DELETE 

  deleteStudents(data : any) {
    this.api.deleteStudent(data.id).subscribe(res =>{
      alert("record deleted succesfully..!")
      this.getAllStudent();
    })
  }

  //UPDATE 

  onEdit(data:any) {

    this.showAdd = false;
    this.showUpdate = true;

    this.StudentModelObj.id = data.id;
    this.addDetails.controls['fname'].setValue(data.firstName);
    this.addDetails.controls['lname'].setValue(data.lastName);
    this.addDetails.controls['studentEmail'].setValue(data.emailId);
    this.addDetails.controls['mobileNo'].setValue(data.mobile);
    this.addDetails.controls['fees'].setValue(data.fees);
  }
  updateStudentDetails(){

    this.StudentModelObj.firstName = this.addDetails.value.fname;
    this.StudentModelObj.lastName = this.addDetails.value.lname;
    this.StudentModelObj.emailId = this.addDetails.value.studentEmail;
    this.StudentModelObj.mobile = this.addDetails.value.mobileNo;
    this.StudentModelObj.fees = this.addDetails.value.fees;

    this.api.updateStudent(this.StudentModelObj.id,this.StudentModelObj).subscribe(res =>{
      alert("record updated successfully..");
      this.addDetails.reset(); 
      this.getAllStudent();
    })

  }

}
