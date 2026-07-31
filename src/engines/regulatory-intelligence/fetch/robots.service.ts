import { IRobotsPolicy } from './interfaces';

export class RobotsService implements IRobotsPolicy {
  public async isAllowed(url: string, _userAgent: string): Promise<boolean> {
    console.log(`[RobotsService] Checking robots.txt for ${url}`);
    // Future: Fetch domain/robots.txt, parse rules
    return true; // Default allowed in Phase 2A
  }

  public async getCrawlDelay(_domain: string, _userAgent: string): Promise<number> {
    // Default 1 second delay
    return 1000;
  }
}
