import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { AddUserModalComponent } from './modals/add-user-modal/add-user-modal.component';
import { EditUserModalComponent } from './modals/edit-user-modal/edit-user-modal.component';

import { ApiService } from './service/api.service';
import { UserDetailModalComponent } from './modals/user-detail-modal/user-detail-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    AddUserModalComponent,
    EditUserModalComponent,
    UserDetailModalComponent
  ],
  entryComponents: [
    AddUserModalComponent,
    EditUserModalComponent,
    UserDetailModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [ApiService, NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule {}
