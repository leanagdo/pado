import {Injectable} from '@angular/core'

@Injectable()
export class MessagesService {

    // color : danger, primary, info, warning, success
    private meetings = [
        {
            day: '07',
            month: 'Jan 19',
            title: 'Carburant',
            text: 'Ajout page carburant',
            color: 'info'
        },
        {
            day: '10',
            month: 'Dec 18',
            title: 'CV',
            text: 'Test responsive design.',
            color: 'info'
        },
        {
            day: '20',
            month: 'Oct 18',
            title: 'CV',
            text: 'Mise à jour de la page du curriculum vitae.',
            color: 'info'
        },
        {
            day: '14',
            month: 'Oct 18',
            title: 'Login',
            text: 'Menu contextuelle en fonction du profil de connexion.',
            color: 'primary'
        },
        {
            day: '13',
            month: 'Oct 18',
            title: 'Accueil',
            text: 'Mise à jour de la page d\'accueil.',
            color: 'primary'
        },
        {
            day: '01',
            month: 'Oct 18',
            title: 'Initialisation',
            text: 'Initialisation de l\'applciation.',
            color: 'danger'
        } 
    ];

    public getMeetings():Array<Object> {
        return this.meetings;
    }   

}