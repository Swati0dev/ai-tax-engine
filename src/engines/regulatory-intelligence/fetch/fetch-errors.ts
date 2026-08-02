export enum FetchFailureType {
  TIMEOUT = "TIMEOUT",
  DNS_FAILURE = "DNS_FAILURE",
  SSL_FAILURE = "SSL_FAILURE",
  HTTP_403 = "HTTP_403",
  HTTP_404 = "HTTP_404",
  HTTP_429 = "HTTP_429",
  HTTP_500 = "HTTP_500",
  WAF_CHALLENGE = "WAF_CHALLENGE",
  EMPTY_RESPONSE = "EMPTY_RESPONSE",
  INVALID_MIME = "INVALID_MIME",
  INVALID_CONTENT = "INVALID_CONTENT",
  UNKNOWN = "UNKNOWN"
}

export class FetchError extends Error {
  constructor(public type: FetchFailureType, message: string) {
    super(message);
    this.name = "FetchError";
  }
}
