import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnInit {
  @Input() title;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private location: Location
  ) {}

  addForm: FormGroup;
  submitted = false;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      fname: ['', [Validators.required, Validators.minLength(2)]],
      lname: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      accountnumber: [],
      picture: [],
      createddate: []
    });
  }

  get validForm() {
    return this.addForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    alert('User Successfully Added!!');
    this.activeModal.close();
    this.apiService.addUser(this.addForm.value).subscribe(data => {
      this.router.navigate(['list-user']);
      this.pageRefresh();
    });
  }

  back() {
    this.router.navigate(['list-user']);
  }

  pageRefresh() {
    location.reload();
  }
}
