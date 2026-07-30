import { SavedContent } from "@prisma/client";
import { SavedContentViewModel } from "./saved-content.types";

export function toSavedContentViewModel(content: SavedContent): SavedContentViewModel {
  return {
    id: content.id,
    type: content.type,
    title: content.title,
    description: content.description,
    referenceId: content.referenceId,
    tags: content.tags,
    createdAt: content.createdAt.toISOString(),
  };
}

export function toSavedContentViewModels(contents: SavedContent[]): SavedContentViewModel[] {
  return contents.map(toSavedContentViewModel);
}
