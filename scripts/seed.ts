import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/model/product';
import Blog from '@/model/blog';
import Home from '@/model/home';
import Gallery from '@/model/gallery';
import { blogdata } from '@/data/blogData';

const products = [
  {
    model_id: "powerbox-550",
    name: "Lumey Powerbox 550",
    capacity: "400W/550Wh",
    base_price: 220000,
    with_panel_price: 270000,
    category: "Portable Power",
    image_url: "/images/products/550.jpg",
    description: "Ideal for students and light home users. Powers phones, laptops, bulbs, TV, fans, MP3 players.",
    status: "In Stock",
    power: "400W",
    specifications: {
      category: "Portable Power",
      status: "In Stock"
    }
  },
  {
    model_id: "powerbox-1200",
    name: "Lumey Powerbox 1200",
    capacity: "800W/1200Wh",
    base_price: 320000,
    with_panel_price: 420000,
    category: "Portable Power",
    image_url: "/images/products/1200.jpg",
    description: "Perfect for remote workers and small families. Powers laptops, TVs, printers, fans.",
    status: "In Stock",
    power: "800W",
    specifications: {
      category: "Portable Power",
      status: "In Stock"
    }
  },
  {
    model_id: "powerbox-2100",
    name: "Lumey Powerbox 2100",
    capacity: "1500W/2100Wh",
    base_price: 500000,
    with_panel_price: 650000,
    category: "Home Power",
    image_url: "/images/products/2100.jpg",
    description: "Designed for homes & small businesses. Powers fridges, TVs, printers, PoS, fans, and more.",
    status: "In Stock",
    power: "1500W",
    specifications: {
      category: "Home Power",
      status: "In Stock"
    }
  },
  {
    model_id: "powerbox-3300",
    name: "Lumey Powerbox 3300",
    capacity: "1500W/3300Wh",
    base_price: 820000,
    with_panel_price: 1120000,
    category: "Home Power",
    image_url: "/images/products/3300.jpg",
    description: "Ideal for offices and large homes. Powers AC, fridges, CCTV, routers, TVs, computers, and more.",
    status: "Low Stock",
    power: "1500W",
    specifications: {
      category: "Home Power",
      status: "Low Stock"
    }
  },
  {
    model_id: "powerbox-6500",
    name: "Lumey Powerbox 6500",
    capacity: "3500W/6500Wh",
    base_price: 1500000,
    with_panel_price: 2100000,
    category: "Commercial Power",
    image_url: "/images/products/6500.jpg",
    description: "Perfect for full homes, worksites, and industry. Powers ACs, freezers, pumps, routers, large appliances.",
    status: "In Stock",
    power: "3500W",
    specifications: {
      category: "Commercial Power",
      status: "In Stock"
    }
  }
];

const homeContent = {
  hero: {
    title: "Powering Your Future",
    subtitle: "Sustainable Energy Solutions",
    description: "Lumey Energy provides innovative solar power solutions for homes and businesses across Nigeria.",
    image: "/images/hero.jpg"
  },
  features: [
    {
      title: "24/7 Power Supply",
      description: "Enjoy uninterrupted power with our reliable solar solutions",
      icon: "zap"
    },
    {
      title: "Cost Effective",
      description: "Save up to 90% on your electricity bills",
      icon: "dollar-sign"
    },
    {
      title: "Eco Friendly",
      description: "Reduce your carbon footprint with clean energy",
      icon: "leaf"
    }
  ],
  about: {
    title: "About Lumey Energy",
    description: "We are committed to providing sustainable energy solutions that power homes and businesses across Nigeria. Our innovative solar power systems are designed to be reliable, efficient, and environmentally friendly.",
    image: "/images/about.jpg"
  },
  testimonials: [
    {
      name: "John Doe",
      role: "Homeowner",
      content: "Lumey Energy's solar solution has transformed my home. No more power outages!",
      image: "/images/testimonials/john.jpg"
    },
    {
      name: "Jane Smith",
      role: "Business Owner",
      content: "The best investment I've made for my business. Reliable power supply and great customer service.",
      image: "/images/testimonials/jane.jpg"
    }
  ],
  cta: {
    title: "Ready to Go Solar?",
    description: "Join thousands of satisfied customers who have made the switch to solar power.",
    buttonText: "Get Started",
    buttonLink: "/contact"
  }
};

const galleryItems = [
  {
    title: "Solar Installation",
    description: "Professional installation of solar panels",
    image: "/images/gallery/installation.jpg",
    category: "Installation",
    tags: ["solar", "installation", "professional"],
    featured: true,
    order: 1
  },
  {
    title: "Home System",
    description: "Complete home solar power system",
    image: "/images/gallery/home-system.jpg",
    category: "Systems",
    tags: ["home", "system", "complete"],
    featured: true,
    order: 2
  },
  {
    title: "Commercial Setup",
    description: "Large-scale commercial solar installation",
    image: "/images/gallery/commercial.jpg",
    category: "Commercial",
    tags: ["commercial", "large-scale", "business"],
    featured: false,
    order: 3
  }
];

async function seedDatabase() {
  try {
    // Connect to database
    await connectToDatabase();
    console.log('Connected to database');

    // Clear existing data
    await Product.deleteMany({});
    await Blog.deleteMany({});
    await Home.deleteMany({});
    await Gallery.deleteMany({});
    console.log('Cleared existing data');

    // Insert products
    const insertedProducts = await Product.insertMany(products);
    console.log(`Inserted ${insertedProducts.length} products`);

    // Transform blog data to match schema
    const blogPosts = blogdata.map(blog => ({
      title: blog.title,
      excerpt: blog.excerpt,
      author: blog.author,
      date: new Date(blog.date),
      readTime: blog.readTime,
      image: blog.image,
      category: blog.category,
      content: blog.content,
      slug: blog.id
    }));

    // Insert blogs
    const insertedBlogs = await Blog.insertMany(blogPosts);
    console.log(`Inserted ${insertedBlogs.length} blog posts`);

    // Insert home content
    const insertedHome = await Home.create(homeContent);
    console.log('Inserted home content');

    // Insert gallery items
    const insertedGallery = await Gallery.insertMany(galleryItems);
    console.log(`Inserted ${insertedGallery.length} gallery items`);

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase(); 