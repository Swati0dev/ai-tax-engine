import { ChangeSeverity, ComparatorResult } from './diff-types';

/**
 * Service for calculating deterministic semantic versioning bumps based on diff severity.
 */
export class VersionService {
  
  /**
   * Bumps a semver string (e.g., '1.2.3') based on the maximum severity found in the diff.
   */
  public static calculateNextVersion(currentVersion: string, results: ComparatorResult[]): string {
    const parts = currentVersion.split('.').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) {
      return '1.0.0'; // Fallback for invalid formats
    }
    
    let [major, minor, patch] = parts;
    
    let maxSeverity = ChangeSeverity.NONE;
    
    for (const result of results) {
      if (this.severityToLevel(result.severity) > this.severityToLevel(maxSeverity)) {
        maxSeverity = result.severity;
      }
    }
    
    switch (maxSeverity) {
      case ChangeSeverity.CRITICAL:
      case ChangeSeverity.HIGH:
        major += 1;
        minor = 0;
        patch = 0;
        break;
      case ChangeSeverity.MEDIUM:
        minor += 1;
        patch = 0;
        break;
      case ChangeSeverity.LOW:
        patch += 1;
        break;
      case ChangeSeverity.NONE:
        // No bump
        break;
    }
    
    return `${major}.${minor}.${patch}`;
  }

  private static severityToLevel(severity: ChangeSeverity): number {
    switch (severity) {
      case ChangeSeverity.CRITICAL: return 4;
      case ChangeSeverity.HIGH: return 3;
      case ChangeSeverity.MEDIUM: return 2;
      case ChangeSeverity.LOW: return 1;
      case ChangeSeverity.NONE: return 0;
      default: return 0;
    }
  }
}
