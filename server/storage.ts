// Storage interface for the service monitoring dashboard
// No user management required for this monitoring system
// All service data is handled by MSW for this proof of concept

export interface IStorage {
  // Service monitoring dashboard doesn't require user storage
  // All data is handled by MSW for this proof of concept
}

export class MemStorage implements IStorage {
  constructor() {
    // No user storage needed for service monitoring
  }
}

export const storage = new MemStorage();