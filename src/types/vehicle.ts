export interface VehicleData {
  assetId: string;
  assetName: string;
  imageUrl: string;    // For displaying in the UI
  imagePath: string;   // For sending to backend (file path)
  sessionId?: string;  // For the two-step process
  confidence?: number;
  detectedClassId?: number;
  autoFilled?: boolean;
  message?: string;
}