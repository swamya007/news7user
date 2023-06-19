import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOpenInNewTab]',
})
export class OpenInNewTabDirective {
  constructor() {}

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent) {
    // event.preventDefault(); // Prevent the default context menu from appearing
    this.getLinkFromEventTarget(event.target);
    window.open('_blank'); // Open the link in a new tab
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
