export interface Emotion {
  _id: string;
  title: string;
  description?: string;
  isActive: boolean;
}

export interface DiaryEntry {
  _id: string;
  title: string;
  date: string;
  emotions: string[];
  description: string; 
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiaryListProps {
  entries: DiaryEntry[];
  onSelect: (entry: DiaryEntry) => void; 
  onRefresh: () => void;
  allEmotions: Emotion[];
}

export interface DiaryEntryDetailsProps {
  entry: DiaryEntry | null;
  onDeleteSuccess: () => void;
  onEditTrigger: (entry: DiaryEntry) => void;
}