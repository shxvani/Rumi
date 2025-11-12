export type Filter = {
  id: string;
  name: string;
  description: string;
  adjustments: {
    brightness: number;
    contrast: number;
    saturation: number;
    hue?: number;
    sepia?: number;
    grayscale?: number;
  };
};

export const FILTERS: Filter[] = [
  {
    id: "none",
    name: "Original",
    description: "No filter",
    adjustments: {
      brightness: 0,
      contrast: 0,
      saturation: 0,
    },
  },
  {
    id: "warm-glow",
    name: "Warm Glow",
    description: "Soft, golden warmth",
    adjustments: {
      brightness: 0.15,
      contrast: -0.1,
      saturation: 0.4,
      hue: 15,
    },
  },
  {
    id: "dreamy",
    name: "Dreamy",
    description: "Ethereal and soft",
    adjustments: {
      brightness: 0.2,
      contrast: -0.25,
      saturation: -0.35,
    },
  },
  {
    id: "natural",
    name: "Natural",
    description: "Clean and balanced",
    adjustments: {
      brightness: 0.05,
      contrast: 0.15,
      saturation: 0.2,
    },
  },
  {
    id: "retro",
    name: "Retro",
    description: "Vintage analog feel",
    adjustments: {
      brightness: -0.05,
      contrast: 0.3,
      saturation: -0.3,
      sepia: 0.3,
    },
  },
  {
    id: "cinematic",
    name: "Cinematic",
    description: "Film-like depth",
    adjustments: {
      brightness: -0.15,
      contrast: 0.4,
      saturation: 0.25,
    },
  },
  {
    id: "monochrome",
    name: "Mono",
    description: "Black & white",
    adjustments: {
      brightness: 0.05,
      contrast: 0.35,
      saturation: -1,
      grayscale: 1,
    },
  },
];

export function applyFilterAdjustments(
  base: Filter["adjustments"],
  intensity: number
): Filter["adjustments"] {
  const normalizedIntensity = intensity / 100;
  return {
    brightness: base.brightness * normalizedIntensity,
    contrast: base.contrast * normalizedIntensity,
    saturation: base.saturation * normalizedIntensity,
    hue: base.hue ? base.hue * normalizedIntensity : undefined,
    sepia: base.sepia ? base.sepia * normalizedIntensity : undefined,
    grayscale: base.grayscale ? base.grayscale * normalizedIntensity : undefined,
  };
}
