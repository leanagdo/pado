import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationPipe} from './pagination/pagination.pipe';
import { ProfilePicturePipe } from './profilePicture/profilePicture.pipe';
import { ChatPersonSearchPipe } from './search/chat-person-search.pipe';
import { UserSearchPipe } from './search/user-search.pipe';
import { PhotosSearchPipe } from './search/photos-search.pipe';
import { TruncatePipe } from './truncate/truncate.pipe';
import { MailSearchPipe } from './search/mail-search.pipe';
import { FrenchDecimalPipe } from './numbers/french-decimal-pipe';

@NgModule({
    imports: [ 
        CommonModule 
    ],
    declarations: [
        PaginationPipe,
        ProfilePicturePipe,
        ChatPersonSearchPipe,
        UserSearchPipe,
        PhotosSearchPipe,
        TruncatePipe,
        MailSearchPipe,
        FrenchDecimalPipe
    ],
    exports: [
        PaginationPipe,
        ProfilePicturePipe,
        ChatPersonSearchPipe,
        UserSearchPipe,
        PhotosSearchPipe,
        TruncatePipe,
        MailSearchPipe,
        FrenchDecimalPipe
    ]
})
export class PipesModule { }
