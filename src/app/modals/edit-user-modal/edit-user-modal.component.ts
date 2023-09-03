import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user.model';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit {
  @Input() title = 'Edit User';

  user: User;
  editForm: FormGroup;
  submitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const userId = window.localStorage.getItem('editUserId');
    if (!userId) {
      alert('Invalid action.');
      this.router.navigate(['list-user']);
      return;
    }

    this.editForm = new FormGroup({
      id: new FormControl(),
      fname: new FormControl(),
      lname: new FormControl(),
      email: new FormControl(),
      accountnumber: new FormControl(),
      picture: new FormControl(),
      createddate: new FormControl()
    });

    this.editForm = this.formBuilder.group({
      id: [],
      fname: ['', [Validators.required, Validators.minLength(2)]],
      lname: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      accountnumber: [],
      picture: [],
      createddate: []
    });

    this.apiService.getUserById(+userId).subscribe(data => {
      this.editForm.setValue(data);
    });
  }

  get validForm() {
    return this.editForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.apiService
      .updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          alert('User updated successfully.');
          this.activeModal.close();
          this.router.navigate(['list-user']);
          this.pageRefresh();
        },
        error => {
          alert(error);
        }
      );
  }

  pageRefresh() {
    location.reload();
  }
}
