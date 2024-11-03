export interface DocumentItem {
    pageContent: string;
    metadata: {
      pdf: Record<string, unknown>; // Replace with a more specific type if you know the structure
      loc: Record<string, unknown>; // Replace with a more specific type if you know the structure
    };
  }