import { Menu } from './menu.model';

/* vertical */
export const verticalMenuItemsDpak = [ 
    new Menu (0, 'Accueil', '/', null, 'home', null, false, 0), 
    new Menu (1, 'Curriculum Vitae', '/cv', null, 'card_membership', null, false, 0),
    new Menu (2, 'Photos', '/photos', null, 'photos', null, false, 0),
    new Menu (3, 'Dashboard', '/dashboard', null, 'dashboard', null, false, 0),
    ]

export const verticalMenuItemsGuest = [ 
    new Menu (0, 'Accueil', '/', null, 'home', null, false, 0), 
    new Menu (1, 'Curriculum Vitae', '/cv', null, 'card_membership', null, false, 0),
    new Menu (2, 'Photos', '/photos', null, 'photos', null, false, 0),
    //new Menu (3, 'Dashboard', '/dashboard', null, 'dashboard', null, false, 0),
    new Menu (4, 'Carburant', '/fuel', null, 'drive_eta', null, false, 0),
    new Menu (5, 'Facturette', '/billcard', null, 'credit_card', null, false, 0),

    ]

export const verticalMenuItems = [ 
    new Menu (0, 'Accueil', '/', null, 'home', null, false, 0), 
    new Menu (1, 'Curriculum Vitae', '/cv', null, 'card_membership', null, false, 0),
    new Menu (2, 'Photos DD', '/photos', null, 'photos', null, false, 0), // temp
    new Menu (3, 'Dashboard', '/dashboard', null, 'dashboard', null, false, 0),
    new Menu (4, 'Carburant', '/fuel', null, 'drive_eta', null, false, 0),
    new Menu (5, 'Facturette', '/billcard', null, 'credit_card', null, false, 0)
]

/* horizontal */
export const horizontalMenuItemsDpak = [ 
    new Menu (0, 'Accueil', '/', null, 'home', null, false, 0), 
    new Menu (1, 'Curriculum Vitae', '/cv', null, 'card_membership', null, false, 0),
    new Menu (2, 'Photos', '/photos', null, 'photos', null, false, 0),
    new Menu (3, 'Dashboard', '/dashboard', null, 'dashboard', null, false, 0),
    new Menu (4, 'Facturette', '/billcard', null, 'credit_card', null, false, 0),
    new Menu (5, 'Carburant', '/fuel', null, 'drive_eta', null, false, 0),

    ]

export const horizontalMenuItemsGuest = [ 
    new Menu (0, 'Accueil', '/', null, 'home', null, false, 0), 
    new Menu (1, 'Curriculum Vitae', '/cv', null, 'card_membership', null, false, 0),
    new Menu (2, 'Photos', '/photos', null, 'photos', null, false, 0),
    new Menu (5, 'Carburant', '/fuel', null, 'drive_eta', null, false, 0),

    ]

export const horizontalMenuItems = [ 
    new Menu (0, 'Accueil', '/', null, 'home', null, false, 0), 
    new Menu (1, 'CV', '/cv', null, 'cv', null, false, 0),
]