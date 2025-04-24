"use cleint";
import { useEffect, useState } from "react";
import {
  Save,
  Image,
  ArrowLeft,
  Trash2,
  BatteryFull,
  Box,
  Tag,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";

interface ProductFormData {
  id: string;
  name: string;
  capacity: string;
  priceNoPanel: string;
  priceWithPanel: string;
  category: string;
  image: string;
  description: string;
  status: string;
}

const AdminProductEditor = () => {
  const { productId } = useParams();
  const navigate = useRouter();
  const { toast } = useToast();

  // Sample product data for editing
  const products = [
    {
      id: "powerbox-550",
      name: "Lumey Powerbox 550",
      capacity: "400W/550Wh",
      priceNoPanel: "₦220,000",
      priceWithPanel: "₦270,000",
      category: "Portable Power",
      image: "/images/products/550.jpg",
      description:
        "Ideal for students and light home users. Powers phones, laptops, bulbs, TV, fans, MP3 players.",
      status: "In Stock",
    },
    {
      id: "powerbox-1200",
      name: "Lumey Powerbox 1200",
      capacity: "800W/1200Wh",
      priceNoPanel: "₦320,000",
      priceWithPanel: "₦420,000",
      category: "Portable Power",
      image: "/images/products/1200.jpg",
      description:
        "Perfect for remote workers and small families. Powers laptops, TVs, printers, fans.",
      status: "In Stock",
    },
    {
      id: "powerbox-2100",
      name: "Lumey Powerbox 2100",
      capacity: "1500W/2100Wh",
      priceNoPanel: "₦500,000",
      priceWithPanel: "₦650,000",
      category: "Home Power",
      image: "/images/products/2100.jpg",
      description:
        "Designed for homes & small businesses. Powers fridges, TVs, printers, PoS, fans, and more.",
      status: "In Stock",
    },
    {
      id: "powerbox-3300",
      name: "Lumey Powerbox 3300",
      capacity: "1500W/3300Wh",
      priceNoPanel: "₦820,000",
      priceWithPanel: "₦1,120,000",
      category: "Home Power",
      image: "/images/products/3300.jpg",
      description:
        "Ideal for offices and large homes. Powers AC, fridges, CCTV, routers, TVs, computers, and more.",
      status: "Low Stock",
    },
    {
      id: "powerbox-6500",
      name: "Lumey Powerbox 6500",
      capacity: "3500W/6500Wh",
      priceNoPanel: "₦1,500,000",
      priceWithPanel: "₦2,100,000",
      category: "Commercial Power",
      image: "/images/products/6500.jpg",
      description:
        "Perfect for full homes, worksites, and industry. Powers ACs, freezers, pumps, routers, large appliances.",
      status: "In Stock",
    },
  ];

  // Set default form state
  const defaultFormData: ProductFormData = {
    id: "",
    name: "",
    capacity: "",
    priceNoPanel: "",
    priceWithPanel: "",
    category: "Portable Power",
    image: "/images/products/550.jpg",
    description: "",
    status: "In Stock",
  };

  const [formData, setFormData] = useState<ProductFormData>(defaultFormData);

  // Load product data if editing an existing product
  useEffect(() => {
    if (productId) {
      document.title = "Edit Product | Lumey Admin";

      const productToEdit = products.find(
        (product) => product.id === productId
      );

      if (productToEdit) {
        setFormData(productToEdit);
      } else {
        toast({
          variant: "destructive",
          title: "Product not found",
          description: "The product you're trying to edit doesn't exist.",
        });
        navigate.push("/admin/products");
      }
    } else {
      document.title = "New Product | Lumey Admin";
    }
  }, [productId, navigate, toast]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.name ||
      !formData.capacity ||
      !formData.priceNoPanel ||
      !formData.description
    ) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields.",
      });
      return;
    }

    // In a real app, this would save to a database
    // For now, just show success message

    if (productId) {
      toast({
        title: "Product updated",
        description: "Your product has been successfully updated.",
      });
    } else {
      toast({
        title: "Product created",
        description: "Your new product has been successfully created.",
      });
    }

    // Navigate back to product list
    navigate.push("/admin/products");
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate ID from name
  const generateId = () => {
    if (formData.name) {
      // Extract Powerbox model number from the name if it follows the pattern "Lumey Powerbox XXXX"
      const match = formData.name.match(/Lumey\s+Powerbox\s+(\d+)/i);
      let id = "";

      if (match && match[1]) {
        id = `powerbox-${match[1]}`;
      } else {
        // Otherwise create from name
        id = formData.name
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-");
      }

      setFormData((prev) => ({ ...prev, id }));
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => navigate.push("/admin/products")}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold">
            {productId ? "Edit Product" : "Create New Product"}
          </h1>
        </div>
        <Button
          onClick={handleSubmit}
          className="bg-lumey-orange hover:bg-lumey-yellow"
        >
          <Save className="h-4 w-4 mr-2" />
          {productId ? "Update Product" : "Save Product"}
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
          <div className="bg-white p-6 rounded-md shadow">
            <h2 className="text-lg font-medium mb-4">Basic Information</h2>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g. Lumey Powerbox 550"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={generateId}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="id">Product ID/Slug</Label>
                  <Input
                    id="id"
                    name="id"
                    placeholder="e.g. powerbox-550"
                    value={formData.id}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    This will be used in the URL. Use lowercase letters,
                    numbers, and hyphens only.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the product..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    name="capacity"
                    placeholder="e.g. 400W/550Wh"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Format as Power/Battery Size, e.g. 400W/550Wh
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Portable Power">Portable Power</option>
                    <option value="Home Power">Home Power</option>
                    <option value="Commercial Power">Commercial Power</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceNoPanel">Price (No Panel)</Label>
                  <Input
                    id="priceNoPanel"
                    name="priceNoPanel"
                    placeholder="e.g. ₦220,000"
                    value={formData.priceNoPanel}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priceWithPanel">Price (With Panel)</Label>
                  <Input
                    id="priceWithPanel"
                    name="priceWithPanel"
                    placeholder="e.g. ₦270,000"
                    value={formData.priceWithPanel}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Stock Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Pre-order">Pre-order</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow">
            <h2 className="text-lg font-medium mb-4">Product Image</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    name="image"
                    placeholder="/images/products/your-image.jpg"
                    value={formData.image}
                    onChange={handleChange}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    type="button"
                    className="flex-shrink-0"
                  >
                    <Image className="h-4 w-4 mr-2" />
                    Browse
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Enter the path to the image file. Image must be already
                  uploaded to the server.
                </p>
              </div>

              <div className="border rounded-md p-4">
                <div className="text-sm font-medium mb-2">Current Image</div>
                <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt={formData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Image className="h-12 w-12" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {productId && (
            <div className="bg-red-50 p-6 rounded-md border border-red-100">
              <h2 className="text-lg font-medium mb-4 text-red-700">
                Danger Zone
              </h2>
              <p className="text-sm text-red-600 mb-4">
                Once you delete a product, there is no going back. Please be
                certain.
              </p>
              <Button
                variant="destructive"
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this product? This action cannot be undone."
                    )
                  ) {
                    toast({
                      title: "Product deleted",
                      description: "The product has been successfully deleted.",
                    });
                    navigate.push("/admin/products");
                  }
                }}
                className="flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Product
              </Button>
            </div>
          )}
        </form>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video overflow-hidden">
                {formData.image && (
                  <img
                    src={formData.image}
                    alt={formData.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3">
                  {formData.name || "Product Name"}
                </h2>

                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      formData.status === "In Stock"
                        ? "bg-green-100 text-green-700"
                        : formData.status === "Low Stock"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {formData.status}
                  </span>

                  <span className="bg-lumey-yellow/20 text-lumey-orange px-2 py-1 rounded-full text-xs font-medium">
                    {formData.category}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <BatteryFull className="h-4 w-4 text-lumey-orange" />
                    <span className="font-medium">Capacity:</span>{" "}
                    {formData.capacity || "N/A"}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-lumey-orange" />
                    <span className="font-medium">Price (No Panel):</span>{" "}
                    {formData.priceNoPanel || "N/A"}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-lumey-orange" />
                    <span className="font-medium">
                      Price (With Panel):
                    </span>{" "}
                    {formData.priceWithPanel || "N/A"}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4">
                  {formData.description ||
                    "Product description will appear here."}
                </p>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Preview
                  </Button>
                  <Button className="flex-1 bg-lumey-orange hover:bg-lumey-yellow">
                    <Box className="h-4 w-4 mr-2" />
                    Order Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white p-6 rounded-md shadow">
            <h2 className="text-lg font-medium mb-4">Product Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">ID:</div>
                <div className="font-medium">{formData.id || "-"}</div>

                <div className="text-gray-500">Category:</div>
                <div className="font-medium">{formData.category}</div>

                <div className="text-gray-500">Status:</div>
                <div className="font-medium">{formData.status}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductEditor;
