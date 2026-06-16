// frontend/src/pages/AddProduct.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaImage, FaUpload, FaCaretDown } from "react-icons/fa";

const AddProduct = () => {
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);

    // Categories list
    const categories = [
        { name: "Electronics", subCategories: ["Mobiles", "Laptops", "Headphones", "Smart Watches"] },
        { name: "Fashion", subCategories: ["Men's Clothing", "Women's Clothing", "Footwear", "Watches"] },
        { name: "Home & Kitchen", subCategories: ["Furniture", "Kitchen Appliances", "Home Decor"] },
        { name: "Beauty & Personal Care", subCategories: ["Makeup", "Skincare", "Hair Care"] },
        { name: "Books", subCategories: ["Academic Books", "Novels", "Children's Books"] },
        { name: "Toys & Games", subCategories: ["Educational Toys", "Board Games", "Action Figures"] },
        { name: "Sports & Fitness", subCategories: ["Gym Equipment", "Cricket", "Yoga"] }
    ];

    const [productData, setProductData] = useState({
        title: "",
        brand: "",
        price: "",
        mrp: "",
        description: "",
        category: "",
        subCategory: "",

        // Common fields
        sku: "",
        stockQuantity: "",
        weight: 0.5,

        // Images
        mainImage: null,

        // Category-specific fields
        hsnSacCode: "",
        gstRate: 18,

        // Electronics specific
        imeiSerial: "",
        warrantyPeriod: "",
        storage: "",
        ram: "",
        display: "",        // 🆕 ADDED
        processor: "",      // 🆕 ADDED
        battery: "",        // 🆕 ADDED

        // Fashion specific
        sizeVariant: "",
        colorVariant: "",
        fabricMaterial: "",
        gender: "",         // 🆕 ADDED

        // Books specific
        author: "",
        publisher: "",
        isbn: "",
        totalPages: "",     // 🆕 ADDED

        // Home & Kitchen specific
        material: "",
        dimensions: "",
        
        // Beauty specific
        expiryDate: "",     // 🆕 ADDED
        isOrganic: false,   // 🆕 ADDED
        
        // Sports specific
        sportType: "",      // 🆕 ADDED
        ageGroup: ""        // 🆕 ADDED (Toys)
    });

    const [mainImagePreview, setMainImagePreview] = useState(null);

    const handleMainImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProductData({ ...productData, mainImage: file });
            setMainImagePreview(URL.createObjectURL(file));
        }
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category.name);
        setProductData({ ...productData, category: category.name });

        // Auto-set HSN and GST based on category
        const hsnMap = {
            'Electronics': '85171300',
            'Fashion': '61/62',
            'Home & Kitchen': '94',
            'Beauty & Personal Care': '33',
            'Books': '4901',
            'Toys & Games': '95',
            'Sports & Fitness': '95'
        };

        const gstMap = {
            'Electronics': 18,
            'Fashion': 12,
            'Home & Kitchen': 18,
            'Beauty & Personal Care': 18,
            'Books': 0,
            'Toys & Games': 12,
            'Sports & Fitness': 18
        };

        setProductData({
            ...productData,
            hsnSacCode: hsnMap[category.name] || '998599',
            gstRate: gstMap[category.name] || 18
        });

        setIsCategoryOpen(false);
    };

    const handleSubCategorySelect = (subCategory) => {
        setSelectedSubCategory(subCategory);
        setProductData({ ...productData, subCategory: subCategory });
        setIsSubCategoryOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productData.title) {
            alert("Please enter product title!");
            return;
        }
        if (!productData.category) {
            alert("Please select a category!");
            return;
        }

        console.log("Product Data:", productData);

        // Calculate GST amount
        const gstAmount = (productData.price * productData.gstRate) / 100;
        const finalPrice = productData.price + gstAmount;

        // Save to localStorage (for demo purposes)
        const existingProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
        const newProduct = {
            id: `PROD-${Date.now()}`,
            title: productData.title,
            brand: productData.brand,
            price: productData.price,
            mrp: productData.mrp,
            category: productData.category,
            subCategory: productData.subCategory,
            hsnSacCode: productData.hsnSacCode,
            gstRate: productData.gstRate,
            imeiSerial: productData.imeiSerial,
            warrantyPeriod: productData.warrantyPeriod,
            sizeVariant: productData.sizeVariant,
            colorVariant: productData.colorVariant,
            fabricMaterial: productData.fabricMaterial,
            author: productData.author,
            publisher: productData.publisher,
            isbn: productData.isbn,
            weight: productData.weight,
            stockQuantity: productData.stockQuantity,
            image: mainImagePreview
        };
        
        existingProducts.unshift(newProduct);
        localStorage.setItem("allProducts", JSON.stringify(existingProducts));

        alert(`✅ Product "${productData.title}" added successfully!\n\nPrice: ₹${productData.price}\nGST (${productData.gstRate}%): ₹${gstAmount}\nCustomer Price: ₹${finalPrice}`);

        // Reset form
        setProductData({
            title: "", brand: "", price: "", mrp: "", description: "", category: "", subCategory: "",
            sku: "", stockQuantity: "", weight: 0.5, mainImage: null,
            hsnSacCode: "", gstRate: 18, imeiSerial: "", warrantyPeriod: "", storage: "", ram: "",
            display: "", processor: "", battery: "", sizeVariant: "", colorVariant: "", fabricMaterial: "",
            gender: "", author: "", publisher: "", isbn: "", totalPages: "", material: "", dimensions: "",
            expiryDate: "", isOrganic: false, sportType: "", ageGroup: ""
        });
        setSelectedCategory("");
        setSelectedSubCategory("");
        setMainImagePreview(null);
    };

    const styles = {
        container: { maxWidth: "800px", margin: "0 auto", padding: "20px" },
        card: { backgroundColor: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" },
        title: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px", color: "#1e293b" },
        input: { width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px" },
        label: { display: "block", marginBottom: "5px", fontWeight: "500", color: "#334155" },
        grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
        flexBetween: { display: "flex", justifyContent: "space-between", alignItems: "center" },
        primaryBtn: { backgroundColor: "#03bafc", color: "white", border: "none", padding: "12px 24px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
        secondaryBtn: { backgroundColor: "#e2e8f0", color: "#333", border: "none", padding: "12px 24px", borderRadius: "8px", cursor: "pointer" },
        warningBox: { backgroundColor: "#fef3c7", padding: "10px", borderRadius: "8px", color: "#d97706", fontSize: "0.8rem" }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>➕ Add New Product</h2>

                <form onSubmit={handleSubmit}>
                    {/* Basic Info */}
                    <div style={{ marginBottom: "20px" }}>
                        <h3 style={{ fontSize: "16px", marginBottom: "15px", color: "#03bafc" }}>📝 Basic Information</h3>

                        <div style={styles.grid}>
                            <div>
                                <label style={styles.label}>Product Title *</label>
                                <input type="text" style={styles.input}
                                    value={productData.title}
                                    onChange={(e) => setProductData({ ...productData, title: e.target.value })}
                                    required />
                            </div>
                            <div>
                                <label style={styles.label}>Brand Name</label>
                                <input type="text" style={styles.input}
                                    value={productData.brand}
                                    onChange={(e) => setProductData({ ...productData, brand: e.target.value })} />
                            </div>
                        </div>

                        <div style={styles.grid}>
                            <div>
                                <label style={styles.label}>SKU (Product Code)</label>
                                <input type="text" style={styles.input}
                                    value={productData.sku}
                                    onChange={(e) => setProductData({ ...productData, sku: e.target.value })} />
                            </div>
                            <div>
                                <label style={styles.label}>Stock Quantity</label>
                                <input type="number" style={styles.input}
                                    value={productData.stockQuantity}
                                    onChange={(e) => setProductData({ ...productData, stockQuantity: e.target.value })} />
                            </div>
                        </div>

                        <div>
                            <label style={styles.label}>Product Description</label>
                            <textarea rows="3" style={styles.input}
                                value={productData.description}
                                onChange={(e) => setProductData({ ...productData, description: e.target.value })} />
                        </div>
                    </div>

                    {/* Category Selection */}
                    <div style={{ marginBottom: "20px" }}>
                        <h3 style={{ fontSize: "16px", marginBottom: "15px", color: "#03bafc" }}>📂 Category Selection</h3>

                        <div style={styles.grid}>
                            <div>
                                <label style={styles.label}>Main Category *</label>
                                <div style={{ position: "relative" }}>
                                    <div onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                        style={{ ...styles.input, cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                                        <span>{selectedCategory || "Select Category"}</span>
                                        <FaCaretDown />
                                    </div>
                                    {isCategoryOpen && (
                                        <div style={{
                                            position: "absolute", top: "100%", left: 0, right: 0, backgroundColor: "white",
                                            border: "1px solid #cbd5e1", borderRadius: "8px", maxHeight: "200px", overflowY: "auto", zIndex: 10
                                        }}>
                                            {categories.map((cat, idx) => (
                                                <div key={idx} onClick={() => handleCategorySelect(cat)}
                                                    style={{ padding: "10px 12px", cursor: "pointer", borderBottom: "1px solid #e2e8f0" }}>
                                                    {cat.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {selectedCategory && (
                                <div>
                                    <label style={styles.label}>Sub Category</label>
                                    <div style={{ position: "relative" }}>
                                        <div onClick={() => setIsSubCategoryOpen(!isSubCategoryOpen)}
                                            style={{ ...styles.input, cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
                                            <span>{selectedSubCategory || "Select Sub Category"}</span>
                                            <FaCaretDown />
                                        </div>
                                        {isSubCategoryOpen && (
                                            <div style={{
                                                position: "absolute", top: "100%", left: 0, right: 0, backgroundColor: "white",
                                                border: "1px solid #cbd5e1", borderRadius: "8px", maxHeight: "200px", overflowY: "auto", zIndex: 10
                                            }}>
                                                {categories.find(c => c.name === selectedCategory)?.subCategories.map((sub, idx) => (
                                                    <div key={idx} onClick={() => handleSubCategorySelect(sub)}
                                                        style={{ padding: "10px 12px", cursor: "pointer", borderBottom: "1px solid #e2e8f0" }}>
                                                        {sub}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pricing */}
                    <div style={{ marginBottom: "20px" }}>
                        <h3 style={{ fontSize: "16px", marginBottom: "15px", color: "#03bafc" }}>💰 Pricing</h3>

                        <div style={styles.grid}>
                            <div>
                                <label style={styles.label}>MRP</label>
                                <input type="number" style={styles.input}
                                    value={productData.mrp}
                                    onChange={(e) => setProductData({ ...productData, mrp: e.target.value })} />
                            </div>
                            <div>
                                <label style={styles.label}>Selling Price *</label>
                                <input type="number" style={styles.input} required
                                    value={productData.price}
                                    onChange={(e) => setProductData({ ...productData, price: e.target.value })} />
                            </div>
                        </div>

                        <div style={{ backgroundColor: "#f0fdf4", padding: "12px", borderRadius: "8px", marginTop: "10px" }}>
                            <div style={styles.flexBetween}>
                                <span>GST Rate: <b>{productData.gstRate}%</b></span>
                                <span>HSN Code: <b>{productData.hsnSacCode}</b></span>
                            </div>
                            {productData.price && (
                                <div style={styles.flexBetween}>
                                    <span>GST Amount:</span>
                                    <b>₹{((productData.price * productData.gstRate) / 100).toFixed(2)}</b>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Category-specific Fields */}
                    {selectedCategory === "Electronics" && (
                        <div style={{ marginBottom: "20px" }}>
                            <h3 style={{ fontSize: "16px", marginBottom: "15px", color: "#03bafc" }}>📱 Electronics Details</h3>
                            <div style={styles.grid}>
                                <div>
                                    <label style={styles.label}>IMEI/Serial Number</label>
                                    <input type="text" style={styles.input} placeholder="e.g., 354774869218141"
                                        value={productData.imeiSerial}
                                        onChange={(e) => setProductData({ ...productData, imeiSerial: e.target.value })} />
                                </div>
                                <div>
                                    <label style={styles.label}>Warranty Period</label>
                                    <input type="text" style={styles.input} placeholder="e.g., 1 Year Limited Warranty"
                                        value={productData.warrantyPeriod}
                                        onChange={(e) => setProductData({ ...productData, warrantyPeriod: e.target.value })} />
                                </div>
                                <div>
                                    <label style={styles.label}>Storage</label>
                                    <input type="text" style={styles.input} placeholder="e.g., 128GB, 256GB"
                                        value={productData.storage}
                                        onChange={(e) => setProductData({ ...productData, storage: e.target.value })} />
                                </div>
                                <div>
                                    <label style={styles.label}>RAM</label>
                                    <input type="text" style={styles.input} placeholder="e.g., 8GB, 12GB"
                                        value={productData.ram}
                                        onChange={(e) => setProductData({ ...productData, ram: e.target.value })} />
                                </div>
                                <div>
                                    <label style={styles.label}>Display</label>
                                    <input type="text" style={styles.input} placeholder="e.g., 6.1-inch Super Retina"
                                        value={productData.display}
                                        onChange={(e) => setProductData({ ...productData, display: e.target.value })} />
                                </div>
                                <div>
                                    <label style={styles.label}>Processor</label>
                                    <input type="text" style={styles.input} placeholder="e.g., A18 Bionic Chip"
                                        value={productData.processor}
                                        onChange={(e) => setProductData({ ...productData, processor: e.target.value })} />
                                </div>
                                <div>
                                    <label style={styles.label}>Battery</label>
                                    <input type="text" style={styles.input} placeholder="e.g., 5000mAh"
                                        value={productData.battery}
                                        onChange={(e) => setProductData({ ...productData, battery: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedCategory === "Fashion" && (
                        <div style={{ marginBottom: "20px" }}>
                            <h3 style={{ fontSize: "16px", marginBottom: "15px", color: "#03bafc" }}>👕 Fashion Details</h3>
                            <div style={styles.grid}>
                                <div>
                                    <label style={styles.label}>Size</label>
                                    <select style={styles.input}
                                        value={productData.sizeVariant}
                                        onChange={(e) => setProductData({ ...productData, sizeVariant: e.target.value })}>
                                        <option value="">Select Size</option>
                                        <option>XS</option><option>S</option><option>M</option>
                                        <option>L</option><option>XL</option><option>XXL</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={styles.label}>Color</label>
                                    <input type="text" style={styles.input} placeholder="e.g., Red, Blue, Black"
                                        value={productData.colorVariant}
                                        onChange={(e) => setProductData({ ...productData, colorVariant: e.target.value })} />
                                </div>
                                <div>
                                    <label style={styles.label}>Fabric Material</label>
                                    <input type="text" style={styles.input} placeholder="e.g., Cotton, Polyester, Silk"
                                        value={productData.fabricMaterial}
                                        onChange={(e) => setProductData({ ...productData, fabricMaterial: e.target.value })} />
                                </div>
                                <div>
                                    <label style={styles.label}>Gender</label>
                                    <select style={styles.input}
                                        value={productData.gender}
                                        onChange={(e) => setProductData({ ...productData, gender: e.target.value })}>
                                        <option value="">Select Gender</option>
                                        <option>Men</option><option>Women</option><option>Kids</option><option>Unisex</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedCategory === "Books" && (
                        <div style={{ marginBottom: "20px" }}>
                            <h3 style={{ fontSize: "16px", marginBottom: "15px", color: "#03bafc" }}>📚 Book Details</h3>
                            <div style={styles.grid}>
                                <div>
                                    <label style={styles.label}>Author</label>
                                    <input type="text" style={styles.input} placeholder="Author name"
                                        value={productData.author}
                                        onChange={(e) => setProductData({ ...productData, author: e.target.value })} />
                                </div>
                                <div>
                                    <label style={styles.label}>Publisher</label>
                                    <input type="text" style={styles.input} placeholder="Publisher name"
                                        value={productData.publisher}
                                        onChange={(e) => setProductData({ ...productData, publisher: e.target.value })} />
                                </div>
                                <div>
                                    <label style={styles.label}>ISBN</label>
                                    <input type="text" style={styles.input} placeholder="ISBN number"
                                        value={productData.isbn}
                                        onChange={(e) => setProductData({ ...productData, isbn: e.target.value })} />
                                </div>
                                <div>
                                    <label style={styles.label}>Total Pages</label>
                                    <input type="number" style={styles.input} placeholder="Number of pages"
                                        value={productData.totalPages}
                                        onChange={(e) => setProductData({ ...productData, totalPages: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedCategory === "Home & Kitchen" && (
                        <div style={{ marginBottom: "20px" }}>
                            <h3 style={{ fontSize: "16px", marginBottom: "15px", color: "#03bafc" }}>🏠 Home & Kitchen Details</h3>
                            <div style={styles.grid}>
                                <div>
                                    <label style={styles.label}>Material</label>
                                    <input type="text" style={styles.input} placeholder="e.g., Wood, Steel, Plastic"
                                        value={productData.material}
                                        onChange={(e) => setProductData({ ...productData, material: e.target.value })} />
                                </div>
                                <div>
                                    <label style={styles.label}>Dimensions (L x W x H)</label>
                                    <input type="text" style={styles.input} placeholder="e.g., 10x20x30 cm"
                                        value={productData.dimensions}
                                        onChange={(e) => setProductData({ ...productData, dimensions: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedCategory === "Beauty & Personal Care" && (
                        <div style={{ marginBottom: "20px" }}>
                            <h3 style={{ fontSize: "16px", marginBottom: "15px", color: "#03bafc" }}>💄 Beauty Details</h3>
                            <div style={styles.grid}>
                                <div>
                                    <label style={styles.label}>Brand</label>
                                    <input type="text" style={styles.input} placeholder="Brand name"
                                        value={productData.brand}
                                        onChange={(e) => setProductData({ ...productData, brand: e.target.value })} />
                                </div>
                                <div>
                                    <label style={styles.label}>Expiry Date</label>
                                    <input type="date" style={styles.input}
                                        value={productData.expiryDate}
                                        onChange={(e) => setProductData({ ...productData, expiryDate: e.target.value })} />
                                </div>
                                <div>
                                    <label style={styles.label}>Is Organic?</label>
                                    <select style={styles.input}
                                        value={productData.isOrganic ? "Yes" : "No"}
                                        onChange={(e) => setProductData({ ...productData, isOrganic: e.target.value === "Yes" })}>
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedCategory === "Toys & Games" && (
                        <div style={{ marginBottom: "20px" }}>
                            <h3 style={{ fontSize: "16px", marginBottom: "15px", color: "#03bafc" }}>🎮 Toys & Games Details</h3>
                            <div style={styles.grid}>
                                <div>
                                    <label style={styles.label}>Age Group</label>
                                    <select style={styles.input}
                                        value={productData.ageGroup}
                                        onChange={(e) => setProductData({ ...productData, ageGroup: e.target.value })}>
                                        <option value="">Select Age Group</option>
                                        <option>0-2 Years</option><option>3-5 Years</option>
                                        <option>6-8 Years</option><option>9-12 Years</option>
                                        <option>12+ Years</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedCategory === "Sports & Fitness" && (
                        <div style={{ marginBottom: "20px" }}>
                            <h3 style={{ fontSize: "16px", marginBottom: "15px", color: "#03bafc" }}>⚽ Sports Details</h3>
                            <div style={styles.grid}>
                                <div>
                                    <label style={styles.label}>Sport Type</label>
                                    <input type="text" style={styles.input} placeholder="e.g., Cricket, Football, Yoga"
                                        value={productData.sportType}
                                        onChange={(e) => setProductData({ ...productData, sportType: e.target.value })} />
                                </div>
                                <div>
                                    <label style={styles.label}>Size/Variant</label>
                                    <input type="text" style={styles.input} placeholder="e.g., Size 6, Medium"
                                        value={productData.sizeVariant}
                                        onChange={(e) => setProductData({ ...productData, sizeVariant: e.target.value })} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Images */}
                    <div style={{ marginBottom: "20px" }}>
                        <h3 style={{ fontSize: "16px", marginBottom: "15px", color: "#03bafc" }}>🖼️ Product Image</h3>

                        <div style={{ border: "2px dashed #cbd5e1", borderRadius: "12px", padding: "30px", textAlign: "center" }}>
                            {mainImagePreview ? (
                                <div>
                                    <img src={mainImagePreview} alt="Main" style={{ maxWidth: "100%", maxHeight: "180px" }} />
                                    <button type="button" onClick={() => {
                                        setMainImagePreview(null);
                                        setProductData({ ...productData, mainImage: null });
                                    }} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", marginTop: "10px", cursor: "pointer" }}>
                                        Remove
                                    </button>
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

                    {/* Weight for Shipping */}
                    <div style={{ marginBottom: "20px" }}>
                        <h3 style={{ fontSize: "16px", marginBottom: "15px", color: "#03bafc" }}>🚚 Shipping Details</h3>
                        <div>
                            <label style={styles.label}>Product Weight (kg)</label>
                            <input type="number" step="0.1" style={styles.input}
                                value={productData.weight}
                                onChange={(e) => setProductData({ ...productData, weight: e.target.value })} />
                            <span style={{ fontSize: "11px", color: "#64748b" }}>Used for shipping & pick & pack fee calculation</span>
                        </div>
                    </div>

                    {/* HSN Code Display */}
                    <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: "#e0f2fe", borderRadius: "8px", fontSize: "12px" }}>
                        <strong>🏷️ HSN/SAC Code:</strong> {productData.hsnSacCode || "Will be auto-filled after category selection"}
                    </div>

                    {/* Buttons */}
                    <div style={styles.flexBetween}>
                        <button type="button" onClick={() => navigate(-1)} style={styles.secondaryBtn}>← Back</button>
                        <button type="submit" style={styles.primaryBtn}>✅ Add Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;