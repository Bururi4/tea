import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

declare var $: any;
import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('modal') private modal!: TemplateRef<any>;
  private modalRef!: NgbModalRef;
  private observable: Observable<any>;

  constructor(private modalService: NgbModal) {
    $(document).ready(function () {
      $('.accordion').accordion({
        active: true,
        heightStyle: 'content',
        header: '> .accordion-item > .accordion-header'
      });
    });

    this.observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next()
      }, 10000)
    })
  }

  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.observable.subscribe(() => {
      this.modalRef = this.modalService.open(this.modal);
    })
    this.modalClose();
  }

  modalClose() {
    if (this.modalRef) {
      this.modalRef.close();
      this.subscription?.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.modalRef.close();
    this.subscription?.unsubscribe();
  }
}
