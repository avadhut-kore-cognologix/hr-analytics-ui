import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrl: './loading-modal.component.css'
})
export class LoadingModalComponent implements AfterViewInit {
  @ViewChild('loadingModal') loadingModal!: ElementRef;
  constructor() { }
  ngAfterViewInit(): void {
    this.loadingModal.nativeElement.style.display = 'none';
  }
  openModal() {
    this.loadingModal.nativeElement.style.display = 'block';
  }
  closeModal() {
    this.loadingModal.nativeElement.style.display = 'none';
  }
}
