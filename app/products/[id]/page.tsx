"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  Phone,
  MessageSquare,
  Wrench,
  Zap,
  Shield,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductsTable } from "@/components";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { NextSeo } from 'next-seo';

const formatNumber = (num: number) => {
  return num.toLocaleString("en-NG");
};

const ProductPage = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const { productId } = useParams();
  const { products, getProductById } = useProducts();
  const [currentProduct, setCurrentProduct] = useState(products[0]);
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (productId) {
      const foundProduct = getProductById(productId as string);
      if (foundProduct) {
        setCurrentProduct(foundProduct);
      }
    }
  }, [productId, getProductById]);

  // ... rest of the existing code ...
}; 