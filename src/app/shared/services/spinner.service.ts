import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { defer, NEVER } from 'rxjs';
import { finalize, share } from 'rxjs/operators';

/**
 * Service that shows and hides a spinner by using an overlay.
 * Provides a plugin-agnostic interface. 
*/

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private overlayRef: OverlayRef = undefined;

  constructor(private overlay: Overlay) {}

  /** 
   * Organizes the show and hide logic of the spinner into an observable.
  */
  public readonly spinner$ = defer(() => {
    this.show();
    return NEVER.pipe(
      finalize(() => {
        this.hide();
      })
    );
  }).pipe(share());

  /** 
   * Shows a spinner overlay.
  */
  public show(): void {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        hasBackdrop: true,
      });
      this.overlayRef.attach(new ComponentPortal(SpinnerComponent));
  }

  /** 
   * Hides a spinner overlay.
  */
  public hide(): void {
    this.overlayRef.detach();
    this.overlayRef = undefined;
  }
}
