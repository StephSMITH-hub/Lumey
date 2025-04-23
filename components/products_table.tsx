import React from "react";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

// Define product features for the table
const tableData = [
  {
    feature: "Capacity/Battery Size",
    "powerbox-550": "400W/550Wh",
    "powerbox-1200": "800W/1200Wh",
    "powerbox-2100": "1500W/2100Wh",
    "powerbox-3300": "1500W/3300Wh",
    "powerbox-6500": "3500W/6500Wh",
  },
  {
    feature: "Ideal For",
    "powerbox-550": "Students, light home users",
    "powerbox-1200": "Remote workers, small families",
    "powerbox-2100": "Homes & small businesses",
    "powerbox-3300": "Offices, large homes",
    "powerbox-6500": "Full homes, worksites, industry",
  },
  {
    feature: "Gadgets It Can Power",
    "powerbox-550": "Phones, laptops, bulbs, TV, fans, MP3",
    "powerbox-1200": "Phones, bulbs, fans, MP3, Laptops, TVs, printers, fans",
    "powerbox-2100": "Fridges, TVs, printers, PoS, fans, and more…",
    "powerbox-3300": "AC, fridges, CCTV, routers, TVs, computers, more…",
    "powerbox-6500": "ACs, freezers, pumps, routers, large appliances",
  },
  {
    feature: "Charging Options",
    "powerbox-550": "Solar, Grid(NEPA), Generator",
    "powerbox-1200": "Solar, Grid(NEPA), Generator",
    "powerbox-2100": "Solar, Grid(NEPA), Generator",
    "powerbox-3300": "Solar, Grid(NEPA), Generator",
    "powerbox-6500": "Solar, Grid(NEPA), Generator",
  },
  {
    feature: "Backup Duration",
    "powerbox-550": "6–10 hours",
    "powerbox-1200": "8–12 hours",
    "powerbox-2100": "Up to 12 hours",
    "powerbox-3300": "10–18 hours",
    "powerbox-6500": "Up to 24 hours",
  },
  // {
  //   feature: "Solar Panels",
  //   "powerbox-550": "1 x 12V, 200W panel",
  //   "powerbox-1200": "2 x 12V, 200W panels",
  //   "powerbox-2100": "3 x 12V, 200W panels",
  //   "powerbox-3300": "2 x 555W panels",
  //   "powerbox-6500": "4 x 555W panels",
  // },
  {
    feature: "Warranty",
    "powerbox-550": "12 Months",
    "powerbox-1200": "12 Months",
    "powerbox-2100": "12 Months",
    "powerbox-3300": "12 Months",
    "powerbox-6500": "12 Months",
  },
  {
    feature: "Price (No Panel)",
    "powerbox-550": "₦220,000",
    "powerbox-1200": "₦320,000",
    "powerbox-2100": "₦500,000",
    "powerbox-3300": "₦820,000",
    "powerbox-6500": "₦1,500,000",
  },
  {
    feature: "Price (With Panel)",
    "powerbox-550": "₦270,000 (1 x 12V, 200W)",
    "powerbox-1200": "₦420,000 (2 x 12V, 200W)",
    "powerbox-2100": "₦650,000 (3 x 12V, 200W)",
    "powerbox-3300": "₦1,120,000 (2 x 555W)",
    "powerbox-6500": "₦2,100,000 (4 x 555W)",
  },
  {
    feature: "",
    "powerbox-550": "powerbox-550",
    "powerbox-1200": "powerbox-1200",
    "powerbox-2100": "powerbox-2100",
    "powerbox-3300": "powerbox-3300",
    "powerbox-6500": "powerbox-6500",
  },
];

export const ProductsTable = () => {
  return (
    <div className="my-5 rounded-xl border-2 border-gray-200 overflow-x-auto shadow-lg">
      <div className="w-full">
        <div className="min-w-[800px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-lumey-dark text-white">
                <th className="sticky left-0 bg-lumey-dark font-bold p-3 border-r border-gray-600">
                  Feature
                </th>
                <th className="font-bold p-3 text-center border-r border-gray-600 bg-lumey-yellow/90 text-black">
                  Lumey Powerbox 550
                </th>
                <th className="font-bold p-3 text-center border-r border-gray-600 bg-gray-200 text-black">
                  Lumey Powerbox 1200
                </th>
                <th className="font-bold p-3 text-center border-r border-gray-600 bg-lumey-yellow/60 text-black">
                  Lumey Powerbox 2100
                </th>
                <th className="font-bold p-3 text-center border-r border-gray-600 bg-gray-200 text-black">
                  Lumey Powerbox 3300
                </th>
                <th className="font-bold p-3 text-center bg-lumey-yellow/80 text-black">
                  Lumey Powerbox 6500
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={cn(
                    rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50",
                    row.feature === "Price (No Panel)" ||
                      row.feature === "Price (With Panel)"
                      ? "bg-lumey-yellow/10 font-semibold"
                      : ""
                  )}
                >
                  <td
                    className={cn(
                      "p-3 font-semibold border-r border-gray-200 sticky  left-0 ",
                      rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50",
                      // row.feature === "Price (No Panel)" ||
                      //   row.feature === "Price (With Panel)"
                      //   ? "bg-lumey-yellow/10"
                      //   : "",
                      row.feature === "" ? "border-t-2 border-t-gray-300" : ""
                    )}
                  >
                    {row.feature}
                  </td>
                  {[
                    "powerbox-550",
                    "powerbox-1200",
                    "powerbox-2100",
                    "powerbox-3300",
                    "powerbox-6500",
                  ].map((model, colIndex) => {
                    // Determine background color for each column
                    let bgColorClass = "";

                    // Fix the alignment issue by giving the 3300 column its own style
                    if (colIndex === 0 || colIndex === 2 || colIndex === 4) {
                      // 550, 2100, and 3300 columns - yellow tint
                      bgColorClass = "bg-lumey-yellow/10";
                    } else if (colIndex === 1) {
                      // 1200 column - gray tint
                      bgColorClass = "bg-gray-100";
                    } else if (colIndex === 4) {
                      // 6500 column - white
                      bgColorClass = "bg-white";
                    }

                    return (
                      <td
                        key={colIndex}
                        className={cn(
                          "p-3 text-center border-r border-gray-200",
                          row.feature === ""
                            ? "pt-4 pb-4 border-t-2 border-t-gray-300"
                            : "",
                          bgColorClass,
                          colIndex === 4 ? "border-r-0" : ""
                        )}
                      >
                        {row.feature === "" ? (
                          <a
                            href={`https://wa.me/2348139743177?text=I'm%20interested%20in%20the%20${encodeURIComponent(
                              model.replace("powerbox-", "powerbox ")
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button-primary py-2 text-center text-sm w-full inline-flex items-center justify-center gap-1"
                          >
                            <MessageSquare size={14} />
                            Order Now
                          </a>
                        ) : (
                          <span
                            className={cn(
                              row.feature === "Output Capacity" ||
                                row.feature === "Battery Size"
                                ? "font-bold"
                                : "",
                              row.feature === "Price (No Panel)" ||
                                row.feature === "Price (With Panel)"
                                ? "text-lumey-orange"
                                : ""
                            )}
                          >
                            {
                              ///@ts-expect-error expect error from here
                              row[model]
                            }
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add the custom section back below the table */}
      {/* <div className="bg-gradient-to-r from-lumey-yellow/20 to-lumey-orange/20 p-6 rounded-b-lg border-t-2 border-lumey-yellow/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-lg font-bold mb-2">
              Need a different configuration?
            </h3>
            <p className="text-gray-700 mb-4">
              We can customize any Powerbox to your exact specifications.
              Whether you need higher capacity, different output options, or
              specialized features — just let us know!
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full">
                <Check className="h-4 w-4 text-lumey-green" />
                <span className="text-sm">Custom Battery Sizes</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full">
                <Check className="h-4 w-4 text-lumey-green" />
                <span className="text-sm">Advanced Features</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full">
                <Check className="h-4 w-4 text-lumey-green" />
                <span className="text-sm">Commercial Installations</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="tel:+2348139743177"
              className="button-primary flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Call For Custom Order
            </a>
            <a
              href="#contact"
              className="button-secondary flex items-center justify-center gap-2"
            >
              <MessageSquare size={18} />
              Request Quote
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
};
