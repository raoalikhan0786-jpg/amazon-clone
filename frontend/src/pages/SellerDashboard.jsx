import React, { useState, useEffect } from "react";
import {
    FaChartLine, FaBox, FaPlusCircle, FaShoppingCart, FaRupeeSign,
    FaTruck, FaCheckCircle, FaClock, FaExclamationTriangle, FaStore,
    FaUndo, FaUpload, FaMoneyBillWave, FaCreditCard, FaArrowRight,
    FaCaretDown, FaTrash, FaPlus, FaImage, FaTag, FaBarcode,
    FaWeightHanging, FaRuler, FaBoxes, FaRedo, FaShieldAlt,
    FaSearch, FaFileAlt, FaGlobe, FaCheck, FaTimes
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
    const navigate = useNavigate();

    const [sellerTab, setSellerTab] = useState("overview");
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [selectedProductType, setSelectedProductType] = useState("");
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
    const [isProductTypeOpen, setIsProductTypeOpen] = useState(false);

    // Load products from localStorage
    const [myProducts, setMyProducts] = useState([]);
    const [incomingOrders, setIncomingOrders] = useState([]);

    // Load products when sellerTab changes to inventory or overview
    useEffect(() => {
        if (sellerTab === "inventory" || sellerTab === "overview") {
            loadProductsFromStorage();
        }
    }, [sellerTab]);

    const loadProductsFromStorage = () => {
        const storedProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
        setMyProducts(storedProducts);
    };

    const primaryColor = "#03bafc";

    const categories = [
        {
            name: "Electronics", subCategories: [
                { name: "Mobiles", productTypes: ["Smartphones", "Feature Phones"] },
                { name: "Computers", productTypes: ["Laptops", "Desktops", "Monitors", "Printers", "Scanners"] },
                { name: "Tablets", productTypes: ["Android Tablets", "iPad", "Windows Tablets"] },
                { name: "Smart Watches", productTypes: ["Android Watches", "Apple Watch", "Fitness Trackers"] },
                { name: "Headphones & Earphones", productTypes: ["Wireless", "Wired", "Neckband", "TWS"] },
                { name: "Speakers", productTypes: ["Bluetooth Speakers", "Smart Speakers", "Home Theatre"] },
                { name: "Cameras", productTypes: ["DSLR", "Mirrorless", "Action Cameras", "CCTV Cameras", "Webcams"] },
                { name: "Power Banks", productTypes: ["10000mAh", "20000mAh", "30000mAh"] },
                { name: "Mobile Accessories", productTypes: ["Chargers", "Cases & Covers", "Screen Protectors", "Cables", "Selfie Sticks"] },
                { name: "Gaming", productTypes: ["Gaming Laptops", "Gaming Consoles", "Gaming Accessories"] }
            ]
        },
        {
            name: "Fashion", subCategories: [
                { name: "Men's Clothing", productTypes: ["T-Shirts", "Shirts", "Jeans", "Trousers", "Jackets", "Sweaters", "Innerwear"] },
                { name: "Women's Clothing", productTypes: ["Sarees", "Kurtis", "Dresses", "Tops", "Jeans", "Leggings", "Ethnic Wear"] },
                { name: "Kids Clothing", productTypes: ["Boys Clothing", "Girls Clothing", "Baby Clothing"] },
                { name: "Footwear", productTypes: ["Sports Shoes", "Casual Shoes", "Formal Shoes", "Sandals", "Slippers", "Boots"] },
                { name: "Watches", productTypes: ["Analog", "Digital", "Smart Watches", "Luxury Watches"] },
                { name: "Sunglasses", productTypes: ["Aviator", "Wayfarer", "Sports", "Polarized"] },
                { name: "Jewellery", productTypes: ["Rings", "Necklaces", "Earrings", "Bracelets", "Pendants"] },
                { name: "Bags", productTypes: ["Backpacks", "Handbags", "Laptop Bags", "Travel Bags", "Wallets"] }
            ]
        },
        {
            name: "Home & Kitchen", subCategories: [
                { name: "Furniture", productTypes: ["Beds", "Sofas", "Dining Tables", "Chairs", "Wardrobes", "Study Tables"] },
                { name: "Kitchen Appliances", productTypes: ["Mixer Grinder", "Microwave", "Induction Cooktop", "Refrigerator", "OTG"] },
                { name: "Home Decor", productTypes: ["Wall Art", "Clocks", "Vases", "Candles", "Showpieces"] },
                { name: "Lighting", productTypes: ["Ceiling Lights", "Table Lamps", "String Lights", "Bulbs"] },
                { name: "Storage", productTypes: ["Containers", "Organizers", "Shelves", "Drawers"] },
                { name: "Cookware", productTypes: ["Pans", "Pots", "Pressure Cookers", "Non-stick"] },
                { name: "Dinnerware", productTypes: ["Plates", "Bowls", "Cups", "Cutlery Sets"] },
                { name: "Bedding", productTypes: ["Bed Sheets", "Comforters", "Pillows", "Blankets"] }
            ]
        },
        {
            name: "Beauty & Personal Care", subCategories: [
                { name: "Makeup", productTypes: ["Foundation", "Lipstick", "Kajal", "Compact", "Mascara"] },
                { name: "Skincare", productTypes: ["Face Wash", "Moisturizer", "Sunscreen", "Serum", "Face Mask"] },
                { name: "Hair Care", productTypes: ["Shampoo", "Conditioner", "Hair Oil", "Hair Color", "Serum"] },
                { name: "Fragrances", productTypes: ["Perfumes", "Deodorants", "Attar", "Body Spray"] },
                { name: "Grooming", productTypes: ["Trimmer", "Shaver", "Razor", "Scissors", "Nail Cutter"] },
                { name: "Bath & Body", productTypes: ["Soap", "Body Wash", "Lotion", "Scrub", "Hand Cream"] }
            ]
        },
        {
            name: "Books", subCategories: [
                { name: "Academic Books", productTypes: ["School Books", "College Books", "Competitive Exams"] },
                { name: "Novels", productTypes: ["Fiction", "Non-Fiction", "Romance", "Thriller", "Sci-Fi"] },
                { name: "Religious Books", productTypes: ["Quran", "Geeta", "Bible", "Guru Granth Sahib"] },
                { name: "Children's Books", productTypes: ["Story Books", "Activity Books", "Picture Books"] }
            ]
        },
        {
            name: "Toys & Games", subCategories: [
                { name: "Educational Toys", productTypes: ["Puzzles", "Building Blocks", "Learning Toys"] },
                { name: "Remote Control Toys", productTypes: ["RC Cars", "RC Helicopter", "RC Boat", "Drones"] },
                { name: "Board Games", productTypes: ["Chess", "Ludo", "Monopoly", "Scrabble", "Carrom"] },
                { name: "Action Figures", productTypes: ["Superheroes", "Cartoon Characters", "Anime Figures"] }
            ]
        },
        {
            name: "Sports & Fitness", subCategories: [
                { name: "Gym Equipment", productTypes: ["Dumbbells", "Weight Plates", "Bench", "Treadmill"] },
                { name: "Cricket", productTypes: ["Bats", "Balls", "Gloves", "Helmets", "Pads"] },
                { name: "Football", productTypes: ["Football", "Shoes", "Shin Guards", "Jersey"] },
                { name: "Badminton", productTypes: ["Rackets", "Shuttlecock", "Net", "Shoes"] },
                { name: "Yoga", productTypes: ["Mat", "Blocks", "Strap", "Wheel", "Clothes"] },
                { name: "Cycling", productTypes: ["Cycle", "Helmet", "Gloves", "Lights", "Lock"] }
            ]
        }
    ];

    const isSectionVisible = (sectionName) => {
        if (!selectedCategory) return true;
        const category = selectedCategory;
        if (category === "Electronics") {
            return ["Basic Info", "Category", "Images", "Pricing", "Inventory", "Shipping", "Variants", "Return", "Payment", "Specifications", "Documents", "SEO", "Publish"].includes(sectionName);
        }
        if (category === "Fashion") {
            return ["Basic Info", "Category", "Images", "Pricing", "Inventory", "Variants", "Return", "Payment", "Specifications", "Documents", "SEO", "Publish"].includes(sectionName);
        }
        if (category === "Home & Kitchen") {
            return ["Basic Info", "Category", "Images", "Pricing", "Inventory", "Shipping", "Return", "Payment", "Specifications", "Documents", "SEO", "Publish"].includes(sectionName);
        }
        if (category === "Beauty & Personal Care") {
            return ["Basic Info", "Category", "Images", "Pricing", "Inventory", "Return", "Payment", "Specifications", "Documents", "SEO", "Publish"].includes(sectionName);
        }
        if (category === "Books") {
            return ["Basic Info", "Category", "Images", "Pricing", "Inventory", "Return", "Payment", "Specifications", "Documents", "SEO", "Publish"].includes(sectionName);
        }
        if (category === "Toys & Games") {
            return ["Basic Info", "Category", "Images", "Pricing", "Inventory", "Return", "Payment", "Specifications", "Documents", "SEO", "Publish"].includes(sectionName);
        }
        if (category === "Sports & Fitness") {
            return ["Basic Info", "Category", "Images", "Pricing", "Inventory", "Shipping", "Return", "Payment", "Specifications", "Documents", "SEO", "Publish"].includes(sectionName);
        }
        return true;
    };

    const getSpecificationFields = () => {
        if (selectedCategory === "Electronics") {
            return [
                { label: "Display", placeholder: "6.5-inch AMOLED", key: "display" },
                { label: "Processor", placeholder: "Snapdragon 8 Gen 2", key: "processor" },
                { label: "RAM", placeholder: "8GB", key: "ram" },
                { label: "Storage", placeholder: "128GB", key: "storage" },
                { label: "Battery", placeholder: "5000mAh", key: "battery" }
            ];
        }
        if (selectedCategory === "Fashion") {
            return [
                { label: "Fabric", placeholder: "Cotton, Polyester", key: "fabric" },
                { label: "Sleeve Type", placeholder: "Full Sleeve, Half Sleeve", key: "sleeveType" },
                { label: "Fit Type", placeholder: "Regular, Slim, Oversized", key: "fitType" }
            ];
        }
        if (selectedCategory === "Books") {
            return [
                { label: "Author", placeholder: "Author name", key: "author" },
                { label: "Publisher", placeholder: "Publisher name", key: "publisher" },
                { label: "ISBN", placeholder: "ISBN number", key: "isbn" },
                { label: "Pages", placeholder: "Number of pages", key: "pages" }
            ];
        }
        return [];
    };

    const [newProduct, setNewProduct] = useState({
        title: "",
        brand: "",
        manufacturer: "",
        sku: "",
        description: "",
        features: [],
        tags: "",
        category: "",
        subCategory: "",
        productType: "",
        mainImage: null,
        galleryImages: [],
        videoUrl: "",
        mrp: "",
        sellingPrice: "",
        discount: "",
        specialOfferPrice: "",
        stockQuantity: "",
        minStockAlert: "",
        warehouse: "",
        weight: "",
        length: "",
        width: "",
        height: "",
        packageType: "",
        variants: [],
        returnAvailable: "No",
        returnDays: "",
        warrantyPeriod: "",
        warrantyType: "",
        codAvailable: "Yes",
        minOrderValueForCOD: "",
        onlinePayment: "Yes",
        emiEligible: "No",
        gstIncluded: "Yes",
        invoiceAvailable: "Yes",
        specifications: {},
        gstNumber: "",
        brandAuthorization: "",
        invoiceDetails: "",
        searchKeywords: "",
        metaTitle: "",
        metaDescription: "",
        publishStatus: "Draft"
    });

    const [variants, setVariants] = useState([]);
    const [variantType, setVariantType] = useState("");
    const [variantValue, setVariantValue] = useState("");
    const [featureText, setFeatureText] = useState("");

    const getSubCategories = () => {
        const category = categories.find(c => c.name === selectedCategory);
        return category ? category.subCategories : [];
    };

    const getProductTypes = () => {
        const category = categories.find(c => c.name === selectedCategory);
        if (!category) return [];
        const subCategory = category.subCategories.find(s => s.name === selectedSubCategory);
        return subCategory ? subCategory.productTypes : [];
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedSubCategory("");
        setSelectedProductType("");
        setNewProduct({ ...newProduct, category: category, subCategory: "", productType: "" });
        setIsCategoryOpen(false);
    };

    const handleSubCategorySelect = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setSelectedProductType("");
        setNewProduct({ ...newProduct, subCategory: subCategory, productType: "" });
        setIsSubCategoryOpen(false);
    };

    const handleProductTypeSelect = (productType) => {
        setSelectedProductType(productType);
        setNewProduct({ ...newProduct, productType: productType });
        setIsProductTypeOpen(false);
    };

    const handleMainImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewProduct({ ...newProduct, mainImage: URL.createObjectURL(e.target.files[0]) });
        }
    };

    const handleGalleryImagesChange = (e) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            const imageUrls = filesArray.map(file => URL.createObjectURL(file));
            setNewProduct({
                ...newProduct,
                galleryImages: [...newProduct.galleryImages, ...imageUrls]
            });
        }
    };

    const removeGalleryImage = (index) => {
        const updatedGallery = newProduct.galleryImages.filter((_, i) => i !== index);
        setNewProduct({ ...newProduct, galleryImages: updatedGallery });
    };

    const calculateAutoDiscount = (mrpValue, sellingPriceValue) => {
        const mrp = parseFloat(mrpValue);
        const sellingPrice = parseFloat(sellingPriceValue);

        if (mrp && sellingPrice && mrp > 0 && sellingPrice > 0 && mrp > sellingPrice) {
            const discountPercent = ((mrp - sellingPrice) / mrp) * 100;
            const roundedDiscount = Math.round(discountPercent);
            return roundedDiscount.toString();
        } else if (sellingPrice && mrp && sellingPrice >= mrp) {
            return "0";
        }
        return newProduct.discount;
    };

    const getGSTRate = (category, productType) => {
        if (category === "Electronics") return 18;
        if (category === "Fashion") {
            const threePercent = ["Rings", "Necklaces", "Earrings", "Bracelets", "Pendants"];
            if (threePercent.includes(productType)) return 3;
            const fivePercent = ["Sarees", "Kurtis", "Tops", "Baby Clothing", "Slippers"];
            if (fivePercent.includes(productType)) return 5;
            if (productType === "Luxury Watches") return 28;
            const twelvePercent = ["T-Shirts", "Shirts", "Jeans", "Trousers", "Jackets", "Sweaters", "Innerwear", "Dresses"];
            if (twelvePercent.includes(productType)) return 12;
            return 18;
        }
        if (category === "Home & Kitchen") {
            const fivePercent = ["Bed Sheets"];
            if (fivePercent.includes(productType)) return 5;
            const twelvePercent = ["Wall Art", "Vases", "Candles", "Bulbs", "Pressure Cookers", "Comforters", "Pillows", "Blankets"];
            if (twelvePercent.includes(productType)) return 12;
            return 18;
        }
        if (category === "Beauty & Personal Care") return 18;
        if (category === "Books") return 0;
        if (category === "Toys & Games") {
            if (productType === "Drones") return 28;
            const eighteenPercent = ["RC Cars", "RC Helicopter", "RC Boat"];
            if (eighteenPercent.includes(productType)) return 18;
            return 12;
        }
        if (category === "Sports & Fitness") {
            const twelvePercent = ["Football", "Badminton Racket", "Shuttlecock", "Yoga Mat", "Yoga Blocks", "Bicycle"];
            if (twelvePercent.includes(productType)) return 12;
            return 18;
        }
        return 18;
    };

    const addFeature = () => {
        if (featureText.trim()) {
            setNewProduct({ ...newProduct, features: [...newProduct.features, featureText] });
            setFeatureText("");
        }
    };

    const removeFeature = (index) => {
        const updatedFeatures = newProduct.features.filter((_, i) => i !== index);
        setNewProduct({ ...newProduct, features: updatedFeatures });
    };

    const addVariant = () => {
        if (variantType && variantValue) {
            setVariants([...variants, { type: variantType, value: variantValue }]);
            setVariantType("");
            setVariantValue("");
        }
    };

    const removeVariant = (index) => {
        const updatedVariants = variants.filter((_, i) => i !== index);
        setVariants(updatedVariants);
    };

    const handleAddProduct = (e) => {
        e.preventDefault();

        if (!newProduct.title) {
            alert("Please enter product title!");
            return;
        }
        if (!newProduct.sellingPrice || Number(newProduct.sellingPrice) <= 0) {
            alert("Please enter valid selling price!");
            return;
        }
        if (!selectedCategory) {
            alert("Please select a category!");
            return;
        }
        if (!selectedSubCategory) {
            alert("Please select a subcategory!");
            return;
        }

        let finalPaymentMode = "Both";
        if (Number(newProduct.sellingPrice) > 5000) {
            finalPaymentMode = "Prepaid Only";
        } else {
            finalPaymentMode = newProduct.codAvailable === "Yes" ? "Both" : "Prepaid Only";
        }

        const pendingSeller = JSON.parse(localStorage.getItem("pendingSeller") || "{}");
        const sellerBasicInfo = JSON.parse(localStorage.getItem("sellerBasicInfo") || "{}");
        const sellerName = pendingSeller.name || sellerBasicInfo.storeName || "Azora Seller";
        const sellerId = pendingSeller.id || "SEL-001";

        const createdItem = {
            id: `AZ-PROD-${Date.now()}`,
            title: newProduct.title,
            brand: newProduct.brand,
            sku: newProduct.sku,
            price: Number(newProduct.sellingPrice),
            mrp: Number(newProduct.mrp) || Number(newProduct.sellingPrice),
            discount: newProduct.discount,
            stock: Number(newProduct.stockQuantity) || 0,
            category: selectedCategory,
            subCategory: selectedSubCategory,
            productType: selectedProductType,
            description: newProduct.description,
            features: newProduct.features,
            paymentMode: finalPaymentMode,
            returnAvailable: newProduct.returnAvailable,
            returnDays: newProduct.returnDays,
            warrantyPeriod: newProduct.warrantyPeriod,
            warrantyType: newProduct.warrantyType,
            codAvailable: Number(newProduct.sellingPrice) <= 5000 ? newProduct.codAvailable : "No",
            sellerName: sellerName,
            sellerId: sellerId,
            createdAt: new Date().toISOString(),
            image: newProduct.mainImage || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
        };

        const existingProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
        existingProducts.unshift(createdItem);
        localStorage.setItem("allProducts", JSON.stringify(existingProducts));

        alert("✅ Product listed successfully!");

        setNewProduct({
            title: "", brand: "", manufacturer: "", sku: "", description: "", features: [], tags: "",
            category: "", subCategory: "", productType: "",
            mainImage: null, galleryImages: [], videoUrl: "",
            mrp: "", sellingPrice: "", discount: "", specialOfferPrice: "",
            stockQuantity: "", minStockAlert: "", warehouse: "",
            weight: "", length: "", width: "", height: "", packageType: "",
            variants: [],
            returnAvailable: "No", returnDays: "", warrantyPeriod: "", warrantyType: "",
            codAvailable: "Yes", onlinePayment: "Yes", emiEligible: "No",
            specifications: {},
            gstNumber: "", brandAuthorization: "", invoiceDetails: "",
            searchKeywords: "", metaTitle: "", metaDescription: "",
            publishStatus: "Draft"
        });
        setSelectedCategory("");
        setSelectedSubCategory("");
        setSelectedProductType("");
        setVariants([]);

        // Refresh products list
        loadProductsFromStorage();
        setSellerTab("inventory");
    };

    const allSteps = [
        "Basic Info", "Category", "Images", "Pricing", "Inventory",
        "Shipping", "Variants", "Return", "Payment", "Specifications",
        "Documents", "SEO", "Publish"
    ];

    const styles = {
        primaryBtn: { backgroundColor: primaryColor, color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
        secondaryBtn: { backgroundColor: "#e2e8f0", color: "#333", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" },
        dangerBtn: { backgroundColor: "#dc2626", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" },
        successBtn: { backgroundColor: "#22c55e", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
        card: { backgroundColor: "white", borderRadius: "12px", padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
        input: { width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px" },
        label: { display: "block", marginBottom: "5px", fontWeight: "500", color: "#334155" },
        grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
        flexBetween: { display: "flex", justifyContent: "space-between", alignItems: "center" },
        flexCenter: { display: "flex", alignItems: "center", gap: "10px" },
        warningBox: { backgroundColor: "#fef3c7", padding: "10px", borderRadius: "8px", color: "#d97706", fontSize: "0.8rem" },
        successBox: { backgroundColor: "#f0fdf4", padding: "15px", borderRadius: "8px", border: "1px solid #bbf7d0" },
        stepButton: (isActive) => ({
            padding: "8px 16px",
            backgroundColor: isActive ? primaryColor : "#f1f5f9",
            color: isActive ? "white" : "#475569",
            border: "none", borderRadius: "25px", cursor: "pointer",
            fontSize: "0.75rem", fontWeight: isActive ? "bold" : "normal"
        })
    };

    // Calculate overview stats from actual products
    const totalProducts = myProducts.length;
    const totalStock = myProducts.reduce((sum, p) => sum + (p.stock || 0), 0);
    const lowStockCount = myProducts.filter(p => (p.stock || 0) < 5).length;

    return (
        <div className="admin-dashboard-layout">
            <aside className="admin-sidebar" style={{ backgroundColor: "#131921" }}>
                <div className="admin-sidebar-brand">Azora<span>Merchant Central</span></div>
                <div className="seller-status-sidebar-box" style={{ padding: "10px", margin: "0 0 20px 0", borderRadius: "6px", textAlign: "center", backgroundColor: "#dcfce7", color: "#15803d" }}>✅ STORE STATUS: APPROVED</div>
                <nav className="admin-sidebar-menu">
                    <button className={`admin-menu-btn ${sellerTab === "overview" ? "active" : ""}`} onClick={() => setSellerTab("overview")}><FaChartLine /> Overview</button>
                    <button className={`admin-menu-btn ${sellerTab === "add-product" ? "active" : ""}`} onClick={() => { setSellerTab("add-product"); setCurrentStep(1); }}><FaPlusCircle /> Add Product</button>
                    <button className={`admin-menu-btn ${sellerTab === "inventory" ? "active" : ""}`} onClick={() => { setSellerTab("inventory"); loadProductsFromStorage(); }}><FaBox /> Inventory</button>
                    <button className={`admin-menu-btn ${sellerTab === "orders" ? "active" : ""}`} onClick={() => setSellerTab("orders")}><FaShoppingCart /> Orders</button>
                </nav>
            </aside>

            <main className="admin-main-content">
                <header className="admin-content-header">
                    <h2>Welcome, Seller Partner</h2>
                    <p>Manage your business, inventory, and sales from one dashboard.</p>
                </header>

                {sellerTab === "overview" && (
                    <div>
                        <div className="admin-time-tracker-grid">
                            <div className="tracker-card" style={{ borderTop: `4px solid ${primaryColor}` }}>
                                <div className="tracker-card-header" style={{ color: primaryColor }}><FaRupeeSign /> Total Sales</div>
                                <div className="tracker-row"><span>Gross Sales:</span> <b>₹{myProducts.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0).toLocaleString()}</b></div>
                                <div className="tracker-row"><span>Items in Stock:</span> <b>{totalStock} Units</b></div>
                                <div className="tracker-footer-total" style={{ color: primaryColor }}>📊 Lifetime Performance</div>
                            </div>
                            <div className="tracker-card" style={{ borderTop: "4px solid #ea580c" }}>
                                <div className="tracker-card-header" style={{ color: "#ea580c" }}><FaStore /> Net Payout</div>
                                <div className="tracker-row"><span>Commission:</span> <b>2-12% Deduction</b></div>
                                <div className="tracker-row"><span>Estimated Net:</span> <b style={{ color: "#16a34a" }}>₹{(myProducts.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0) * 0.9).toLocaleString()}</b></div>
                                <div className="tracker-footer-total" style={{ color: "#ea580c" }}>💰 To your bank account</div>
                            </div>
                        </div>
                        <div className="admin-quick-stats-row" style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                            <div className="admin-mini-stat"><h4>{totalProducts}</h4><p>Total Products</p></div>
                            <div className="admin-mini-stat"><h4 style={{ color: "#ea580c" }}>{lowStockCount}</h4><p>Low Stock</p></div>
                            <div className="admin-mini-stat"><h4 style={{ color: primaryColor }}>{incomingOrders.length}</h4><p>New Orders</p></div>
                        </div>
                    </div>
                )}

                {sellerTab === "add-product" && (
                    // ... (keep your existing add-product JSX, it's too long to repeat but it's exactly the same)
                    <div className="admin-section-card" style={styles.card}>
                        <h3 className="admin-block-title" style={{ marginBottom: "20px", color: "#131921" }}>➕ Add New Product</h3>
                        <div style={{ display: "flex", marginBottom: "30px", flexWrap: "wrap", gap: "8px" }}>
                            {allSteps.map((step, idx) => {
                                if (!isSectionVisible(step)) return null;
                                return (<button key={idx} onClick={() => setCurrentStep(idx + 1)} style={styles.stepButton(currentStep === idx + 1)}>{step}</button>);
                            })}
                        </div>
                        <form onSubmit={handleAddProduct}>
                            {/* STEP 1 */}
                            {currentStep === 1 && isSectionVisible("Basic Info") && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <h4 style={{ color: primaryColor }}>📝 Basic Information</h4>
                                    <div><label style={styles.label}>Product Title <span style={{ color: "red" }}>*</span></label><input type="text" style={styles.input} value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} required placeholder="e.g., Apple iPhone 15 Pro Max" /></div>
                                    <div style={styles.grid}><div><label style={styles.label}>Brand Name</label><input type="text" style={styles.input} value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} placeholder="e.g., Apple, Samsung" /></div><div><label style={styles.label}>Manufacturer</label><input type="text" style={styles.input} value={newProduct.manufacturer} onChange={(e) => setNewProduct({ ...newProduct, manufacturer: e.target.value })} placeholder="Manufacturer name" /></div></div>
                                    <div style={styles.grid}><div><label style={styles.label}>SKU (Product Code)</label><input type="text" style={styles.input} value={newProduct.sku} onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })} placeholder="Unique product code" /></div><div><label style={styles.label}>Tags / Keywords</label><input type="text" style={styles.input} placeholder="Comma separated" value={newProduct.tags} onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })} /></div></div>
                                    <div><label style={styles.label}>Product Description</label><textarea rows="4" style={styles.input} value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="Detailed product description..." /></div>
                                    <div><label style={styles.label}>Key Features</label>
                                        <div style={styles.flexCenter}><input type="text" style={{ ...styles.input, flex: 1 }} value={featureText} onChange={(e) => setFeatureText(e.target.value)} placeholder="e.g., Noise Cancellation" /><button type="button" onClick={addFeature} style={styles.primaryBtn}><FaPlus /> Add</button></div>
                                        <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "8px" }}>{newProduct.features.map((f, i) => (<span key={i} style={{ background: "#e2e8f0", padding: "6px 12px", borderRadius: "20px" }}>✓ {f} <button type="button" onClick={() => removeFeature(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626" }}>×</button></span>))}</div>
                                    </div>
                                    <div style={styles.flexBetween}><button type="button" onClick={() => setCurrentStep(2)} style={styles.primaryBtn}>Next →</button></div>
                                </div>
                            )}

                            {/* STEP 2 */}
                            {currentStep === 2 && isSectionVisible("Category") && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <h4 style={{ color: primaryColor }}>📂 Category Selection</h4>
                                    <div><label style={styles.label}>Main Category *</label>
                                        <div style={{ position: "relative" }}>
                                            <div onClick={() => setIsCategoryOpen(!isCategoryOpen)} style={{ ...styles.input, cursor: "pointer", display: "flex", justifyContent: "space-between" }}><span>{selectedCategory || "Select Category"}</span><FaCaretDown /></div>
                                            {isCategoryOpen && (<div style={{ position: "absolute", top: "100%", left: 0, right: 0, backgroundColor: "white", border: "1px solid #cbd5e1", borderRadius: "8px", maxHeight: "250px", overflowY: "auto", zIndex: 10, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>{categories.map((cat, idx) => (<div key={idx} onClick={() => handleCategorySelect(cat.name)} style={{ padding: "10px 12px", cursor: "pointer", borderBottom: "1px solid #e2e8f0" }}>{cat.name}</div>))}</div>)}
                                        </div>
                                    </div>
                                    {selectedCategory && (<div><label style={styles.label}>Sub Category *</label>
                                        <div style={{ position: "relative" }}>
                                            <div onClick={() => setIsSubCategoryOpen(!isSubCategoryOpen)} style={{ ...styles.input, cursor: "pointer", display: "flex", justifyContent: "space-between" }}><span>{selectedSubCategory || "Select Sub Category"}</span><FaCaretDown /></div>
                                            {isSubCategoryOpen && (<div style={{ position: "absolute", top: "100%", left: 0, right: 0, backgroundColor: "white", border: "1px solid #cbd5e1", borderRadius: "8px", maxHeight: "200px", overflowY: "auto", zIndex: 10 }}>{getSubCategories().map((sub, idx) => (<div key={idx} onClick={() => handleSubCategorySelect(sub.name)} style={{ padding: "10px 12px", cursor: "pointer", borderBottom: "1px solid #e2e8f0" }}>{sub.name}</div>))}</div>)}
                                        </div>
                                    </div>)}
                                    {selectedSubCategory && (<div><label style={styles.label}>Product Type *</label>
                                        <div style={{ position: "relative" }}>
                                            <div onClick={() => setIsProductTypeOpen(!isProductTypeOpen)} style={{ ...styles.input, cursor: "pointer", display: "flex", justifyContent: "space-between" }}><span>{selectedProductType || "Select Product Type"}</span><FaCaretDown /></div>
                                            {isProductTypeOpen && (<div style={{ position: "absolute", top: "100%", left: 0, right: 0, backgroundColor: "white", border: "1px solid #cbd5e1", borderRadius: "8px", maxHeight: "200px", overflowY: "auto", zIndex: 10 }}>{getProductTypes().map((type, idx) => (<div key={idx} onClick={() => handleProductTypeSelect(type)} style={{ padding: "10px 12px", cursor: "pointer", borderBottom: "1px solid #e2e8f0" }}>{type}</div>))}</div>)}
                                        </div>
                                    </div>)}
                                    <div style={styles.flexBetween}><button type="button" onClick={() => setCurrentStep(1)} style={styles.secondaryBtn}>← Back</button><button type="button" onClick={() => setCurrentStep(3)} style={styles.primaryBtn}>Next →</button></div>
                                </div>
                            )}

                            {/* STEP 3 - Updated with Multiple Images */}
                            {currentStep === 3 && isSectionVisible("Images") && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <h4 style={{ color: primaryColor }}>🖼️ Images & Media</h4>

                                    {/* Main Image Upload */}
                                    <div>
                                        <label style={styles.label}>Main Product Image *</label>
                                        <div style={{ border: "2px dashed #cbd5e1", borderRadius: "12px", padding: "30px", textAlign: "center" }}>
                                            {newProduct.mainImage ? (
                                                <div>
                                                    <img src={newProduct.mainImage} alt="Main" style={{ maxWidth: "100%", maxHeight: "180px" }} />
                                                    <button type="button" onClick={() => setNewProduct({ ...newProduct, mainImage: null })} style={styles.dangerBtn}>Remove</button>
                                                </div>
                                            ) : (
                                                <label style={{ cursor: "pointer", display: "block" }}>
                                                    <FaUpload style={{ fontSize: "2.5rem", color: "#94a3b8" }} />
                                                    <span>Click to upload main image</span>
                                                    <input type="file" accept="image/*" onChange={handleMainImageChange} style={{ display: "none" }} />
                                                </label>
                                            )}
                                        </div>
                                    </div>

                                    {/* NEW: Multiple Gallery Images Upload */}
                                    <div>
                                        <label style={styles.label}>Gallery Images (Multiple)</label>
                                        <div style={{ border: "2px dashed #cbd5e1", borderRadius: "12px", padding: "30px", textAlign: "center" }}>
                                            <label style={{ cursor: "pointer", display: "block" }}>
                                                <FaImage style={{ fontSize: "2.5rem", color: "#94a3b8" }} />
                                                <span>Click to upload multiple images (Select multiple files)</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleGalleryImagesChange}
                                                    style={{ display: "none" }}
                                                />
                                            </label>
                                        </div>

                                        {/* Display Gallery Images */}
                                        {newProduct.galleryImages.length > 0 && (
                                            <div style={{ marginTop: "15px" }}>
                                                <label style={styles.label}>Uploaded Images ({newProduct.galleryImages.length})</label>
                                                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                                                    {newProduct.galleryImages.map((img, idx) => (
                                                        <div key={idx} style={{ position: "relative", width: "100px", height: "100px" }}>
                                                            <img src={img} alt={`Gallery ${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeGalleryImage(idx)}
                                                                style={{ position: "absolute", top: "-8px", right: "-8px", backgroundColor: "#dc2626", color: "white", border: "none", borderRadius: "50%", width: "22px", height: "22px", cursor: "pointer", fontSize: "12px" }}
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Video URL (Optional) */}
                                    <div>
                                        <label style={styles.label}>Product Video URL</label>
                                        <input type="text" style={styles.input} placeholder="https://youtube.com/watch?v=..." value={newProduct.videoUrl} onChange={(e) => setNewProduct({ ...newProduct, videoUrl: e.target.value })} />
                                    </div>

                                    <div style={styles.flexBetween}>
                                        <button type="button" onClick={() => setCurrentStep(2)} style={styles.secondaryBtn}>← Back</button>
                                        <button type="button" onClick={() => setCurrentStep(4)} style={styles.primaryBtn}>Next →</button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 4 - Pricing with Auto Discount (Fully Fixed) */}
                            {currentStep === 4 && isSectionVisible("Pricing") && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <h4 style={{ color: primaryColor }}>💰 Pricing</h4>

                                    {/* MRP Input */}
                                    <div>
                                        <label style={styles.label}>MRP (Original Price)</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            style={styles.input}
                                            placeholder=""
                                            value={newProduct.mrp}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');

                                                setNewProduct(prev => ({
                                                    ...prev,
                                                    mrp: value
                                                }));

                                                if (!value || value === "0") {
                                                    setNewProduct(prev => ({
                                                        ...prev,
                                                        discount: "0"
                                                    }));
                                                }
                                                else if (newProduct.sellingPrice && value) {
                                                    const mrpNum = parseFloat(value);
                                                    const spNum = parseFloat(newProduct.sellingPrice);
                                                    if (mrpNum > 0 && spNum > 0 && mrpNum > spNum) {
                                                        const discountPercent = ((mrpNum - spNum) / mrpNum) * 100;
                                                        setNewProduct(prev => ({
                                                            ...prev,
                                                            discount: Math.round(discountPercent).toString()
                                                        }));
                                                    } else if (spNum >= mrpNum || spNum === 0) {
                                                        setNewProduct(prev => ({
                                                            ...prev,
                                                            discount: "0"
                                                        }));
                                                    }
                                                }
                                            }}
                                        />
                                    </div>


                                    {/* Selling Price & Include GST - Two Boxes in One Line */}
                                    <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>

                                        {/* Selling Price Input - 50% Width */}
                                        <div style={{ width: "50%" }}>
                                            <label style={styles.label}>Selling Price * (Your Price)</label>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                style={styles.input}
                                                placeholder=""
                                                value={newProduct.sellingPrice}
                                                required
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                                    setNewProduct(prev => ({ ...prev, sellingPrice: value }));

                                                    if (!value || value === "0") {
                                                        setNewProduct(prev => ({ ...prev, discount: "0" }));
                                                    }
                                                    else if (newProduct.mrp && value) {
                                                        const mrpNum = parseFloat(newProduct.mrp);
                                                        const spNum = parseFloat(value);
                                                        if (mrpNum > 0 && spNum > 0 && mrpNum > spNum) {
                                                            const discountPercent = ((mrpNum - spNum) / mrpNum) * 100;
                                                            setNewProduct(prev => ({ ...prev, discount: Math.round(discountPercent).toString() }));
                                                        } else if (spNum >= mrpNum || mrpNum === 0) {
                                                            setNewProduct(prev => ({ ...prev, discount: "0" }));
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>

                                        {/* Include GST Box - 50% Width (Fixed Height to Match) */}
                                        <div style={{ width: "50%" }}>
                                            <label style={styles.label}>Include GST (Tax)</label>
                                            <div style={{
                                                ...styles.input,
                                                backgroundColor: "#ffffff",
                                                border: "1px solid #cbd5e1",
                                                borderRadius: "8px",
                                                padding: "10px 12px",
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                color: "#1e293b",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                cursor: "default",
                                                minHeight: "42px",
                                                boxSizing: "border-box"
                                            }}>
                                                {(() => {
                                                    const sellingPrice = Number(newProduct.sellingPrice) || 0;
                                                    const gstRate = (selectedCategory && selectedProductType) ? getGSTRate(selectedCategory, selectedProductType) : 0;
                                                    const finalPrice = sellingPrice + (sellingPrice * gstRate) / 100;

                                                    if (sellingPrice > 0 && selectedCategory && selectedProductType && gstRate > 0) {
                                                        return (
                                                            <>
                                                                <span>₹{sellingPrice.toFixed(2)} + {gstRate}% GST</span>
                                                                <span style={{ fontSize: "16px", fontWeight: "bold", color: "#ea580c" }}>
                                                                    = ₹{finalPrice.toFixed(2)}
                                                                </span>
                                                            </>
                                                        );
                                                    } else if (sellingPrice > 0 && selectedCategory && selectedProductType && gstRate === 0) {
                                                        return (
                                                            <>
                                                                <span>₹{sellingPrice.toFixed(2)} + 0% GST (Exempt)</span>
                                                                <span style={{ fontSize: "16px", fontWeight: "bold", color: "#16a34a" }}>
                                                                    = ₹{sellingPrice.toFixed(2)}
                                                                </span>
                                                            </>
                                                        );
                                                    } else {
                                                        return <span style={{ color: "#94a3b8" }}>—</span>;
                                                    }
                                                })()}
                                            </div>
                                            {selectedCategory && selectedProductType && newProduct.sellingPrice && Number(newProduct.sellingPrice) > 0 && (
                                                <div style={{ marginTop: "5px", fontSize: "11px", color: "#64748b" }}>
                                                    Customer will pay ₹{(Number(newProduct.sellingPrice) + (Number(newProduct.sellingPrice) * getGSTRate(selectedCategory, selectedProductType) / 100)).toFixed(2)} including {getGSTRate(selectedCategory, selectedProductType)}% GST
                                                </div>
                                            )}
                                        </div>
                                    </div>


                                    {/* Discount Display */}
                                    <div>
                                        <label style={styles.label}>Discount % (Auto-calculated)</label>
                                        <input
                                            type="text"
                                            style={{ ...styles.input, backgroundColor: "#FFFFFF", fontWeight: "bold", color: "#000000" }}
                                            placeholder=""
                                            value={newProduct.discount || "0"}
                                            readOnly
                                            disabled
                                        />
                                        {newProduct.mrp && newProduct.sellingPrice &&
                                            Number(newProduct.mrp) > 0 && Number(newProduct.sellingPrice) > 0 &&
                                            Number(newProduct.mrp) > Number(newProduct.sellingPrice) && (
                                                <div style={{ marginTop: "8px", fontSize: "13px", color: "#000000", fontWeight: "500" }}>
                                                    🎉 Customer saves ₹{Number(newProduct.mrp) - Number(newProduct.sellingPrice)}!
                                                </div>
                                            )}
                                    </div>


                                    {/* COD Warning */}
                                    {newProduct.sellingPrice && Number(newProduct.sellingPrice) > 5000 && (
                                        <div style={styles.warningBox}>
                                            ⚠️ Price above ₹5000. COD will be disabled automatically!
                                        </div>
                                    )}

                                    {/* ========== SETTLEMENT BREAKDOWN - 2 COLUMNS (50% WIDTH EACH) ========== */}
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>

                                        {/* Customer Pays - 50% Width */}
                                        <div style={{ width: "calc(50% - 10px)" }}>
                                            <label style={styles.label}>Customer Pays</label>
                                            <div style={{
                                                ...styles.input,
                                                backgroundColor: "#f8fafc",
                                                border: "1px solid #cbd5e1",
                                                borderRadius: "8px",
                                                padding: "10px 12px",
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                color: "#1e293b"
                                            }}>
                                                {(() => {
                                                    const sellingPrice = Number(newProduct.sellingPrice) || 0;
                                                    const gstRate = (selectedCategory && selectedProductType) ? getGSTRate(selectedCategory, selectedProductType) : 0;
                                                    const customerPays = sellingPrice + (sellingPrice * gstRate) / 100;
                                                    return sellingPrice > 0 ? `₹${customerPays.toFixed(2)}` : `—`;
                                                })()}
                                            </div>
                                        </div>

                                        {/* Commission (2%) - 50% Width */}
                                        <div style={{ width: "calc(50% - 10px)" }}>
                                            <label style={styles.label}>Commission (2%)</label>
                                            <div style={{
                                                ...styles.input,
                                                backgroundColor: "#f8fafc",
                                                border: "1px solid #cbd5e1",
                                                borderRadius: "8px",
                                                padding: "10px 12px",
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                color: "#1e293b"
                                            }}>
                                                {(() => {
                                                    const sellingPrice = Number(newProduct.sellingPrice) || 0;
                                                    // ✅ Commission calculated on Customer Pays (Selling Price + GST)
                                                    const gstRate = (selectedCategory && selectedProductType) ? getGSTRate(selectedCategory, selectedProductType) : 18;
                                                    const customerPays = sellingPrice + (sellingPrice * gstRate) / 100;
                                                    const commission = (customerPays * 2) / 100;
                                                    return sellingPrice > 0 ? `₹${commission.toFixed(2)}` : `—`;
                                                })()}
                                            </div>
                                        </div>

                                        {/* Pick & Pack Fee - 50% Width */}
                                        <div style={{ width: "calc(50% - 10px)" }}>
                                            <label style={styles.label}>Pick & Pack Fee</label>
                                            <div style={{
                                                ...styles.input,
                                                backgroundColor: "#f8fafc",
                                                border: "1px solid #cbd5e1",
                                                borderRadius: "8px",
                                                padding: "10px 12px",
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                color: "#1e293b"
                                            }}>
                                                {(() => {
                                                    const weight = Number(newProduct.weight) || 0.5;
                                                    let fee = 15;
                                                    if (weight <= 0.5) fee = 15;
                                                    else if (weight <= 1) fee = 25;
                                                    else if (weight <= 2) fee = 40;
                                                    else if (weight <= 5) fee = 60;
                                                    else if (weight <= 10) fee = 100;
                                                    else if (weight <= 20) fee = 180;
                                                    else fee = 300;
                                                    return Number(newProduct.sellingPrice) > 0 ? `₹${fee.toFixed(2)}` : `—`;
                                                })()}
                                            </div>
                                        </div>

                                        {/* Closing Fee - 50% Width */}
                                        <div style={{ width: "calc(50% - 10px)" }}>
                                            <label style={styles.label}>Closing Fee</label>
                                            <div style={{
                                                ...styles.input,
                                                backgroundColor: "#f8fafc",
                                                border: "1px solid #cbd5e1",
                                                borderRadius: "8px",
                                                padding: "10px 12px",
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                color: "#1e293b"
                                            }}>
                                                {(() => {
                                                    const sellingPrice = Number(newProduct.sellingPrice) || 0;
                                                    let fee = 6;
                                                    if (sellingPrice >= 50000) fee = 50;
                                                    else if (sellingPrice >= 25000) fee = 40;
                                                    else if (sellingPrice >= 10000) fee = 30;
                                                    else if (sellingPrice >= 5000) fee = 20;
                                                    else if (sellingPrice >= 1000) fee = 16;
                                                    else if (sellingPrice >= 500) fee = 10;
                                                    else fee = 6;
                                                    return sellingPrice > 0 ? `₹${fee.toFixed(2)}` : `—`;
                                                })()}
                                            </div>
                                        </div>

                                        {/* Shipping Fee - 50% Width */}
                                        <div style={{ width: "calc(50% - 10px)" }}>
                                            <label style={styles.label}>Shipping Fee</label>
                                            <div style={{
                                                ...styles.input,
                                                backgroundColor: "#f8fafc",
                                                border: "1px solid #cbd5e1",
                                                borderRadius: "8px",
                                                padding: "10px 12px",
                                                fontSize: "14px",
                                                fontWeight: "500",
                                                color: "#1e293b"
                                            }}>
                                                {(() => {
                                                    const weight = Number(newProduct.weight) || 0.5;
                                                    let fee = 40;
                                                    if (weight <= 0.5) fee = 40;
                                                    else if (weight <= 1) fee = 60;
                                                    else if (weight <= 2) fee = 80;
                                                    else if (weight <= 5) fee = 120;
                                                    else if (weight <= 10) fee = 180;
                                                    else fee = 250;
                                                    return Number(newProduct.sellingPrice) > 0 ? `₹${fee.toFixed(2)}` : `—`;
                                                })()}
                                            </div>
                                        </div>

                                        {/* Charges Total - 50% Width */}
                                        <div style={{ width: "calc(50% - 10px)" }}>
                                            <label style={styles.label}>Charges Total</label>
                                            <div style={{
                                                ...styles.input,
                                                backgroundColor: "#fef3c7",
                                                border: "1px solid #f59e0b",
                                                borderRadius: "8px",
                                                padding: "10px 12px",
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                color: "#d97706"
                                            }}>
                                                {(() => {
                                                    const sellingPrice = Number(newProduct.sellingPrice) || 0;
                                                    const weight = Number(newProduct.weight) || 0.5;

                                                    // ✅ Commission on Customer Pays basis
                                                    const gstRateForCommission = (selectedCategory && selectedProductType) ? getGSTRate(selectedCategory, selectedProductType) : 18;
                                                    const customerPaysForCommission = sellingPrice + (sellingPrice * gstRateForCommission) / 100;
                                                    const commission = (customerPaysForCommission * 2) / 100;

                                                    // Pick & Pack Fee
                                                    let pickPack = 15;
                                                    if (weight <= 0.5) pickPack = 15;
                                                    else if (weight <= 1) pickPack = 25;
                                                    else if (weight <= 2) pickPack = 40;
                                                    else if (weight <= 5) pickPack = 60;
                                                    else if (weight <= 10) pickPack = 100;
                                                    else if (weight <= 20) pickPack = 180;
                                                    else pickPack = 300;

                                                    // Closing Fee
                                                    let closing = 6;
                                                    if (sellingPrice >= 50000) closing = 50;
                                                    else if (sellingPrice >= 25000) closing = 40;
                                                    else if (sellingPrice >= 10000) closing = 30;
                                                    else if (sellingPrice >= 5000) closing = 20;
                                                    else if (sellingPrice >= 1000) closing = 16;
                                                    else if (sellingPrice >= 500) closing = 10;
                                                    else closing = 6;

                                                    // Shipping Fee
                                                    let shipping = 40;
                                                    if (weight <= 0.5) shipping = 40;
                                                    else if (weight <= 1) shipping = 60;
                                                    else if (weight <= 2) shipping = 80;
                                                    else if (weight <= 5) shipping = 120;
                                                    else if (weight <= 10) shipping = 180;
                                                    else shipping = 250;

                                                    const chargesTotal = commission + pickPack + closing + shipping;
                                                    return sellingPrice > 0 ? `₹${chargesTotal.toFixed(2)}` : `—`;
                                                })()}
                                            </div>
                                        </div>

                                        {/* GST on Charges (18%) - 50% Width */}
                                        <div style={{ width: "calc(50% - 10px)" }}>
                                            <label style={styles.label}>GST on Charges (18%)</label>
                                            <div style={{
                                                ...styles.input,
                                                backgroundColor: "#fef3c7",
                                                border: "1px solid #f59e0b",
                                                borderRadius: "8px",
                                                padding: "10px 12px",
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                color: "#d97706"
                                            }}>
                                                {(() => {
                                                    const sellingPrice = Number(newProduct.sellingPrice) || 0;
                                                    const weight = Number(newProduct.weight) || 0.5;

                                                    // ✅ Commission on Customer Pays basis
                                                    const gstRateForCommission = (selectedCategory && selectedProductType) ? getGSTRate(selectedCategory, selectedProductType) : 18;
                                                    const customerPaysForCommission = sellingPrice + (sellingPrice * gstRateForCommission) / 100;
                                                    const commission = (customerPaysForCommission * 2) / 100;

                                                    // Pick & Pack Fee
                                                    let pickPack = 15;
                                                    if (weight <= 0.5) pickPack = 15;
                                                    else if (weight <= 1) pickPack = 25;
                                                    else if (weight <= 2) pickPack = 40;
                                                    else if (weight <= 5) pickPack = 60;
                                                    else if (weight <= 10) pickPack = 100;
                                                    else if (weight <= 20) pickPack = 180;
                                                    else pickPack = 300;

                                                    // Closing Fee
                                                    let closing = 6;
                                                    if (sellingPrice >= 50000) closing = 50;
                                                    else if (sellingPrice >= 25000) closing = 40;
                                                    else if (sellingPrice >= 10000) closing = 30;
                                                    else if (sellingPrice >= 5000) closing = 20;
                                                    else if (sellingPrice >= 1000) closing = 16;
                                                    else if (sellingPrice >= 500) closing = 10;
                                                    else closing = 6;

                                                    // Shipping Fee
                                                    let shipping = 40;
                                                    if (weight <= 0.5) shipping = 40;
                                                    else if (weight <= 1) shipping = 60;
                                                    else if (weight <= 2) shipping = 80;
                                                    else if (weight <= 5) shipping = 120;
                                                    else if (weight <= 10) shipping = 180;
                                                    else shipping = 250;

                                                    const chargesTotal = commission + pickPack + closing + shipping;
                                                    const gst = (chargesTotal * 18) / 100;
                                                    return sellingPrice > 0 ? `₹${gst.toFixed(2)}` : `—`;
                                                })()}
                                            </div>
                                        </div>

                                        {/* Total Charges - 50% Width */}
                                        <div style={{ width: "calc(50% - 10px)" }}>
                                            <label style={styles.label}>Total Charges</label>
                                            <div style={{
                                                ...styles.input,
                                                backgroundColor: "#fee2e2",
                                                border: "1px solid #dc2626",
                                                borderRadius: "8px",
                                                padding: "10px 12px",
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                                color: "#dc2626"
                                            }}>
                                                {(() => {
                                                    const sellingPrice = Number(newProduct.sellingPrice) || 0;
                                                    const weight = Number(newProduct.weight) || 0.5;

                                                    // ✅ Commission on Customer Pays basis
                                                    const gstRateForCommission = (selectedCategory && selectedProductType) ? getGSTRate(selectedCategory, selectedProductType) : 18;
                                                    const customerPaysForCommission = sellingPrice + (sellingPrice * gstRateForCommission) / 100;
                                                    const commission = (customerPaysForCommission * 2) / 100;

                                                    // Pick & Pack Fee
                                                    let pickPack = 15;
                                                    if (weight <= 0.5) pickPack = 15;
                                                    else if (weight <= 1) pickPack = 25;
                                                    else if (weight <= 2) pickPack = 40;
                                                    else if (weight <= 5) pickPack = 60;
                                                    else if (weight <= 10) pickPack = 100;
                                                    else if (weight <= 20) pickPack = 180;
                                                    else pickPack = 300;

                                                    // Closing Fee
                                                    let closing = 6;
                                                    if (sellingPrice >= 50000) closing = 50;
                                                    else if (sellingPrice >= 25000) closing = 40;
                                                    else if (sellingPrice >= 10000) closing = 30;
                                                    else if (sellingPrice >= 5000) closing = 20;
                                                    else if (sellingPrice >= 1000) closing = 16;
                                                    else if (sellingPrice >= 500) closing = 10;
                                                    else closing = 6;

                                                    // Shipping Fee
                                                    let shipping = 40;
                                                    if (weight <= 0.5) shipping = 40;
                                                    else if (weight <= 1) shipping = 60;
                                                    else if (weight <= 2) shipping = 80;
                                                    else if (weight <= 5) shipping = 120;
                                                    else if (weight <= 10) shipping = 180;
                                                    else shipping = 250;

                                                    const chargesTotal = commission + pickPack + closing + shipping;
                                                    const gst = (chargesTotal * 18) / 100;
                                                    const totalCharges = chargesTotal + gst;
                                                    return sellingPrice > 0 ? `₹${totalCharges.toFixed(2)}` : `—`;
                                                })()}
                                            </div>
                                        </div>

                                        {/* Seller Receives - 50% Width */}
                                        <div style={{ width: "calc(50% - 10px)" }}>
                                            <label style={styles.label}>Seller Receives</label>
                                            <div style={{
                                                ...styles.input,
                                                backgroundColor: "#dcfce7",
                                                border: "1px solid #16a34a",
                                                borderRadius: "8px",
                                                padding: "10px 12px",
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                                color: "#16a34a"
                                            }}>
                                                {(() => {
                                                    const sellingPrice = Number(newProduct.sellingPrice) || 0;
                                                    const weight = Number(newProduct.weight) || 0.5;

                                                    // GST Rate for Commission (Customer Pays basis)
                                                    const gstRateForCommission = (selectedCategory && selectedProductType) ? getGSTRate(selectedCategory, selectedProductType) : 18;
                                                    const customerPaysForCommission = sellingPrice + (sellingPrice * gstRateForCommission) / 100;

                                                    // ✅ Commission calculated on Customer Pays (Selling Price + GST)
                                                    const commission = (customerPaysForCommission * 2) / 100;

                                                    // Pick & Pack Fee
                                                    let pickPack = 15;
                                                    if (weight <= 0.5) pickPack = 15;
                                                    else if (weight <= 1) pickPack = 25;
                                                    else if (weight <= 2) pickPack = 40;
                                                    else if (weight <= 5) pickPack = 60;
                                                    else if (weight <= 10) pickPack = 100;
                                                    else if (weight <= 20) pickPack = 180;
                                                    else pickPack = 300;

                                                    // Closing Fee (based on Selling Price)
                                                    let closing = 6;
                                                    if (sellingPrice >= 50000) closing = 50;
                                                    else if (sellingPrice >= 25000) closing = 40;
                                                    else if (sellingPrice >= 10000) closing = 30;
                                                    else if (sellingPrice >= 5000) closing = 20;
                                                    else if (sellingPrice >= 1000) closing = 16;
                                                    else if (sellingPrice >= 500) closing = 10;
                                                    else closing = 6;

                                                    // Shipping Fee
                                                    let shipping = 40;
                                                    if (weight <= 0.5) shipping = 40;
                                                    else if (weight <= 1) shipping = 60;
                                                    else if (weight <= 2) shipping = 80;
                                                    else if (weight <= 5) shipping = 120;
                                                    else if (weight <= 10) shipping = 180;
                                                    else shipping = 250;

                                                    const chargesTotal = commission + pickPack + closing + shipping;
                                                    const gst = (chargesTotal * 18) / 100;
                                                    const totalCharges = chargesTotal + gst;
                                                    const sellerReceives = sellingPrice - totalCharges;
                                                    return sellingPrice > 0 ? `₹${sellerReceives.toFixed(2)}` : `—`;
                                                })()}
                                            </div>
                                        </div>

                                    </div>
                                    {/* ========== INVOICE DETAILS SECTION (Flipkart Style) ========== */}

                                    {/* Invoice Header - 100% Width */}
                                    <div style={{
                                        backgroundColor: "#f8fafc",
                                        padding: "15px",
                                        borderRadius: "8px",
                                        border: "1px solid #e2e8f0",
                                        marginTop: "20px"
                                    }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
                                            <div>
                                                <div style={{ fontSize: "11px", color: "#64748b" }}>INVOICE NUMBER</div>
                                                <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                                                    AZ-INV-{new Date().getFullYear()}{String(new Date().getMonth() + 1).padStart(2, '0')}{String(new Date().getDate()).padStart(2, '0')}-{Math.floor(Math.random() * 10000)}
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: "11px", color: "#64748b" }}>IRN (e-Invoice)</div>
                                                <div style={{ fontSize: "11px", fontFamily: "monospace" }}>
                                                    {Math.random().toString(36).substring(2, 15)}{Math.random().toString(36).substring(2, 15)}
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: "11px", color: "#64748b" }}>ORDER ID</div>
                                                <div style={{ fontWeight: "bold" }}>ORD-{Math.floor(Math.random() * 10000)}</div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: "11px", color: "#64748b" }}>DATE</div>
                                                <div>{new Date().toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Seller Details - 100% Width */}
                                    <div style={{
                                        backgroundColor: "#f8fafc",
                                        padding: "15px",
                                        borderRadius: "8px",
                                        border: "1px solid #e2e8f0"
                                    }}>
                                        <div style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "13px" }}>🏢 Seller Information</div>
                                        <div style={{ fontSize: "11px", lineHeight: "1.6" }}>
                                            <div><strong>Sold By:</strong> {JSON.parse(localStorage.getItem("sellerBasicInfo"))?.storeName || "Azora Seller"}</div>
                                            <div><strong>GSTIN:</strong> {JSON.parse(localStorage.getItem("sellerBasicInfo"))?.gstinNumber || "Not Registered"}</div>
                                            <div><strong>PAN:</strong> {JSON.parse(localStorage.getItem("sellerBasicInfo"))?.panNumber || "Not Available"}</div>
                                            <div><strong>Address:</strong> {JSON.parse(localStorage.getItem("sellerBasicInfo"))?.businessAddress || "Business address not added"}</div>
                                        </div>
                                    </div>

                                    {/* Customer Details - 50% + 50% */}
                                    <div style={{ display: "flex", gap: "20px" }}>
                                        <div style={{
                                            width: "50%",
                                            backgroundColor: "#f8fafc",
                                            padding: "15px",
                                            borderRadius: "8px",
                                            border: "1px solid #e2e8f0"
                                        }}>
                                            <div style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "13px" }}>👤 Bill To</div>
                                            <div style={{ fontSize: "11px", lineHeight: "1.6" }}>
                                                <div><strong>Name:</strong> Customer Name</div>
                                                <div><strong>Address:</strong> Customer Address</div>
                                                <div><strong>Phone:</strong> XXXXXXXX</div>
                                            </div>
                                        </div>
                                        <div style={{
                                            width: "50%",
                                            backgroundColor: "#f8fafc",
                                            padding: "15px",
                                            borderRadius: "8px",
                                            border: "1px solid #e2e8f0"
                                        }}>
                                            <div style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "13px" }}>🚚 Ship To</div>
                                            <div style={{ fontSize: "11px", lineHeight: "1.6" }}>
                                                <div><strong>Name:</strong> Customer Name</div>
                                                <div><strong>Address:</strong> Customer Address</div>
                                                <div><strong>Phone:</strong> XXXXXXXX</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Product Details Table - 100% Width */}
                                    <div style={{
                                        backgroundColor: "#f8fafc",
                                        padding: "15px",
                                        borderRadius: "8px",
                                        border: "1px solid #e2e8f0",
                                        overflowX: "auto"
                                    }}>
                                        <div style={{ fontWeight: "bold", marginBottom: "10px", fontSize: "13px" }}>📦 Product Details</div>
                                        <table style={{ width: "100%", fontSize: "11px", borderCollapse: "collapse" }}>
                                            <thead>
                                                <tr>
                                                    <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #cbd5e1" }}>Product</th>
                                                    <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #cbd5e1" }}>HSN/SAC</th>
                                                    <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #cbd5e1" }}>IMEI/Serial</th>
                                                    <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #cbd5e1" }}>Warranty</th>
                                                    <th style={{ textAlign: "center", padding: "8px", borderBottom: "1px solid #cbd5e1" }}>Qty</th>
                                                    <th style={{ textAlign: "right", padding: "8px", borderBottom: "1px solid #cbd5e1" }}>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{ padding: "8px", borderBottom: "1px solid #e2e8f0" }}>{newProduct.title || "Product Name"}</td>
                                                    <td style={{ padding: "8px", borderBottom: "1px solid #e2e8f0" }}>85171300</td>
                                                    <td style={{ padding: "8px", borderBottom: "1px solid #e2e8f0" }}>{selectedCategory === "Electronics" ? "XXXX-XXXX-XXXX-XXX" : "—"}</td>
                                                    <td style={{ padding: "8px", borderBottom: "1px solid #e2e8f0" }}>{newProduct.warrantyPeriod || "No warranty"}</td>
                                                    <td style={{ textAlign: "center", padding: "8px", borderBottom: "1px solid #e2e8f0" }}>1</td>
                                                    <td style={{ textAlign: "right", padding: "8px", borderBottom: "1px solid #e2e8f0", fontWeight: "bold" }}>₹{Number(newProduct.sellingPrice || 0).toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Charges Summary - 50% + 50% */}
                                    <div style={{ display: "flex", gap: "20px" }}>
                                        <div style={{ width: "50%" }}>
                                            <div style={{
                                                backgroundColor: "#f8fafc",
                                                padding: "15px",
                                                borderRadius: "8px",
                                                border: "1px solid #e2e8f0"
                                            }}>
                                                <div style={{ fontWeight: "bold", marginBottom: "10px", fontSize: "13px" }}>💰 Charges Summary</div>
                                                <div style={{ fontSize: "12px", lineHeight: "1.8" }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <span>Commission (2%):</span>
                                                        <span>₹{(() => {
                                                            const sp = Number(newProduct.sellingPrice) || 0;
                                                            const gst = (selectedCategory && selectedProductType) ? getGSTRate(selectedCategory, selectedProductType) : 18;
                                                            const customerPays = sp + (sp * gst) / 100;
                                                            return ((customerPays * 2) / 100).toFixed(2);
                                                        })()}</span>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <span>Pick & Pack Fee:</span>
                                                        <span>₹{(() => {
                                                            const w = Number(newProduct.weight) || 0.5;
                                                            if (w <= 0.5) return "15.00";
                                                            if (w <= 1) return "25.00";
                                                            if (w <= 2) return "40.00";
                                                            if (w <= 5) return "60.00";
                                                            return "100.00";
                                                        })()}</span>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <span>Closing Fee:</span>
                                                        <span>₹{(() => {
                                                            const sp = Number(newProduct.sellingPrice) || 0;
                                                            if (sp >= 50000) return "50.00";
                                                            if (sp >= 25000) return "40.00";
                                                            if (sp >= 10000) return "30.00";
                                                            if (sp >= 5000) return "20.00";
                                                            if (sp >= 1000) return "16.00";
                                                            if (sp >= 500) return "10.00";
                                                            return "6.00";
                                                        })()}</span>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <span>Shipping Fee:</span>
                                                        <span>₹{(() => {
                                                            const w = Number(newProduct.weight) || 0.5;
                                                            if (w <= 0.5) return "40.00";
                                                            if (w <= 1) return "60.00";
                                                            if (w <= 2) return "80.00";
                                                            if (w <= 5) return "120.00";
                                                            return "180.00";
                                                        })()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ width: "50%" }}>
                                            <div style={{
                                                backgroundColor: "#f8fafc",
                                                padding: "15px",
                                                borderRadius: "8px",
                                                border: "1px solid #e2e8f0"
                                            }}>
                                                <div style={{ fontWeight: "bold", marginBottom: "10px", fontSize: "13px" }}>📊 Tax Summary</div>
                                                <div style={{ fontSize: "12px", lineHeight: "1.8" }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <span>GST on Product:</span>
                                                        <span>₹{(() => {
                                                            const sp = Number(newProduct.sellingPrice) || 0;
                                                            const gst = (selectedCategory && selectedProductType) ? getGSTRate(selectedCategory, selectedProductType) : 18;
                                                            return ((sp * gst) / 100).toFixed(2);
                                                        })()}</span>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                        <span>GST on Charges (18%):</span>
                                                        <span>₹{(() => {
                                                            const sp = Number(newProduct.sellingPrice) || 0;
                                                            const gst = (selectedCategory && selectedProductType) ? getGSTRate(selectedCategory, selectedProductType) : 18;
                                                            const customerPays = sp + (sp * gst) / 100;
                                                            const commission = (customerPays * 2) / 100;
                                                            const w = Number(newProduct.weight) || 0.5;
                                                            let pick = w <= 0.5 ? 15 : w <= 1 ? 25 : w <= 2 ? 40 : w <= 5 ? 60 : 100;
                                                            let closing = sp >= 50000 ? 50 : sp >= 25000 ? 40 : sp >= 10000 ? 30 : sp >= 5000 ? 20 : sp >= 1000 ? 16 : sp >= 500 ? 10 : 6;
                                                            let shipping = w <= 0.5 ? 40 : w <= 1 ? 60 : w <= 2 ? 80 : w <= 5 ? 120 : 180;
                                                            const chargesTotal = commission + pick + closing + shipping;
                                                            return ((chargesTotal * 18) / 100).toFixed(2);
                                                        })()}</span>
                                                    </div>
                                                    <div style={{ borderTop: "1px solid #cbd5e1", margin: "8px 0" }}></div>
                                                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                                                        <span>Total Charges:</span>
                                                        <span>₹{(() => {
                                                            const sp = Number(newProduct.sellingPrice) || 0;
                                                            const gst = (selectedCategory && selectedProductType) ? getGSTRate(selectedCategory, selectedProductType) : 18;
                                                            const customerPays = sp + (sp * gst) / 100;
                                                            const commission = (customerPays * 2) / 100;
                                                            const w = Number(newProduct.weight) || 0.5;
                                                            let pick = w <= 0.5 ? 15 : w <= 1 ? 25 : w <= 2 ? 40 : w <= 5 ? 60 : 100;
                                                            let closing = sp >= 50000 ? 50 : sp >= 25000 ? 40 : sp >= 10000 ? 30 : sp >= 5000 ? 20 : sp >= 1000 ? 16 : sp >= 500 ? 10 : 6;
                                                            let shipping = w <= 0.5 ? 40 : w <= 1 ? 60 : w <= 2 ? 80 : w <= 5 ? 120 : 180;
                                                            const chargesTotal = commission + pick + closing + shipping;
                                                            const gstOnCharges = (chargesTotal * 18) / 100;
                                                            return (chargesTotal + gstOnCharges).toFixed(2);
                                                        })()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Grand Total Box - 100% Width */}
                                    <div style={{
                                        backgroundColor: "#dcfce7",
                                        padding: "20px",
                                        borderRadius: "8px",
                                        border: "1px solid #16a34a",
                                        textAlign: "center"
                                    }}>
                                        <div style={{ fontSize: "13px", color: "#15803d" }}>💰 Seller Receives (Estimated)</div>
                                        <div style={{ fontSize: "28px", fontWeight: "bold", color: "#16a34a" }}>
                                            ₹{(() => {
                                                const sp = Number(newProduct.sellingPrice) || 0;
                                                const gst = (selectedCategory && selectedProductType) ? getGSTRate(selectedCategory, selectedProductType) : 18;
                                                const customerPays = sp + (sp * gst) / 100;
                                                const commission = (customerPays * 2) / 100;
                                                const w = Number(newProduct.weight) || 0.5;
                                                let pick = w <= 0.5 ? 15 : w <= 1 ? 25 : w <= 2 ? 40 : w <= 5 ? 60 : 100;
                                                let closing = sp >= 50000 ? 50 : sp >= 25000 ? 40 : sp >= 10000 ? 30 : sp >= 5000 ? 20 : sp >= 1000 ? 16 : sp >= 500 ? 10 : 6;
                                                let shipping = w <= 0.5 ? 40 : w <= 1 ? 60 : w <= 2 ? 80 : w <= 5 ? 120 : 180;
                                                const chargesTotal = commission + pick + closing + shipping;
                                                const gstOnCharges = (chargesTotal * 18) / 100;
                                                const totalCharges = chargesTotal + gstOnCharges;
                                                const sellerReceives = sp - totalCharges;
                                                return sellerReceives.toFixed(2);
                                            })()}
                                        </div>
                                        <div style={{ fontSize: "11px", color: "#64748b" }}>(After all deductions including GST)</div>
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div style={styles.flexBetween}>
                                        <button type="button" onClick={() => setCurrentStep(3)} style={styles.secondaryBtn}>← Back</button>
                                        <button type="button" onClick={() => setCurrentStep(5)} style={styles.primaryBtn}>Next →</button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 5 */}
                            {currentStep === 5 && isSectionVisible("Inventory") && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <h4 style={{ color: primaryColor }}>📦 Inventory</h4>
                                    <div style={styles.grid}><div><label style={styles.label}>Stock Quantity *</label><input type="number" style={styles.input} placeholder="Stock" value={newProduct.stockQuantity} onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })} required /></div><div><label style={styles.label}>Min Stock Alert</label><input type="number" style={styles.input} placeholder="Alert when below" value={newProduct.minStockAlert} onChange={(e) => setNewProduct({ ...newProduct, minStockAlert: e.target.value })} /></div></div>
                                    <div><label style={styles.label}>Warehouse Location</label><input type="text" style={styles.input} placeholder="Complete Address" value={newProduct.warehouse} onChange={(e) => setNewProduct({ ...newProduct, warehouse: e.target.value })} /></div>
                                    <div style={styles.flexBetween}><button type="button" onClick={() => setCurrentStep(4)} style={styles.secondaryBtn}>← Back</button><button type="button" onClick={() => setCurrentStep(6)} style={styles.primaryBtn}>Next →</button></div>
                                </div>
                            )}

                            {/* STEP 6 */}
                            {currentStep === 6 && isSectionVisible("Shipping") && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <h4 style={{ color: primaryColor }}>🚚 Shipping Details</h4>
                                    <div><label style={styles.label}>Weight (kg)</label><input type="number" style={styles.input} placeholder="Weight" value={newProduct.weight} onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })} /></div>
                                    <div><label style={styles.label}>Dimensions (L x W x H in cm)</label><div style={styles.grid}><input type="number" placeholder="Length" style={styles.input} value={newProduct.length} onChange={(e) => setNewProduct({ ...newProduct, length: e.target.value })} /><input type="number" placeholder="Width" style={styles.input} value={newProduct.width} onChange={(e) => setNewProduct({ ...newProduct, width: e.target.value })} /><input type="number" placeholder="Height" style={styles.input} value={newProduct.height} onChange={(e) => setNewProduct({ ...newProduct, height: e.target.value })} /></div></div>
                                    <div><label style={styles.label}>Package Type</label><select style={styles.input} value={newProduct.packageType} onChange={(e) => setNewProduct({ ...newProduct, packageType: e.target.value })}><option>Box</option><option>Polybag</option><option>Envelope</option></select></div>
                                    <div style={styles.flexBetween}><button type="button" onClick={() => setCurrentStep(5)} style={styles.secondaryBtn}>← Back</button><button type="button" onClick={() => setCurrentStep(7)} style={styles.primaryBtn}>Next →</button></div>
                                </div>
                            )}

                            {/* STEP 7 */}
                            {currentStep === 7 && isSectionVisible("Variants") && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <h4 style={{ color: primaryColor }}>🎨 Variants</h4>
                                    <div style={styles.flexCenter}><input type="text" placeholder="Type (Color)" style={{ ...styles.input, flex: 1 }} value={variantType} onChange={(e) => setVariantType(e.target.value)} /><input type="text" placeholder="Size (S,M,L,XL,XXL)" style={{ ...styles.input, flex: 1 }} value={variantValue} onChange={(e) => setVariantValue(e.target.value)} /><button type="button" onClick={addVariant} style={styles.primaryBtn}><FaPlus /> Add</button></div>
                                    {variants.length > 0 && (<div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>{variants.map((v, i) => (<span key={i} style={{ background: "#e2e8f0", padding: "6px 12px", borderRadius: "20px" }}>{v.type}: {v.value} <button type="button" onClick={() => removeVariant(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#dc2626" }}>×</button></span>))}</div>)}
                                    <div style={styles.flexBetween}><button type="button" onClick={() => setCurrentStep(6)} style={styles.secondaryBtn}>← Back</button><button type="button" onClick={() => setCurrentStep(8)} style={styles.primaryBtn}>Next →</button></div>
                                </div>
                            )}

                            {/* STEP 8 */}
                            {currentStep === 8 && isSectionVisible("Return") && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <h4 style={{ color: primaryColor }}>🔄 Return & Warranty</h4>
                                    <div style={styles.grid}><div><label style={styles.label}>Return Available?</label><select style={styles.input} value={newProduct.returnAvailable} onChange={(e) => setNewProduct({ ...newProduct, returnAvailable: e.target.value })}><option>No</option><option>Yes</option></select></div>{newProduct.returnAvailable === "Yes" && (<div><label style={styles.label}>Return Days</label><input type="number" style={styles.input} placeholder="Days" value={newProduct.returnDays} onChange={(e) => setNewProduct({ ...newProduct, returnDays: e.target.value })} /></div>)}</div>
                                    <div style={styles.grid}><div><label style={styles.label}>Warranty Period</label><input type="text" style={styles.input} placeholder="1 Year" value={newProduct.warrantyPeriod} onChange={(e) => setNewProduct({ ...newProduct, warrantyPeriod: e.target.value })} /></div><div><label style={styles.label}>Warranty Type</label><select style={styles.input} value={newProduct.warrantyType} onChange={(e) => setNewProduct({ ...newProduct, warrantyType: e.target.value })}><option>Manufacturer</option><option>Seller</option><option>No Warranty</option></select></div></div>
                                    <div style={styles.flexBetween}><button type="button" onClick={() => setCurrentStep(7)} style={styles.secondaryBtn}>← Back</button><button type="button" onClick={() => setCurrentStep(9)} style={styles.primaryBtn}>Next →</button></div>
                                </div>
                            )}

                            {/* STEP 9 - Payment Options */}
                            {currentStep === 9 && isSectionVisible("Payment") && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <h4 style={{ color: primaryColor }}>💳 Payment Options</h4>

                                    {/* COD Available - Yes/No */}
                                    <div>
                                        <label style={styles.label}>✅ COD Available?</label>
                                        <select
                                            style={styles.input}
                                            value={newProduct.codAvailable}
                                            onChange={(e) => setNewProduct({ ...newProduct, codAvailable: e.target.value })}
                                        >
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                        {Number(newProduct.sellingPrice) > 5000 && (
                                            <div style={{ ...styles.warningBox, marginTop: "5px", fontSize: "11px" }}>
                                                ⚠️ Note: COD is automatically disabled for items above ₹5000
                                            </div>
                                        )}
                                    </div>

                                    {/* Minimum Order Value for COD */}
                                    <div>
                                        <label style={styles.label}>💰 Minimum Order Value for COD</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            style={styles.input}
                                            placeholder="(minimum ₹500 for COD)"
                                            value={newProduct.minOrderValueForCOD || ""}
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^0-9]/g, '');
                                                setNewProduct({ ...newProduct, minOrderValueForCOD: value });
                                            }}
                                        />
                                        <span style={{ fontSize: "11px", color: "#64748b" }}>
                                            Customer must order at least this amount to use COD
                                        </span>
                                    </div>

                                    {/* EMI Eligible - Yes/No */}
                                    <div>
                                        <label style={styles.label}>📱 EMI Eligible?</label>
                                        <select
                                            style={styles.input}
                                            value={newProduct.emiEligible}
                                            onChange={(e) => setNewProduct({ ...newProduct, emiEligible: e.target.value })}
                                        >
                                            <option value="No">No</option>
                                            <option value="Yes">Yes</option>
                                        </select>
                                        {newProduct.emiEligible === "Yes" && (
                                            <div style={{ ...styles.successBox, marginTop: "5px", padding: "8px", fontSize: "12px" }}>
                                                ✅ EMI option will be available for orders above ₹3,000
                                            </div>
                                        )}
                                    </div>

                                    {/* GST Included in Price? */}
                                    <div>
                                        <label style={styles.label}>🏷️ GST Included in Price?</label>
                                        <select
                                            style={styles.input}
                                            value={newProduct.gstIncluded || "Yes"}
                                            onChange={(e) => setNewProduct({ ...newProduct, gstIncluded: e.target.value })}
                                        >
                                            <option value="Yes">Yes (Displayed price includes GST)</option>
                                            <option value="No">No (GST will be added at checkout)</option>
                                        </select>
                                        <span style={{ fontSize: "11px", color: "#64748b" }}>
                                            {newProduct.gstIncluded === "Yes"
                                                ? "Customer will see final price including GST"
                                                : "GST will be added separately at checkout"}
                                        </span>
                                    </div>

                                    {/* Invoice Available? */}
                                    <div>
                                        <label style={styles.label}>🧾 Invoice Available?</label>
                                        <select
                                            style={styles.input}
                                            value={newProduct.invoiceAvailable || "Yes"}
                                            onChange={(e) => setNewProduct({ ...newProduct, invoiceAvailable: e.target.value })}
                                        >
                                            <option value="Yes">Yes (Tax invoice available)</option>
                                            <option value="No">No (No invoice provided)</option>
                                        </select>
                                        <span style={{ fontSize: "11px", color: "#64748b" }}>
                                            {newProduct.invoiceAvailable === "Yes"
                                                ? "Customer will get GST invoice for this product"
                                                : "Customer will not receive a tax invoice"}
                                        </span>
                                    </div>

                                    {/* Summary Box - Show all selected options */}
                                    <div style={{
                                        backgroundColor: "#f8fafc",
                                        padding: "15px",
                                        borderRadius: "8px",
                                        border: "1px solid #cbd5e1",
                                        marginTop: "10px"
                                    }}>
                                        <h5 style={{ marginBottom: "10px", color: "#1e293b" }}>📋 Payment Summary</h5>
                                        <div style={{ fontSize: "13px", lineHeight: "1.8" }}>
                                            <div>• COD Available: <b>{newProduct.codAvailable === "Yes" ? "✅ Yes" : "❌ No"}</b></div>
                                            {newProduct.minOrderValueForCOD && newProduct.codAvailable === "Yes" && (
                                                <div>• Minimum COD Order: <b>₹{newProduct.minOrderValueForCOD}</b></div>
                                            )}
                                            <div>• EMI Eligible: <b>{newProduct.emiEligible === "Yes" ? "✅ Yes" : "❌ No"}</b></div>
                                            <div>• GST Included: <b>{newProduct.gstIncluded === "Yes" ? "Yes" : "No (Added at checkout)"}</b></div>
                                            <div>• Invoice Available: <b>{newProduct.invoiceAvailable === "Yes" ? "✅ Yes" : "❌ No"}</b></div>
                                        </div>
                                    </div>

                                    {/* Navigation Buttons */}
                                    <div style={styles.flexBetween}>
                                        <button type="button" onClick={() => setCurrentStep(8)} style={styles.secondaryBtn}>← Back</button>
                                        <button type="button" onClick={() => setCurrentStep(10)} style={styles.primaryBtn}>Next →</button>
                                    </div>
                                </div>
                            )}

                            {/* STEP 10 */}
                            {currentStep === 10 && isSectionVisible("Specifications") && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <h4 style={{ color: primaryColor }}>📋 Product Specifications</h4>
                                    <div style={{ backgroundColor: "#f8fafc", padding: "20px", borderRadius: "12px" }}>
                                        {!selectedCategory && <p style={{ color: "#94a3b8", textAlign: "center" }}>Please select a category first</p>}
                                        {getSpecificationFields().map((field, idx) => (<div key={idx} style={{ marginBottom: "15px" }}><label style={styles.label}>{field.label}</label><input type="text" style={styles.input} placeholder={field.placeholder} onChange={(e) => setNewProduct({ ...newProduct, specifications: { ...newProduct.specifications, [field.key]: e.target.value } })} /></div>))}
                                    </div>
                                    <div style={styles.flexBetween}><button type="button" onClick={() => setCurrentStep(9)} style={styles.secondaryBtn}>← Back</button><button type="button" onClick={() => setCurrentStep(11)} style={styles.primaryBtn}>Next →</button></div>
                                </div>
                            )}

                            {/* STEP 11 */}
                            {currentStep === 11 && isSectionVisible("Documents") && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <h4 style={{ color: primaryColor }}>📄 Compliance Documents</h4>
                                    <div><label style={styles.label}>GST Number</label><input type="text" style={styles.input} placeholder="GSTIN" value={newProduct.gstNumber} onChange={(e) => setNewProduct({ ...newProduct, gstNumber: e.target.value })} /></div>
                                    <div><label style={styles.label}>Brand Authorization</label><input type="text" style={styles.input} placeholder="Authorization details" value={newProduct.brandAuthorization} onChange={(e) => setNewProduct({ ...newProduct, brandAuthorization: e.target.value })} /></div>
                                    <div><label style={styles.label}>Invoice Details</label><input type="text" style={styles.input} placeholder="Invoice number and date" value={newProduct.invoiceDetails} onChange={(e) => setNewProduct({ ...newProduct, invoiceDetails: e.target.value })} /></div>
                                    <div style={styles.flexBetween}><button type="button" onClick={() => setCurrentStep(10)} style={styles.secondaryBtn}>← Back</button><button type="button" onClick={() => setCurrentStep(12)} style={styles.primaryBtn}>Next →</button></div>
                                </div>
                            )}

                            {/* STEP 12 */}
                            {currentStep === 12 && isSectionVisible("SEO") && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <h4 style={{ color: primaryColor }}>🔍 SEO Settings</h4>
                                    <div><label style={styles.label}>Search Keywords</label><input type="text" style={styles.input} placeholder="Comma separated" value={newProduct.searchKeywords} onChange={(e) => setNewProduct({ ...newProduct, searchKeywords: e.target.value })} /></div>
                                    <div><label style={styles.label}>Meta Title</label><input type="text" style={styles.input} maxLength="60" placeholder="SEO title" value={newProduct.metaTitle} onChange={(e) => setNewProduct({ ...newProduct, metaTitle: e.target.value })} /><span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{newProduct.metaTitle.length}/60</span></div>
                                    <div><label style={styles.label}>Meta Description</label><textarea rows="2" style={styles.input} maxLength="160" placeholder="SEO description" value={newProduct.metaDescription} onChange={(e) => setNewProduct({ ...newProduct, metaDescription: e.target.value })} /><span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>{newProduct.metaDescription.length}/160</span></div>
                                    <div style={styles.flexBetween}><button type="button" onClick={() => setCurrentStep(11)} style={styles.secondaryBtn}>← Back</button><button type="button" onClick={() => setCurrentStep(13)} style={styles.primaryBtn}>Next →</button></div>
                                </div>
                            )}

                            {/* STEP 13 */}
                            {currentStep === 13 && isSectionVisible("Publish") && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    <h4 style={{ color: primaryColor }}>🚀 Publish Product</h4>
                                    <div><label style={styles.label}>Publish Status</label><select style={styles.input} value={newProduct.publishStatus} onChange={(e) => setNewProduct({ ...newProduct, publishStatus: e.target.value })}><option>Draft</option><option>Published</option><option>Scheduled</option></select></div>
                                    <div style={styles.successBox}><FaCheckCircle style={{ color: "#16a34a" }} /> <strong>Ready to publish?</strong><p>Review all details before publishing.</p></div>
                                    <div style={styles.flexBetween}><button type="button" onClick={() => setCurrentStep(12)} style={styles.secondaryBtn}>← Back</button><button type="submit" style={styles.successBtn}>✅ Publish Product</button></div>
                                </div>
                            )}
                        </form>
                    </div>
                )}

                {sellerTab === "inventory" && (
                    <div className="admin-section-card" style={styles.card}>
                        <h3 className="admin-block-title">📦 Product Inventory</h3>
                        <div className="table-responsive">
                            <table className="admin-master-table">
                                <thead>
                                    <tr>
                                        <th>SKU / ID</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myProducts.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                                                No products added yet. Click "Add Product" to get started.
                                            </td>
                                        </tr>
                                    ) : (
                                        myProducts.map((p) => (
                                            <tr key={p.id}>
                                                <td><b>{p.id || p.sku || "N/A"}</b></td>
                                                <td>{p.title}</td>
                                                <td>{p.category}</td>
                                                <td>₹{p.price || p.sellingPrice || 0}</td>
                                                <td style={{ color: (p.stock || 0) < 5 ? "#dc2626" : "inherit" }}>{(p.stock || 0)} units</td>
                                                <td>{(p.stock || 0) > 0 ? <span style={{ color: "#16a34a" }}>✅ In Stock</span> : <span style={{ color: "#dc2626" }}>❌ Out of Stock</span>}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {sellerTab === "orders" && (
                    <div className="admin-section-card" style={styles.card}>
                        <h3 className="admin-block-title">📋 Customer Orders</h3>
                        <div className="table-responsive">
                            <table className="admin-master-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Product</th>
                                        <th>Amount</th>
                                        <th>Payment</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {incomingOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
                                                No orders yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        incomingOrders.map((ord) => (
                                            <tr key={ord.id}>
                                                <td><b>{ord.id}</b></td>
                                                <td>{ord.customer}<br /><span style={{ fontSize: "0.7rem", color: "#64748b" }}>{ord.address}</span></td>
                                                <td>{ord.product}</td>
                                                <td>₹{ord.price}</td>
                                                <td><span style={{ padding: "4px 8px", borderRadius: "4px", backgroundColor: ord.paymentMethod === "COD" ? "#fef3c7" : "#dcfce7", color: ord.paymentMethod === "COD" ? "#d97706" : "#16a34a" }}>{ord.paymentMethod}</span></td>
                                                <td>
                                                    <select value={ord.status} onChange={(e) => { alert(`Status updated to ${e.target.value}`); }} style={{ padding: "6px 10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
                                                        <option>PENDING</option>
                                                        <option>SHIPPED</option>
                                                        <option>DELIVERED</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SellerDashboard;