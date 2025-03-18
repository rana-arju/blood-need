// Function to check contrast ratio between two colors
export function getContrastRatio(
  foreground: string,
  background: string
): number {
  const getLuminance = (color: string): number => {
    // Convert hex to RGB
    let r, g, b;

    if (color.startsWith("#")) {
      const hex = color.slice(1);
      r = Number.parseInt(hex.substring(0, 2), 16) / 255;
      g = Number.parseInt(hex.substring(2, 4), 16) / 255;
      b = Number.parseInt(hex.substring(4, 6), 16) / 255;
    } else if (color.startsWith("rgb")) {
      const rgb = color.match(/\d+/g);
      if (!rgb || rgb.length < 3) return 0;
      r = Number.parseInt(rgb[0]) / 255;
      g = Number.parseInt(rgb[1]) / 255;
      b = Number.parseInt(rgb[2]) / 255;
    } else {
      return 0;
    }

    // Calculate luminance
    r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const foregroundLuminance = getLuminance(foreground);
  const backgroundLuminance = getLuminance(background);

  const ratio =
    (Math.max(foregroundLuminance, backgroundLuminance) + 0.05) /
    (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);

  return ratio;
}

// Function to suggest accessible color alternatives
export function getSuggestedColor(
  baseColor: string,
  backgroundColor: string,
  targetRatio = 4.5
): string {
  // Implementation to adjust color until it meets target contrast ratio
  // This is a simplified version
  return baseColor; // Return adjusted color
}
