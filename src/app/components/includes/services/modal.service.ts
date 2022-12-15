import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  open: boolean = false;
  modalTitle!: string;
  modalDestaque!: string;
  modalText!: string;
  modalContinue!: string;

  constructor() { }
}

