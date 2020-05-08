import { Pipe } from '@angular/core';
import {TimeAgoPipe} from 'time-ago-pipe';

// Make timeago pipe work in Angular 9
@Pipe({
  name: 'timeAgo',
  pure: false
})
export class TimeAgoExtendsPipe extends TimeAgoPipe {}
