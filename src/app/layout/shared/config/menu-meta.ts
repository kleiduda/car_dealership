import { MenuItem } from '../models/menu.model';

// menu items for vertcal and detached layout
const MENU_ITEMS: MenuItem[] = [
    { key: 'navigation', label: 'Navigation', isTitle: true },
    {
        key: 'home',
        label: 'Home',
        isTitle: false,
        icon: 'airplay',
        collapsed: true,
        badge: { variant: 'success', text: '4' }
    }
];

// menu items for two column menu layout 
const TWO_COl_MENU_ITEMS: MenuItem[] = [
    {
        key: 'dashboard',
        icon: 'home',
        label: 'Home',
        isTitle: true,
        
    }
];

// menu items for horizontal layout
const HORIZONTAL_MENU_ITEMS: MenuItem[] = [
    {
        key: 'home',
        icon: 'home',
        label: 'Home',
        isTitle: true,
        collapsed: true
       
    }
];

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };