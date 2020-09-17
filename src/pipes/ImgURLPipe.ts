import { NO_PICTURE_IMG } from './../const';
import { Pipe, PipeTransform } from '@angular/core';
import { PICTURE_REPO_URL } from '../const';

@Pipe({ name: 'oorsiImgURL' })
export class ImgURLPipe implements PipeTransform {
    transform(value: string) {
        if (undefined == value || null == value || value.length == 0) {
            return NO_PICTURE_IMG;
        }
        return PICTURE_REPO_URL + '/' + value;
    }
}