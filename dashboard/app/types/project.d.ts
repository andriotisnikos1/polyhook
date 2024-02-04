export namespace polyhook {
  interface Project {
      name: string,
      projectID: string,
      userID: string,
      polyhooks: number
  }

  interface User {
      userID: string,
      emailHash: string
  }

  interface Polyhook {
    polyhookID: string;
    projectID: string;
    name: string;
    urls: string[]
    analytics: {
      runs: number
      successful: number
    }
  }
}