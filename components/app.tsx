"use client";
import { FloatingCTA, Footer, Header } from "@/components";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const App = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  return (
    <div>
      {pathname.includes("api-doc") || pathname.includes("admin") ? (
        <div>{children}</div>
      ) : (
        <div>
          <Header />
          <div>{children}</div>
          <Footer />
          <FloatingCTA />
        </div>
      )}
    </div>
  );
};

export default App;
