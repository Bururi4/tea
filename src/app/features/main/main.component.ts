declare var $: any;
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private observable: Observable<any>;
  private modal: HTMLElement | null = document.getElementById('modal');

  constructor() {
    $(document).ready(function () {
      $('.accordion').accordion({
        active: true,
        heightStyle: 'content',
        header: '> .accordion-item > .accordion-header'
      });
    });

    this.observable = new Observable((observer) => {
      setTimeout(() => {
        observer.next(document.getElementById('modal'))
      }, 10000)
    })
  }

  private subscription: Subscription | null = null;

  ngOnInit(): void {
    this.subscription = this.observable.subscribe((modal: HTMLElement) => {
      modal!.style.display = 'block'
    })
    this.modalClose();
  }

  modalClose() {
    document.getElementById('btnModalClose')!.onclick = () => {
      document.getElementById('modal')!.style.display = 'none';
      this.subscription?.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
