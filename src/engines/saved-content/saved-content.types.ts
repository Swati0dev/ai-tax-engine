export interface SavedContentViewModel {
  id: string;
  type: string;
  title: string;
  description: string | null;
  referenceId: string | null;
  tags: string[];
  createdAt: string;
}
