import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Package, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "next/link";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Set document title
  useEffect(() => {
    document.title = "Admin Dashboard | Lumey";
  }, []);

  return (
    <>
      <div className="text-2xl font-semibold mb-6">Dashboard</div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate("/admin/blogs")}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Blog Posts
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+2 added this month</p>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate("/admin/products")}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">All products active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Website Visitors
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Blog Traffic</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              +24% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-lumey-yellow/10 w-9 h-9 rounded-full flex items-center justify-center mr-3">
                  <FileText className="h-4 w-4 text-lumey-orange" />
                </div>
                <div>
                  <div className="font-medium text-sm">
                    The Future of Solar Energy in Nigeria
                  </div>
                  <div className="text-xs text-gray-500">
                    Updated 2 days ago
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-lumey-yellow/10 w-9 h-9 rounded-full flex items-center justify-center mr-3">
                  <FileText className="h-4 w-4 text-lumey-orange" />
                </div>
                <div>
                  <div className="font-medium text-sm">
                    Lumey Powerbox 2100 Review
                  </div>
                  <div className="text-xs text-gray-500">
                    Published 5 days ago
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-lumey-yellow/10 w-9 h-9 rounded-full flex items-center justify-center mr-3">
                  <FileText className="h-4 w-4 text-lumey-orange" />
                </div>
                <div>
                  <div className="font-medium text-sm">
                    Solar Power vs. Generators
                  </div>
                  <div className="text-xs text-gray-500">
                    Published 2 weeks ago
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/admin/blogs/new")}
                className="flex flex-col items-center justify-center bg-gray-50 hover:bg-lumey-yellow/10 p-4 rounded-lg transition-colors"
              >
                <FileText className="h-8 w-8 text-lumey-orange mb-2" />
                <span className="text-sm font-medium">New Blog Post</span>
              </button>

              <button
                onClick={() => navigate("/admin/products/new")}
                className="flex flex-col items-center justify-center bg-gray-50 hover:bg-lumey-yellow/10 p-4 rounded-lg transition-colors"
              >
                <Package className="h-8 w-8 text-lumey-orange mb-2" />
                <span className="text-sm font-medium">Add Product</span>
              </button>

              <button
                onClick={() => navigate("/admin/blogs")}
                className="flex flex-col items-center justify-center bg-gray-50 hover:bg-lumey-yellow/10 p-4 rounded-lg transition-colors"
              >
                <TrendingUp className="h-8 w-8 text-lumey-orange mb-2" />
                <span className="text-sm font-medium">View Analytics</span>
              </button>

              <button
                onClick={() => navigate("/")}
                className="flex flex-col items-center justify-center bg-gray-50 hover:bg-lumey-yellow/10 p-4 rounded-lg transition-colors"
              >
                <Users className="h-8 w-8 text-lumey-orange mb-2" />
                <span className="text-sm font-medium">Visit Website</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminDashboard;
