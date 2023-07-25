import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/core/service/auth.service';
import { EventService } from 'src/app/core/service/event.service';
import { LEFT_SIDEBAR_TYPE_CONDENSED, LEFT_SIDEBAR_TYPE_DEFAULT } from '../config/layout.model';
import { BrandItem } from '../models/brands.model';
import { CreateNewMenuOption } from '../models/create-new.model';
import { Language } from '../models/language.model';
import { MegaMenuItem } from '../models/mega-menu.model';
import { NotificationItem } from '../models/notification.model';
import { ProfileOptionItem } from '../models/profileoption.model';
import { SearchResultItem, SearchUserItem } from '../models/search.model';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Input() layoutType: string = '';
  @Input() leftSidebarTheme: string = 'light';
  createMenuOptions: CreateNewMenuOption[] = [];
  megaMenuItems: MegaMenuItem[] = [];
  notificationList: NotificationItem[] = [];
  languages: Language[] = [];
  brands: BrandItem[] = [];
  profileOptions: ProfileOptionItem[] = [];
  selectedLanguage?: Language;
  searchResults: SearchResultItem[] = [];
  searchUsers: SearchUserItem[] = [];

  loggedInUser: any = {};
  topnavCollapsed: boolean = false;

  // output events
  @Output() mobileMenuButtonClicked = new EventEmitter();
  @Output() settingsButtonClicked = new EventEmitter<boolean>();


  constructor (
    private authService: AuthenticationService,
    private eventService: EventService
  ) {

  }

  ngOnInit(): void {
    this._fetchMenus();
    this._fetchProfileOptions();

    this.loggedInUser = this.authService.currentUser();

    document.addEventListener('fullscreenchange', this.exitHandler);
    document.addEventListener("webkitfullscreenchange", this.exitHandler);
    document.addEventListener("mozfullscreenchange", this.exitHandler);
  }

  /**
   * fetches menu options
   */
  _fetchMenus(): void {
    this.createMenuOptions = [{
      id: 1,
      label: 'Veículos',
      icon: 'fe-briefcase',
    }];
  }

  /**
   * Fetches profile options
   */
  _fetchProfileOptions(): void {
    this.profileOptions = [
      {
        label: 'Minha Conta',
        icon: 'fe-user',
        redirectTo: '/apps/contacts/profile',
      },
      {
        label: 'Configurações',
        icon: 'fe-settings',
        redirectTo: '[]',
      },
      {
        label: 'Bloquear',
        icon: 'fe-lock',
        redirectTo: '/auth/lock-screen',
      },
      {
        label: 'Sair',
        icon: 'fe-log-out',
        redirectTo:'auth/login',
      }
    ];

  }


  /**
   * changes left sidebar width 
   */
  changeSidebarWidth(): void {
    if (document.body.hasAttribute('data-leftbar-size') && document.body.getAttribute('data-leftbar-size') === "condensed") {
      this.eventService.broadcast('changeLeftSidebarType', LEFT_SIDEBAR_TYPE_DEFAULT);
    }
    else {
      this.eventService.broadcast('changeLeftSidebarType', LEFT_SIDEBAR_TYPE_CONDENSED);
    }


  }

  /**
   * exit handler for full screen mode
   */
  exitHandler(): void {
    let document: any = window.document;

    if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      document.body.classList.remove('fullscreen-enable');
    }
  }

  /**
   * toggles full screen mode
   */
  toggleFullScreen(): void {
    let document: any = window.document;

    document.body.classList.toggle('fullscreen-enable');

    let elem = document.querySelector('.maximize-icon');

    if (elem.hasAttribute('data-toggle') && document.body.getAttribute('data-toggle') === "fullscreen") {
      document.body.removeAttribute('data-toggle');
    }
    else {
      elem.setAttribute('data-toggle', 'fullscreen')
    }

    if (!document.fullscreenElement && /* alternative standard method */ !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }



  /**
  * Toggles the right sidebar
  */
  toggleRightSidebar() {
    this.settingsButtonClicked.emit();
  }

  /**
 * Toggle the menu bar when having mobile screen
 */
  toggleMobileMenu(event: any) {
    this.topnavCollapsed = !this.topnavCollapsed;
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }


}
