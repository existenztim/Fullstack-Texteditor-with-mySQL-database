export interface Document {
  documentName: string;
  createDate: string;
  updatedDate: string | null;
  documentContent: string;
  id: string;
}

export interface NewDocument {
  name: string | null;
  content: string;
  userId: string;
}

export interface DeleteDocument {
  id: string;
  userId: string;
}

export interface UpdateDocument {
  id: string;
  documentContent: string;
  updatedDate: string;
}
