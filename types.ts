
export type AppState = 'INITIAL' | 'SUCCESS' | 'FINAL';

export interface Position {
  x: number;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  velocity: number;
}
