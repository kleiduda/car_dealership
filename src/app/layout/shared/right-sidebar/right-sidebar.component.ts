import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { EventService } from 'src/app/core/service/event.service';
import { Chat } from '../models/chat.model';
import { LAYOUT_COLOR_LIGHT, LAYOUT_DETACHED, LAYOUT_VERTICAL, LAYOUT_WIDTH_FLUID, LEFT_SIDEBAR_THEME_LIGHT, LEFT_SIDEBAR_TYPE_DEFAULT, MENU_POSITION_FIXED, TOPBAR_THEME_DARK } from '../config/layout.model';
import { Task } from '../models/tasks.model';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})

export class RightSidebarComponent implements OnInit {

  // layout related config
  @Input() layoutType!: string;
  @Input() layoutColor!: string;
  @Input() layoutWidth!: string;
  @Input() menuPosition!: string;
  @Input() leftSidebarTheme!: string;
  @Input() leftSidebarType!: string;
  @Input() showSidebarUserInfo: boolean = false;
  @Input() topbarTheme!: string;
  hasTwoToneIcon: boolean = false;
  disableLeftBarSize: boolean = false;

  private isShowing: boolean = false;


  active: string = 'setting';
  tasks: Task[] = [];
  chats: Chat[] = [];
  searchTerm: string = '';

  rightSidebarClass = 'right-bar-enabled';

  constructor (
    private renderer: Renderer2,
    private eventService: EventService
  ) {
    // listen to event and open/hide the right sidebar
    // show
    this.eventService.subscribe('showRightSideBar', () => {
      this.show();
    });

    // hide
    this.eventService.subscribe('hideRightSideBar', () => {
      this.hide();
    });

  }


  ngOnInit(): void {
    this._fetchData();
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  ngOnChanges(): void {
    if (this.isShowing) {
      this.renderer.addClass(document.body, this.rightSidebarClass);
    } else {
      this.renderer.removeClass(document.body, this.rightSidebarClass);
    }
  }

  /**
* changes left sidebar type based on screen dimensions
*/
  updateDimensions(): void {
    if (window.innerWidth <= 991) {
      this.disableLeftBarSize = true;
    }
    else if (window.innerWidth > 991) {
      this.disableLeftBarSize = false;
    }
  }

  /**
   * fetches data
   */
  _fetchData(): void {
    
    

  }

  /**
   * Shows the sidebar
   */
  show(): void {
    this.isShowing = true;
    this.renderer.addClass(document.body, this.rightSidebarClass);
  }

  /**
   * Hide the sidebar
   */
  hide(): void {
    if (document.body.classList.contains(this.rightSidebarClass)) {
      this.renderer.removeClass(document.body, this.rightSidebarClass);
      this.isShowing = false;
    }
  }

  /**
 * Change the given layout
 * @param layout layout name
*/
  changeLayout(layout: string): void {
    this.layoutType = layout;
    this.eventService.broadcast('changeLayout', layout);
  }

  /**
 * Change the layout color
 * @param color color
*/
  changeLayoutColor(color: string): void {
    this.layoutColor = color;
    this.eventService.broadcast('changeLayoutColor', color);
  }

  /**
   * Change the width
   * @param layout width type
   */
  changeLayoutWidth(width: string): void {
    this.layoutWidth = width;
    this.eventService.broadcast('changeLayoutWidth', width);
  }

  /**
 * Change left and top menu position
 * @param position position of menu
 */
  changeMenuPosition(position: string): void {
    this.menuPosition = position;
    this.eventService.broadcast('changeMenuPosition', position);
  }

  /**
   * Change the side bar theme
   * @param theme name
   */
  changeLeftSidebarTheme(theme: string): void {
    this.leftSidebarTheme = theme;
    this.eventService.broadcast('changeLeftSidebarTheme', theme);
  }

  /**
   * Change the side bar width
   * @param type type of sidebar
   */
  changeLeftSidebarType(type: string): void {
    this.leftSidebarType = type;
    if (this.layoutType === LAYOUT_VERTICAL || this.layoutType === LAYOUT_DETACHED) {
      this.eventService.broadcast('changeLeftSidebarType', type);
    }
  }

  /**
 * Change topbar theme
 * @param theme name
 */
  changeTopbarTheme(theme: string): void {
    this.topbarTheme = theme;
    this.eventService.broadcast('changeTopbarTheme', theme);
  }

  /**
   * toggles visibility of sidebar user info
   * @param show true/false
   */
  toggleLeftSidebarUserInfo(show: boolean): void {
    this.showSidebarUserInfo = show;
    if (this.layoutType === LAYOUT_VERTICAL || this.layoutType === LAYOUT_DETACHED) {
      this.eventService.broadcast('toggleLeftSidebarUserInfo', show);
    }
  }

  /**
 * toggles visibility of sidebar user info
 * @param show true/false
 */
  toggleTwoToneIcons(show: boolean): void {
    this.hasTwoToneIcon = show;
    this.eventService.broadcast('toggleTwoToneIcons', this.hasTwoToneIcon);
  }

  /**
   * Reset everything
   */
  reset(): void {
    this.changeLayout(LAYOUT_VERTICAL);
    this.changeLayoutColor(LAYOUT_COLOR_LIGHT);
    this.changeLayoutWidth(LAYOUT_WIDTH_FLUID);
    this.changeMenuPosition(MENU_POSITION_FIXED);
    this.changeLeftSidebarType(LEFT_SIDEBAR_TYPE_DEFAULT);
    this.changeLeftSidebarTheme(LEFT_SIDEBAR_THEME_LIGHT);
    this.toggleLeftSidebarUserInfo(false);
    this.changeTopbarTheme(TOPBAR_THEME_DARK);
  }

}
