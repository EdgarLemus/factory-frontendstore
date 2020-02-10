import { SidenavMenu } from './sidenav-menu.model';

export const sidenavMenuItems = [ 
    new SidenavMenu (1, 'Inicio', '/', null, null, false, 0),
    new SidenavMenu (2, 'Celulares', '/products/celulares', null, null, false, 0), 
    new SidenavMenu (3, 'Audio', '/products/audio', null, null, false, 0), 
    new SidenavMenu (4, 'Accesorios', '/products/accesorios', null, null, false, 0)
]