import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
@Injectable()
export class FileService {
  createImage(files: string[] | string): string[] {
    let images = [];
    if (Array.isArray(files)) images = [...files];
    else images = [files];
    const base: IFile[] = images.map((item: string) => ({
      type: item.split(';')[0].split('/')[1],
      data: item.split('base64,')[1],
    }));
    const pictures = [];
    for (let key in base) {
      let name = uuidv4() + '.' + base[key].type;
      fs.writeFileSync(
        path.resolve(__dirname, '..', '..', 'uploads', name),
        base[key].data,
        'base64url',
      );
      pictures.push(name);
    }
    return pictures.map((item) => '/api/image/' + item);
  }

  async destroy(files: string[] | string): Promise<void> {
    let image = Array.isArray(files) ? files : [files];
    for (let key in image) {
      await fs.truncateSync(image[key]);
    }
  }
}

interface IFile {
  type: string;
  data: string;
}
