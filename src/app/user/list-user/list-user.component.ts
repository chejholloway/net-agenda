import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { EditUserModalComponent } from 'src/app/modals/edit-user-modal/edit-user-modal.component';
import { AddUserModalComponent } from 'src/app/modals/add-user-modal/add-user-modal.component';
import { UserDetailModalComponent } from 'src/app/modals/user-detail-modal/user-detail-modal.component';
import { User } from 'src/app/interfaces/user.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: User[];
  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions: NgbModalOptions;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private modalService: NgbModal
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  ngOnInit() {
    this.apiService.getUsers().subscribe(data => {
      if (!data) {
        this.log(Error);
      } else {
        this.users = (data as unknown) as User[];
      }
    });
  }

  deleteUser(user: User): void {
    this.apiService.deleteUser(user.id).subscribe(data => {
      this.users = this.users.filter(u => u !== user);
    });
  }

  editUser(user: User): void {
    window.localStorage.removeItem('editUserId');
    window.localStorage.setItem('editUserId', user.id.toString());
    this.router.navigate(['edit-user']);
    this.pageRefresh();
  }

  addUser(): void {
    this.router.navigate(['add-user']);
  }

  openEditModal(user: User): void {
    const modalRef = this.modalService.open(EditUserModalComponent, {
      centered: true
    });
    window.localStorage.removeItem('editUserId');
    window.localStorage.setItem('editUserId', user.id.toString());
    modalRef.componentInstance.title = 'Edit User';
  }

  openAddModal(): void {
    const modalRef = this.modalService.open(AddUserModalComponent, {
      centered: true
    });
    modalRef.componentInstance.title = 'Add New User';
  }

  pageRefresh() {
    location.reload();
  }

  log(msg) {
    // tslint:disable-next-line: no-console
    return console.trace(msg);
  }
}
