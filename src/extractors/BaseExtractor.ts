import { HttpClient } from '../transport/http';
import { IVideoPayload } from '@/types';

export abstract class BaseExtractor {
  abstract readonly id: string;
  constructor(protected http: HttpClient) {}
  abstract extract(embedUrl: string): Promise<IVideoPayload[]>;
}
