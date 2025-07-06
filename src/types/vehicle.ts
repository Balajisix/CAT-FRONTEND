export interface VehicleData {
  assetId: string;
  assetName: string;
  imageUrl: string;    
  imagePath: string;  
  sessionId?: string; 
  confidence?: number;
  detectedClassId?: number;
  autoFilled?: boolean;
  message?: string;
}