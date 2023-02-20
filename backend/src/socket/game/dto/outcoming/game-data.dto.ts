export type GameDataDto = {
  host?: {
    y: number;
  };
  challenger?: {
    y: number;
  };
  ball?: {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
  };
};
