export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  content: string;
}

export const blogdata: BlogPost[] = [
  {
    id: "solar-power-benefits",
    title: "The Benefits of Solar Power for Your Home",
    excerpt: "Discover how solar power can reduce your energy bills and help the environment.",
    author: "John Doe",
    date: "2024-03-15",
    readTime: "5 min read",
    image: "/images/blog/solar-benefits.jpg",
    category: "Solar Energy",
    content: `# The Benefits of Solar Power for Your Home

Solar power has become increasingly popular as a sustainable energy solution for homes. Here are some key benefits:

## 1. Reduced Energy Bills
By installing solar panels, you can significantly reduce your monthly electricity bills. The sun's energy is free, and once you've covered the initial installation costs, you'll be generating your own electricity.

## 2. Environmental Impact
Solar power is a clean, renewable energy source that produces no harmful emissions. By switching to solar, you're helping to reduce your carbon footprint and combat climate change.

## 3. Energy Independence
With solar power, you become less dependent on the grid and more self-sufficient. This is especially valuable during power outages or in areas with unreliable electricity supply.

## 4. Increased Property Value
Homes with solar panel installations often have higher property values and sell faster than those without. It's an investment that pays off both in the short and long term.

## 5. Government Incentives
Many governments offer incentives, tax credits, and rebates for installing solar panels, making it more affordable than ever to make the switch.

## Conclusion
Solar power is not just an environmentally conscious choice; it's a smart financial decision that can benefit your home and family for years to come.`
  },
  {
    id: "battery-storage-guide",
    title: "A Complete Guide to Battery Storage Systems",
    excerpt: "Learn everything you need to know about battery storage systems for your solar setup.",
    author: "Jane Smith",
    date: "2024-03-10",
    readTime: "7 min read",
    image: "/images/blog/battery-guide.jpg",
    category: "Battery Storage",
    content: `# A Complete Guide to Battery Storage Systems

Battery storage systems are becoming an essential component of modern solar installations. Here's what you need to know:

## 1. Types of Battery Systems
There are several types of battery storage systems available:
- Lithium-ion batteries
- Lead-acid batteries
- Flow batteries
- Saltwater batteries

## 2. Key Features to Consider
When choosing a battery storage system, consider:
- Capacity
- Power rating
- Depth of discharge
- Cycle life
- Warranty period

## 3. Installation Requirements
Proper installation is crucial for safety and performance:
- Location requirements
- Ventilation needs
- Temperature considerations
- Electrical connections

## 4. Maintenance Tips
Regular maintenance ensures optimal performance:
- Regular inspections
- Cleaning requirements
- Performance monitoring
- Software updates

## 5. Cost Considerations
Understanding the costs involved:
- Initial investment
- Installation costs
- Maintenance expenses
- Potential savings

## Conclusion
A well-chosen and properly maintained battery storage system can significantly enhance your solar power setup's efficiency and reliability.`
  }
];
