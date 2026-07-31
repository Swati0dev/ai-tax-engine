import { IChecksumService } from './interfaces';
import * as crypto from 'crypto';

export class ChecksumService implements IChecksumService {
  public generate(buffer: Buffer): string {
    if (!buffer) return '';
    return crypto.createHash('sha256').update(buffer).digest('hex');
  }
}
