import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Define product type
export interface Product {
  id: string;
  name: string;
  capacity: string;
  power: string;
  originalPrice: number;
  price: number;
  specs: string;
  description_home: string;
  image: string;
  currentPrice: number;
  withPanelPrice: number;
  completePackagePrice: number;
  soldCount: number;
  rating: number;
  reviewCount: number;
  mainImage: string;
  panelInfo: string;
  images: string[];
  description: string;
  features: string[];
  specifications: {
    capacity: string;
    inverter: string;
    battery: string;
    acOutput: string;
    usbPorts: string;
    chargingOptions: string;
    chargingTime: string;
    weight: string;
    dimensions: string;
    noiseLevel: string;
  };
  useCase: string;
  priceInfo: {
    withoutPanel: number;
    withPanel: number;
    withPanelAndInstallation: number;
  };
  category?: string;
  status?: string;
}

// API functions
const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/api/products');
  const data = await response.json();
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch products');
  }

  return data.products.map((product: any) => ({
    id: product.model_id,
    name: product.name,
    capacity: product.capacity,
    power: product.power,
    originalPrice: product.base_price * 1.1, // 10% markup for original price
    price: product.base_price,
    specs: `${product.power}/${product.capacity}`,
    description_home: product.description,
    image: product.image_url,
    currentPrice: product.base_price,
    withPanelPrice: product.with_panel_price,
    completePackagePrice: product.with_panel_price * 1.2, // 20% markup for complete package
    soldCount: 0, // This would come from a separate sales tracking system
    rating: product.rating,
    reviewCount: product.review_count,
    mainImage: product.main_image,
    panelInfo: "Standard Solar Panel", // This would be configurable in the admin
    images: product.images,
    description: product.description,
    features: product.features,
    specifications: {
      capacity: product.specifications.capacity,
      inverter: product.specifications.inverter,
      battery: product.specifications.battery,
      acOutput: product.specifications.ac_output,
      usbPorts: product.specifications.usb_ports,
      chargingOptions: product.specifications.charging_options,
      chargingTime: product.specifications.charging_time,
      weight: product.specifications.weight,
      dimensions: product.specifications.dimensions,
      noiseLevel: product.specifications.noise_level
    },
    useCase: product.use_case,
    priceInfo: {
      withoutPanel: product.price_info.without_panel,
      withPanel: product.price_info.with_panel,
      withPanelAndInstallation: product.price_info.with_panel_and_installation
    },
    category: product.specifications?.category,
    status: product.specifications?.status
  }));
};

const createProduct = async (product: Product): Promise<{ success: boolean; message?: string; data?: Product }> => {
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to create product',
      };
    }

    return {
      success: true,
      data: data.product,
    };
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
};

const updateProduct = async (product: Product): Promise<{ success: boolean; message?: string; data?: Product }> => {
  try {
    const response = await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to update product',
      };
    }

    return {
      success: true,
      data: data.product,
    };
  } catch (error) {
    console.error('Error updating product:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
};

const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete product');
    }

    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
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
      if (newProduct.success && newProduct.data) {
        const typedProduct: Product = {
          ...newProduct.data,
          id: newProduct.data.id,
          name: newProduct.data.name,
          capacity: newProduct.data.capacity,
          power: newProduct.data.power,
          originalPrice: newProduct.data.originalPrice,
          price: newProduct.data.price,
          specs: newProduct.data.specs,
          description_home: newProduct.data.description_home,
          image: newProduct.data.image,
          currentPrice: newProduct.data.currentPrice,
          withPanelPrice: newProduct.data.withPanelPrice,
          completePackagePrice: newProduct.data.completePackagePrice,
          soldCount: newProduct.data.soldCount,
          rating: newProduct.data.rating,
          reviewCount: newProduct.data.reviewCount,
          mainImage: newProduct.data.mainImage,
          panelInfo: newProduct.data.panelInfo,
          images: newProduct.data.images,
          description: newProduct.data.description,
          features: newProduct.data.features,
          specifications: newProduct.data.specifications,
          useCase: newProduct.data.useCase,
          priceInfo: newProduct.data.priceInfo,
          category: newProduct.data.category,
          status: newProduct.data.status
        };
        setProducts((prev) => [...prev, typedProduct]);
        toast({
          title: "Success",
          description: "Product created successfully!",
        });
        return typedProduct;
      } else {
        throw new Error(newProduct.message || 'Failed to create product');
      }
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
      if (updatedProduct.success && updatedProduct.data) {
        const typedProduct: Product = {
          ...updatedProduct.data,
          id: updatedProduct.data.id,
          name: updatedProduct.data.name,
          capacity: updatedProduct.data.capacity,
          power: updatedProduct.data.power,
          originalPrice: updatedProduct.data.originalPrice,
          price: updatedProduct.data.price,
          specs: updatedProduct.data.specs,
          description_home: updatedProduct.data.description_home,
          image: updatedProduct.data.image,
          currentPrice: updatedProduct.data.currentPrice,
          withPanelPrice: updatedProduct.data.withPanelPrice,
          completePackagePrice: updatedProduct.data.completePackagePrice,
          soldCount: updatedProduct.data.soldCount,
          rating: updatedProduct.data.rating,
          reviewCount: updatedProduct.data.reviewCount,
          mainImage: updatedProduct.data.mainImage,
          panelInfo: updatedProduct.data.panelInfo,
          images: updatedProduct.data.images,
          description: updatedProduct.data.description,
          features: updatedProduct.data.features,
          specifications: updatedProduct.data.specifications,
          useCase: updatedProduct.data.useCase,
          priceInfo: updatedProduct.data.priceInfo,
          category: updatedProduct.data.category,
          status: updatedProduct.data.status
        };
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? typedProduct : p))
        );
        toast({
          title: "Success",
          description: "Product updated successfully!",
        });
        return typedProduct;
      } else {
        throw new Error(updatedProduct.message || 'Failed to update product');
      }
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
      const success = await deleteProduct(id);
      if (success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast({
          title: "Success",
          description: "Product deleted successfully!",
        });
        return true;
      } else {
        throw new Error('Failed to delete product');
      }
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
