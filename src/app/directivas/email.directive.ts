import { Directive, ElementRef, Output, Renderer2, EventEmitter } from '@angular/core';

@Directive({
  selector: '[logEmail]'
})
export class EmailDirective {

  @Output() logEmailEvent = new EventEmitter();

  constructor(private el : ElementRef,  private renderer : Renderer2) { }

  ngOnInit(): void {
    this.logEmailEvent.emit(localStorage.getItem("UsuarioActual"));
  }
}
