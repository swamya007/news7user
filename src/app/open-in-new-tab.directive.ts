import { Directive, ElementRef, HostListener, Input, Inject } from '@angular/core';

@Directive({
  selector: '[appOpenInNewTab]',
})
export class OpenInNewTabDirective {
  constructor() {}

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent) {
    event.preventDefault(); // Prevent the default context menu from appearing
    const link = this.getLinkFromEventTarget(event.target);
    if (link) {
      window.open(link, '_blank'); // Open the link in a new tab
    }
  }

  private getLinkFromEventTarget(target: EventTarget | null): string | null {
    if (target instanceof Element) {
      if (target.tagName === 'A') {
        return target.getAttribute('href');
      } else {
        return this.getLinkFromEventTarget(target.parentElement);
      }
    }
    return null;
  }
}
