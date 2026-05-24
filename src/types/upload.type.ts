export interface ImageUploadResponse {
  success: boolean;
  message?: string;
  file?: {
    public_id: string;
    url: string;
  };
}
