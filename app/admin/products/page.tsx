"use client";
import { useState, useEffect } from "react";
import {
  Edit,
  Trash2,
  Plus,
  Package,
  Search,
  ArrowUpDown,
  BatteryFull,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useProducts, Product } from "@/hooks/useProducts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import AdminLayout from "../AdminLayout";

const AdminProductList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useRouter();
  const { toast } = useToast();

  const { products, isLoading, error, fetchAllProducts, removeProduct } =
    useProducts();

  // Set document title
  useEffect(() => {
    document.title = "Manage Products | Lumey Admin";
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.specs.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category &&
        product.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const success = await removeProduct(id);

      if (success) {
        toast({
          title: "Product deleted",
          description: "The product has been successfully deleted.",
        });
      }
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Manage Products</h1>
          <Button
            onClick={() => navigate.push("/admin/products/new")}
            className="bg-lumey-orange hover:bg-lumey-yellow"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Product
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="bg-white rounded-md shadow mb-6">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products by name, capacity or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-white z-10">
                  <TableRow>
                    <TableHead className="w-[40%]">
                      <div className="flex items-center space-x-1">
                        <span>Product Name</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center space-x-1">
                        <span>Capacity</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>
                      <div className="flex items-center space-x-1">
                        <span>Price (No Panel)</span>
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10">
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-8 w-8 animate-spin text-lumey-orange" />
                          <p className="text-gray-500">Loading products...</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            {product.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <BatteryFull className="h-3 w-3 text-green-500" />
                            {product.specs}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="bg-lumey-yellow/20 text-lumey-orange px-2 py-1 rounded-full text-xs font-medium">
                            {product.category || "Uncategorized"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {product.currentPrice
                            ? new Intl.NumberFormat("en-NG", {
                                style: "currency",
                                currency: "NGN",
                                minimumFractionDigits: 0,
                              }).format(product.currentPrice)
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.status === "In Stock"
                                ? "bg-green-100 text-green-700"
                                : product.status === "Low Stock"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {product.status || "In Stock"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                navigate.push(
                                  `/admin/products/edit/${product.id}`
                                )
                              }
                              title="Edit product"
                            >
                              <Edit className="h-4 w-4 text-blue-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(product.id)}
                              title="Delete product"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-6 text-gray-500"
                      >
                        No products found matching your search criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminProductList;
