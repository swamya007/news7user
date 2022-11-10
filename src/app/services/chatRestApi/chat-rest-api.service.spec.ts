import { TestBed } from '@angular/core/testing';

import { ChatRestApiService } from './chat-rest-api.service';

describe('ChatRestApiService', () => {
  let service: ChatRestApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatRestApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
