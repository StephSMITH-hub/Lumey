
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Define product type
export interface Product {
  id: string;
  name: string;
  specs: string;
  description: string;
  image: string;
  originalPrice: number;
  currentPrice: number;
  withPanelPrice: number;
  completePackagePrice: number;
  soldCount: number;
  panelInfo: string;
  category?: string;
  status?: string;
}

// Fake API functions (to be replaced with real API calls)
const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    // Simulating API delay
    setTimeout(() => {
      resolve([
        {
          id: "powerbox-550",
          name: "Lumey Powerbox 550",
          specs: "400W | 550Wh",
          description: "Ideal for small home and office use.",
          image: "/images/products/550.jpg",
          originalPrice: 250000,
          currentPrice: 220000,
          withPanelPrice: 270000,
          completePackagePrice: 335000,
          soldCount: 150,
          panelInfo: "1 x 300W panel (36V Mono)",
          category: "Portable Power",
          status: "In Stock"
        },
        {
          id: "powerbox-1200",
          name: "Lumey Powerbox 1200",
          specs: "800W | 1200Wh",
          description: "Perfect for extended power backup.",
          image: "/images/products/1200.jpg",
          originalPrice: 350000,
          currentPrice: 320000,
          withPanelPrice: 420000,
          completePackagePrice: 525000,
          soldCount: 213,
          panelInfo: "2 x 300W panels (36V Mono)",
          category: "Portable Power",
          status: "In Stock"
        },
        {
          id: "powerbox-2100",
          name: "Lumey Powerbox 2100",
          specs: "1500W | 2100Wh",
          description: "Reliable for home appliances and business tools.",
          image: "/images/products/2100.jpg",
          originalPrice: 535000,
          currentPrice: 500000,
          withPanelPrice: 650000,
          completePackagePrice: 775000,
          soldCount: 189,
          panelInfo: "3 x 300W panels (36V Mono)",
          category: "Home Power",
          status: "In Stock"
        },
        {
          id: "powerbox-3300",
          name: "Lumey Powerbox 3300",
          specs: "1500W | 3300Wh",
          description: "Advanced energy for business and industrial use.",
          image: "/images/products/3300.jpg",
          originalPrice: 860000,
          currentPrice: 820000,
          withPanelPrice: 1120000,
          completePackagePrice: 1265000,
          soldCount: 142,
          panelInfo: "4 x 300W panels (36V Mono)",
          category: "Home Power",
          status: "Low Stock"
        },
        {
          id: "powerbox-6500",
          name: "Lumey Powerbox 6500",
          specs: "3500W | 6500Wh",
          description: "Heavy-duty power for larger energy needs.",
          image: "/images/products/6500.jpg",
          originalPrice: 1550000,
          currentPrice: 1500000,
          withPanelPrice: 2100000,
          completePackagePrice: 2290000,
          soldCount: 97,
          panelInfo: "6 x 300W panels (36V Mono)",
          category: "Commercial Power",
          status: "In Stock"
        },
      ]);
    }, 800);
  });
};

const createProduct = (product: Product): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...product, id: product.id || `powerbox-${Date.now()}` });
    }, 800);
  });
};

const updateProduct = (product: Product): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(product);
    }, 800);
  });
};

const deleteProduct = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 800);
  });
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch all products
  const fetchAllProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again later.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch products. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new product
  const addProduct = async (product: Product) => {
    setIsLoading(true);
    setError(null);
    try {
      const newProduct = await createProduct(product);
      setProducts((prev) => [...prev, newProduct]);
      toast({
        title: "Success",
        description: "Product created successfully!",
      });
      return newProduct;
    } catch (err) {
      console.error("Error creating product:", err);
      setError("Failed to create product. Please try again later.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create product. Please try again later.",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing product
  const updateExistingProduct = async (product: Product) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedProduct = await updateProduct(product);
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? updatedProduct : p))
      );
      toast({
        title: "Success",
        description: "Product updated successfully!",
      });
      return updatedProduct;
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product. Please try again later.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update product. Please try again later.",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a product
  const removeProduct = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast({
        title: "Success",
        description: "Product deleted successfully!",
      });
      return true;
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product. Please try again later.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete product. Please try again later.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a single product by ID
  const getProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id);
  };

  // Load products on component mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return {
    products,
    isLoading,
    error,
    fetchAllProducts,
    addProduct,
    updateExistingProduct,
    removeProduct,
    getProductById,
  };
};
