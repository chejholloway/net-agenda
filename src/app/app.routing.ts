import { RouterModule, Routes } from '@angular/router';
import { ListUserComponent } from './user/list-user/list-user.component';
import { UserDetailModalComponent } from './modals/user-detail-modal/user-detail-modal.component';

const routes: Routes = [
  { path: 'list-user', component: ListUserComponent },
  { path: '', redirectTo: '/list-user', pathMatch: 'full' },
  {
    path: 'user-details/:id',
    component: UserDetailModalComponent,
    data: { title: 'User Details' }
  }
];

export const routing = RouterModule.forRoot(routes);
