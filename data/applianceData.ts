
interface Appliance {
  name: string;
  wattage: number;
}

export const commonAppliances: Appliance[] = [
  { name: "Light bulb", wattage: 15 },
  { name: "Standing fan", wattage: 75 },
  { name: "Laptop", wattage: 60 },
  { name: "TV", wattage: 80 },
  { name: "Refrigerator", wattage: 150 },
  { name: "Freezer", wattage: 250 },
  { name: "Iron", wattage: 1000 },
  { name: "Desktop computer", wattage: 200 },
  { name: "Phone charger", wattage: 5 },
  { name: "Microwave", wattage: 1000 },
  { name: "Electric kettle", wattage: 1500 },
  { name: "Ceiling fan", wattage: 50 },
  { name: "WiFi router", wattage: 10 },
  { name: "Air conditioner (1HP)", wattage: 750 },
  { name: "Air conditioner (1.5HP)", wattage: 1100 },
  { name: "Water pump", wattage: 750 },
  { name: "Washing machine", wattage: 500 },
  { name: "Hair dryer", wattage: 1200 },
  { name: "Electric cooker", wattage: 1500 },
  { name: "Blender", wattage: 300 },
  { name: "Home theater", wattage: 100 },
  { name: "CCTV system", wattage: 40 },
  { name: "Printer", wattage: 50 },
  { name: "DVD/Media player", wattage: 25 },
];

export const productCapacities = [
  { name: "Lumey Powerbox 550", capacity: 550, imageUrl: "/images/products/550.jpg" },
  { name: "Lumey Powerbox 1200", capacity: 1200, imageUrl: "/images/products/1200.jpg" },
  { name: "Lumey Powerbox 2100", capacity: 2100, imageUrl: "/images/products/2100.jpg" },
  { name: "Lumey Powerbox 3300", capacity: 3300, imageUrl: "/images/products/3300.jpg" },
  { name: "Lumey Powerbox 6500", capacity: 6500, imageUrl: "/images/products/6500.jpg" },
];
