export const siteConfig = {
  companyName: "DreamDen",
  logo: "/images/logo.png",
  email: "info@dreamden.ca",
  phone: "+1 (647) 617-1301",
  address: "Toronto, Ontario, Canada",
  socials: {
    instagram: "https://www.instagram.com/dreamdendevelopments?igsh=MTZ2NmVrajczY2RzNw%3D%3D",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { 
      label: "Services", 
      href: "/#services",
      children: [
        { label: "Full Home Renovations", href: "/services/full-home-renovation" },
        { label: "Legal Basement Apartments", href: "/services/legal-basement-apartment" },
        { label: "Custom Homes", href: "/services/custom-homes" },
        { label: "Kitchen Renovations", href: "/services/kitchen-renovation" },
        { label: "Bathroom Renovations", href: "/services/bathroom-renovation" },
        { label: "Basement Renovations", href: "/services/basement-renovation" },
        { label: "Home Additions", href: "/services/home-addition" },
        { label: "Interior & Exterior Renovations", href: "/services/interior-exterior-renovation" },
        { label: "Commercial & Bar Renovations", href: "/services/commercial-bar-renovation" }
      ]
    },
    { label: "Projects", href: "/projects" },
    { label: "Estimate", href: "/#estimate-calculator" },
    { label: "Contact", href: "/contact" }
  ]
};
