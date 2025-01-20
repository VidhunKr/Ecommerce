import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Params } from '../interface/core.interface';
import { NotificationModel } from '../interface/notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  error(arg0: string) {
    throw new Error("Method not implemented.");
  }
  success(arg0: string) {
    throw new Error("Method not implemented.");
  }

  public alertSubject = new Subject();

  public notification: boolean = true;

  constructor(private zone: NgZone,
    private http: HttpClient,
    private modalService: NgbModal,
    private toastr: ToastrService) { }

  showSuccess(message: string): void {
    this.alertSubject.next({type: 'success', message: message});
    this.zone.run(() => {
      this.modalService.dismissAll();
      if(this.notification) { 
        this.toastr.success(message);
      }
    });
  }

  showError(message: string, details?: any): void {
    this.alertSubject.next({type: 'error', message: message});
      this.zone.run(() => {    
        if(this.notification) {
          this.toastr.error(message);
        }
      });
  }

  getNotifications(payload?: Params): Observable<NotificationModel> {
    return this.http.get<NotificationModel>(`${environment.URL}/notification.json`, { params: payload });
  }

}
