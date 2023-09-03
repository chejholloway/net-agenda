import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { User } from 'src/app/interfaces/user.model';

@Component({
  selector: 'app-user-detail-modal',
  templateUrl: './user-detail-modal.component.html',
  styleUrls: ['./user-detail-modal.component.css']
})
export class UserDetailModalComponent implements OnInit {
  id: any;
  user: User;
  userId = +window.localStorage.getItem('editUserId');

  constructor(
    public activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getUserDetails(this.route.snapshot.params.id);
  }

  getUserDetails(id: any) {
    this.apiService
      .getUserById(id)
      .subscribe((data: any) => (this.user = data));
  }

  back() {
    this.router.navigate(['list-user']);
  }
}
