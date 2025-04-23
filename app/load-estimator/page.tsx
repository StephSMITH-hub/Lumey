import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calculator,
  Plus,
  Trash2,
  MessageCircle,
  ShoppingCart,
  HelpCircle,
  Battery,
  AlertTriangle,
  CheckCircle,
  X,
  Clock,
  Layers,
  Home,
  Briefcase,
  Cpu,
  Edit,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { commonAppliances, productCapacities } from "@/data/applianceData";

interface Appliance {
  id: string;
  name: string;
  wattage: number;
  hours: number;
  groupId: string;
}

interface ApplianceGroup {
  id: string;
  name: string;
  totalWattage: number;
  totalWattHours: number;
}

interface Product {
  name: string;
  capacity: number;
  imageUrl: string;
  estimatedRuntime?: number;
  isRecommended?: boolean;
  isSufficient?: boolean;
  isLimitedByWattage?: boolean;
}

const defaultGroupId = "default";

const LoadEstimator = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([
    {
      id: crypto.randomUUID(),
      name: "",
      wattage: 0,
      hours: 1,
      groupId: defaultGroupId,
    },
  ]);
  const [groups, setGroups] = useState<ApplianceGroup[]>([
    {
      id: defaultGroupId,
      name: "Main Group",
      totalWattage: 0,
      totalWattHours: 0,
    },
  ]);
  const [totalWattHours, setTotalWattHours] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    setHasCalculated(false);

    const updatedGroups = groups.map((group) => ({
      ...group,
      totalWattage: 0,
      totalWattHours: 0,
    }));

    appliances.forEach((appliance) => {
      const groupIndex = updatedGroups.findIndex(
        (group) => group.id === appliance.groupId
      );

      if (groupIndex !== -1) {
        updatedGroups[groupIndex].totalWattage += appliance.wattage;
        updatedGroups[groupIndex].totalWattHours +=
          appliance.wattage * appliance.hours;
      }
    });

    setGroups(updatedGroups);

    const total = appliances.reduce((sum, appliance) => {
      return sum + appliance.wattage * appliance.hours;
    }, 0);

    setTotalWattHours(total);
  }, [appliances]);

  const addAppliance = (groupId = defaultGroupId) => {
    setAppliances([
      ...appliances,
      {
        id: crypto.randomUUID(),
        name: "",
        wattage: 0,
        hours: 1,
        groupId,
      },
    ]);
  };

  const removeAppliance = (id: string) => {
    if (appliances.length > 1) {
      setAppliances(appliances.filter((appliance) => appliance.id !== id));
    }
  };

  const updateAppliance = (
    id: string,
    field: keyof Appliance,
    value: string | number
  ) => {
    setAppliances(
      appliances.map((appliance) => {
        if (appliance.id === id) {
          return { ...appliance, [field]: value };
        }
        return appliance;
      })
    );
  };

  const handlePresetSelect = (id: string, applianceName: string) => {
    const preset = commonAppliances.find((a) => a.name === applianceName);

    if (preset) {
      setAppliances(
        appliances.map((appliance) => {
          if (appliance.id === id) {
            return { ...appliance, name: preset.name, wattage: preset.wattage };
          }
          return appliance;
        })
      );
    }
  };

  const addGroup = () => {
    if (newGroupName.trim()) {
      const newGroupId = crypto.randomUUID();
      const newGroup = {
        id: newGroupId,
        name: newGroupName.trim(),
        totalWattage: 0,
        totalWattHours: 0,
      };

      setGroups((prevGroups) => [...prevGroups, newGroup]);
      setNewGroupName("");
      setIsGroupDialogOpen(false);
    }
  };

  const calculateRecommendations = () => {
    setHasCalculated(false);
    setIsLoading(true);

    setTimeout(() => {
      const highestWattageGroup = [...groups].sort(
        (a, b) => b.totalWattage - a.totalWattage
      )[0];

      const highestWattHoursGroup = [...groups].sort(
        (a, b) => b.totalWattHours - a.totalWattHours
      )[0];

      const efficiencyFactor = 0.8;

      const recommendedProducts = productCapacities.map((product) => {
        const usableCapacity = product.capacity * efficiencyFactor;
        const estimatedRuntime =
          totalWattHours > 0 ? usableCapacity / totalWattHours : 0;

        const isLimitedByWattage =
          highestWattageGroup.totalWattage > product.capacity;

        return {
          ...product,
          estimatedRuntime,
          isSufficient:
            usableCapacity >= highestWattHoursGroup.totalWattHours &&
            !isLimitedByWattage,
          isLimitedByWattage,
          isRecommended: false,
        };
      });

      const sufficientProducts = recommendedProducts.filter(
        (p) => p.isSufficient
      );

      if (sufficientProducts.length > 0) {
        const bestMatch = sufficientProducts.reduce((prev, current) =>
          prev.capacity < current.capacity ? prev : current
        );

        recommendedProducts.forEach((product) => {
          if (product.name === bestMatch.name) {
            product.isRecommended = true;
          }
        });
      }

      if (sufficientProducts.length === 0) {
        recommendedProducts.push({
          name: "Custom Energy Solution",
          capacity: Math.max(
            totalWattHours * 1.5,
            highestWattageGroup.totalWattage * 2
          ),
          imageUrl: "/images/farm.jpg",
          isRecommended: true,
          isSufficient: true,
          estimatedRuntime: 24,
          isLimitedByWattage: false,
        });
      }

      setProducts(recommendedProducts);
      setHasCalculated(true);
      setIsLoading(false);
    }, 800);
  };

  const formatRuntime = (hours: number): string => {
    if (hours <= 0) return "N/A";

    if (hours < 1) {
      return `~${Math.round(hours * 60)} minutes`;
    }

    if (hours < 24) {
      return `~${Math.floor(hours)} hours ${Math.round(
        (hours % 1) * 60
      )} minutes`;
    }

    const days = Math.floor(hours / 24);
    const remainingHours = Math.floor(hours % 24);

    return `~${days} day${days !== 1 ? "s" : ""} ${remainingHours} hour${
      remainingHours !== 1 ? "s" : ""
    }`;
  };

  const getGroupIcon = (index: number) => {
    const icons = [Home, Briefcase, Cpu];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="h-4 w-4" />;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow lg:pt-32 pt-[76px] pb-16">
        <section className="section-container">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10 text-center">
              <div className="flex justify-center mb-4">
                <Badge className="px-4 py-1 text-base bg-lumey-yellow text-black">
                  <Calculator className="mr-2 h-5 w-5" />
                  Load Estimator
                </Badge>
              </div>
              <h1 className="heading-lg mb-4">
                Estimate Your Load & Discover the Right Powerbox
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Know your energy need, estimate usage hours, and choose your
                ideal Lumey Powerbox—simple and fast.
              </p>
            </div>

            <Card className="shadow-lg mb-8 border-lumey-yellow/30">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Battery className="mr-2 h-5 w-5 text-lumey-orange" />
                    Appliance Energy Calculator
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {groups.length > 1 && (
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groups.map((group, index) => (
                      <div
                        key={group.id}
                        className={cn(
                          "p-4 rounded-lg border",
                          group.id === defaultGroupId
                            ? "bg-gray-50"
                            : "bg-lumey-yellow/10"
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {getGroupIcon(index)}
                            <h3 className="font-medium ml-2">{group.name}</h3>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addAppliance(group.id)}
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-1">
                              Total Power:
                            </span>
                            <span className="font-medium">
                              {group.totalWattage}W
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-1">Load:</span>
                            <span className="font-medium">
                              {group.totalWattHours}Wh
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-medium">Appliance List</h3>
                  <Dialog
                    open={isGroupDialogOpen}
                    onOpenChange={setIsGroupDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Layers size={16} />
                        <span>Create Group</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Appliance Group</DialogTitle>
                        <DialogDescription>
                          Groups help organize appliances that are used
                          together. Each group's power and energy needs will be
                          calculated separately.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="groupName">Group Name</Label>
                          <Input
                            id="groupName"
                            placeholder="e.g., Living Room, Kitchen, Office"
                            value={newGroupName}
                            onChange={(e) => setNewGroupName(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => setIsGroupDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={addGroup}
                            disabled={!newGroupName.trim()}
                          >
                            Create Group
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="mb-6">
                  <div className="grid grid-cols-12 gap-4 mb-2 font-medium text-gray-700">
                    <div className="col-span-3 md:col-span-4">Appliance</div>
                    <div className="col-span-2">Power (W)</div>
                    <div className="col-span-2">Hours/day</div>
                    <div className="col-span-4 md:col-span-3">Group</div>
                    <div className="col-span-1"></div>
                  </div>

                  {appliances.map((appliance) => (
                    <div
                      key={appliance.id}
                      className="grid grid-cols-12 gap-4 mb-4 items-center"
                    >
                      <div className="col-span-3 md:col-span-4">
                        <Select
                          value={appliance.name}
                          onValueChange={(value) =>
                            handlePresetSelect(appliance.id, value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select appliance" />
                          </SelectTrigger>
                          <SelectContent>
                            {commonAppliances.map((item) => (
                              <SelectItem key={item.name} value={item.name}>
                                {item.name} ({item.wattage}W)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="col-span-2">
                        <div className="relative">
                          <Input
                            type="number"
                            min="0"
                            value={appliance.wattage || ""}
                            onChange={(e) =>
                              updateAppliance(
                                appliance.id,
                                "wattage",
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="pr-6"
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  The power consumption in watts. Check your
                                  appliance label or manual for this
                                  information.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <div className="relative">
                          <Input
                            type="number"
                            min="0"
                            max="24"
                            step="0.5"
                            value={appliance.hours || ""}
                            onChange={(e) =>
                              updateAppliance(
                                appliance.id,
                                "hours",
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="pr-6"
                          />
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  How many hours per day you use this appliance.
                                  Can be a decimal (e.g., 0.5 for 30 minutes).
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>

                      <div className="col-span-4 md:col-span-3">
                        <Select
                          value={appliance.groupId}
                          onValueChange={(value) =>
                            updateAppliance(appliance.id, "groupId", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {groups.map((group) => (
                              <SelectItem key={group.id} value={group.id}>
                                {group.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="col-span-1 flex justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeAppliance(appliance.id)}
                          disabled={appliances.length === 1}
                          className="h-9 w-9 text-gray-500 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={() => addAppliance()}
                    className="w-full mt-2 border-dashed border-gray-300 text-gray-500 hover:text-lumey-orange hover:border-lumey-orange"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Another Appliance
                  </Button>
                </div>

                <div className="flex justify-center mt-8">
                  <Button
                    onClick={calculateRecommendations}
                    className="w-full md:w-1/2 bg-lumey-yellow hover:bg-lumey-orange text-black font-medium py-6 text-lg shadow-lg"
                    disabled={
                      isLoading || appliances.every((a) => a.wattage === 0)
                    }
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <div className="animate-spin mr-2 h-5 w-5 border-2 border-black border-t-transparent rounded-full"></div>
                        Calculating...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Calculator className="mr-2 h-5 w-5" />
                        Calculate My Power Needs
                      </span>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {hasCalculated && (
              <div className="animate-fade-in">
                <div className="mb-8">
                  <h2 className="heading-md mb-4 text-center">
                    Group Analysis
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups.map((group, index) => {
                      return (
                        <Card
                          key={group.id}
                          className={cn(
                            "border",
                            group.id ===
                              groups.sort(
                                (a, b) => b.totalWattage - a.totalWattage
                              )[0].id
                              ? "border-lumey-orange/60 shadow-md"
                              : "border-gray-200"
                          )}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="flex items-center text-lg">
                              {getGroupIcon(index)}
                              <span className="ml-2">{group.name}</span>
                              {group.id ===
                                groups.sort(
                                  (a, b) => b.totalWattage - a.totalWattage
                                )[0].id && (
                                <Badge className="ml-auto bg-lumey-orange text-white">
                                  Highest Power
                                </Badge>
                              )}
                              {group.id ===
                                groups.sort(
                                  (a, b) => b.totalWattHours - a.totalWattHours
                                )[0].id &&
                                group.id !==
                                  groups.sort(
                                    (a, b) => b.totalWattage - a.totalWattage
                                  )[0].id && (
                                  <Badge className="ml-auto bg-lumey-yellow text-black">
                                    Highest Load
                                  </Badge>
                                )}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-500">
                                  Total Power:
                                </span>
                                <span className="font-semibold">
                                  {group.totalWattage}W
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">
                                  Total Load:
                                </span>
                                <span className="font-semibold">
                                  {group.totalWattHours}Wh
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">
                                  Appliances:
                                </span>
                                <span className="font-semibold">
                                  {
                                    appliances.filter(
                                      (a) => a.groupId === group.id
                                    ).length
                                  }
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-lumey-yellow/20 to-lumey-orange/20 rounded-lg p-6 mb-8 text-center">
                  <h2 className="text-xl md:text-2xl font-semibold mb-2">
                    Your Total Estimated Load:
                  </h2>
                  <div className="text-3xl md:text-4xl font-bold text-lumey-orange">
                    {totalWattHours.toLocaleString()} Wh
                  </div>
                  <p className="text-gray-600 mt-2">
                    Based on your appliance usage per day
                  </p>
                </div>

                <h2 className="heading-md mb-6 text-center">
                  Recommended Powerbox Solutions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {products
                    .filter(
                      (product) =>
                        product.isSufficient ||
                        product.name === "Custom Energy Solution"
                    )
                    .map((product) => (
                      <Card
                        key={product.name}
                        className={cn(
                          "border h-full transition-all duration-300 hover:shadow-xl",
                          product.isRecommended
                            ? "border-lumey-yellow shadow-lg"
                            : product.isSufficient
                            ? "border-green-300"
                            : "border-red-300"
                        )}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">
                              {product.name}
                            </CardTitle>
                            {product.isRecommended && (
                              <Badge className="bg-lumey-yellow text-black">
                                Recommended
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pt-2">
                          <div className="flex items-center mb-4">
                            <Battery className="h-5 w-5 mr-2 text-lumey-orange" />
                            <span className="font-semibold">
                              {product.capacity.toLocaleString()} Wh Capacity
                            </span>
                          </div>

                          <div className="flex flex-col gap-2 mb-4">
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 mr-2 text-gray-600" />
                              <span className="font-medium">
                                Estimated Runtime:
                              </span>
                            </div>
                            <div className="ml-7 text-lg font-semibold">
                              {product.name === "Custom Energy Solution"
                                ? "24+ hours (custom sized)"
                                : formatRuntime(product.estimatedRuntime || 0)}
                            </div>
                          </div>

                          {product.isSufficient ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-5 w-5 mr-2" />
                              <span>Sufficient for your needs</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-red-500">
                              <AlertTriangle className="h-5 w-5 mr-2" />
                              <span>Not enough capacity</span>
                            </div>
                          )}

                          <div className="h-[160px] overflow-hidden rounded-md mt-4 bg-gray-100 flex items-center justify-center">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-2">
                          {product.isSufficient && (
                            <Button
                              asChild
                              className="w-full bg-lumey-yellow hover:bg-lumey-orange text-black"
                            >
                              {product.name === "Custom Energy Solution" ? (
                                <a
                                  href="https://wa.me/2348139743177?text=I%20need%20a%20custom%20power%20solution"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <MessageCircle className="mr-2 h-4 w-4" />
                                  Request Quote
                                </a>
                              ) : (
                                <Link href="/products">
                                  <ShoppingCart className="mr-2 h-4 w-4" />
                                  Order Now
                                </Link>
                              )}
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                </div>

                {products.filter((product) => !product.isSufficient).length >
                  0 && (
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold mb-4 text-center">
                      Insufficient Capacity Options
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {products
                        .filter((product) => !product.isSufficient)
                        .map((product) => (
                          <Card key={product.name} className="border-red-200">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm flex justify-between">
                                <span>{product.name}</span>
                                <Badge
                                  variant="destructive"
                                  className="text-xs"
                                >
                                  Insufficient
                                </Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2">
                              <div className="flex justify-between items-center text-sm mb-2">
                                <span className="text-gray-500">Capacity:</span>
                                <span>
                                  {product.capacity.toLocaleString()} Wh
                                </span>
                              </div>
                              <div className="flex items-center text-xs text-red-600">
                                {product.isLimitedByWattage ? (
                                  <>
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    <span>Wattage exceeds product limits</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    <span>Capacity too low for your needs</span>
                                  </>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                )}

                <div className="bg-gradient-to-r from-lumey-yellow/10 to-lumey-orange/10 rounded-lg p-8 text-center">
                  <h3 className="text-xl font-semibold mb-4">
                    Not sure how to estimate properly?
                  </h3>
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <a
                      href="https://wa.me/2348139743177"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-secondary"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Chat with a Lumey Power Consultant
                    </a>
                    <Link href="/products" className="button-primary">
                      <ShoppingCart className="h-5 w-5" />
                      Browse All Products
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoadEstimator;
