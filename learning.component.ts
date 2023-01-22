import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearningComponent implements OnInit {

  last1$: Observable<Last1Details> | undefined;

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit() { }
  
  public OpenModal() : void {
	  combineLatest([
		this.last1$,
		this.modalService
		.createModal(AnyModalComponent, {
			modalSize: ModalSize.LARGE,
		})
		.pipe(take(1)),
	  ])
		.pipe(take(1))
		.subscribe(([last1Details, modalInstance]: [Last1Details, AnyModalComponent]) => {
			modalInstance.user = last1Details.user;
		});
  }
  
  public getUser(): Observable<User> {
    return this.getCode().pipe(
      switchMap((codeUser: CodeUser) => {
        if (codeUser) {
          return this.userService.getDataUser(codeUser.kod).pipe(
            catchError(err => {
              // return EMPTY;
              return of(this.tempCodel);
            })
          );
        }
        return of(this.tempCodel);
      })
    );
  }
  
  private getTypLink(link: string): TypLink {
	  return this.linkingData.reduce((previousValue: CustomerLink[], currentValue: CustomerLinkSect) => {
		  if(currentValue.links) {
			  previousValue.push(...currentValue.links);
		  }
		  return previousValue;
	  }, []).find((customerLink: CustomerLink) => 
			customerLink.link === link
	  ).type;	  
  }

  
  private watchValues(): void { 
	this.control.valueChanges
		.pipe(startWith(this.control.value), takeUntil(this.destroyed$))
		.subscribe(() => {

		});
  }

}
