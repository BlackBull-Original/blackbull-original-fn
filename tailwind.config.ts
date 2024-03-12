import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/Sidebar.tsx",
    "./components/Button.tsx",
    "./components/Header.tsx",
    "./components/VehiDetails.tsx",
    "./src/pages/create-vehicle/index.tsx",
    "./src/pages/login/index.tsx",
    "./components/Progressbar.tsx",
    "./components/Maininputfield.tsx",
    "./components/Maindatefield.tsx",
    "./components/Mainselectfield.tsx",
    "./components/FileUpload.tsx",
    "./components/Footer.tsx",
    "./src/pages/dashboard/index.tsx",
    "./components/InputField.tsx",
    "./src/pages/create-vehicle/index.tsx",
    "./components/StatusChip.tsx",
    "./components/DropDownMap.tsx",
    "./src/pages/onboarding/vehicle-list/index.tsx",
    "./src/pages/subscription-plan/index.tsx",
    "./src/pages/onboarding/driver-list/index.tsx",
    "./components/DriverDetails.tsx",
    "./components/imageUpload/ImageUpload.tsx",
    "./components/UserDetails.tsx",
    "./components/SupplierDetails.tsx",
    "./components/CustomerDetails.tsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
