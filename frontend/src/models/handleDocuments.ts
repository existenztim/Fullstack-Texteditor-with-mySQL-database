export interface Document {
  documentName: string;
  createDate: string; //Date format is handled on the backend
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
}
