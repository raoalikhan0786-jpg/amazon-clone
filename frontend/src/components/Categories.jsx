import React from "react";
// Photos Import
// Box 1 for Gaming
import Gaming from "../images/Gaming.jpg";
// Box 2 for Fashion
import fashionImg1 from "../images/Fashion-1.jpg";
import fashionImg2 from "../images/Fashion-2.jpg";
import fashionImg3 from "../images/Fashion-3.webp";
import fashionImg4 from "../images/Fashion-4.jpg";
// Box 3 for New home arrivals
import homeImg1 from "../images/A-1.jpg";
import homeImg2 from "../images/A-2.jpg";
import homeImg3 from "../images/A-3.jpg";
import homeImg4 from "../images/A-4.jpg";
// Box 4 for Gear up to get fit
import trendImg1 from "../images/b-1.jpg";
import trendImg2 from "../images/b-2.jpg";
import trendImg3 from "../images/b-3.jpg";
import trendImg4 from "../images/b-4.jpg";
// Box 5 WATCHES PHOTOS IMPORT
import watchImg1 from "../images/c-1.jpg";
import watchImg2 from "../images/c-2.jpg";
import watchImg3 from "../images/c-3.jpg";
import watchImg4 from "../images/c-4.jpg";
// Box 6 ELECTRONICS PHOTOS IMPORT
import elecImg1 from "../images/d-1.jpg";
import elecImg2 from "../images/d-2.jpg";
import elecImg3 from "../images/d-3.jpg";
import elecImg4 from "../images/d-4.jpg";
// Box 7 PC PHOTOS IMPORT
import pcImg1 from "../images/e-1.jpg";
import pcImg2 from "../images/e-2.jpg";
import pcImg3 from "../images/e-3.jpg";
import pcImg4 from "../images/e-4.jpg";
// Box 8 KITCHEN PHOTOS IMPORT
import kitchenImg1 from "../images/f-1.jpg";
import kitchenImg2 from "../images/f-2.jpg";
import kitchenImg3 from "../images/f-3.jpg";
import kitchenImg4 from "../images/f-4.jpg";
import {
  FaGamepad,
  FaShirt,
  FaSocks,
  FaCouch,
  FaWhiskeyGlass
} from "react-icons/fa6";
import { GiFootprint } from "react-icons/gi";
import { IoWatchOutline } from "react-icons/io5";

const Categories = () => {
  // ============================================================
  // 📦 COMPLETE CSS STYLES
  // ============================================================
  const styles = {
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
      gap: "20px",
      width: "100%",
      maxWidth: "1500px",
      margin: "24px auto 0 auto",
      boxSizing: "border-box",
      padding: "0 10px"
    },
    categoryCard: {
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxSizing: "border-box",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer",
      height: "360px"
    },
    categoryCardHover: {
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      transform: "translateY(-2px)"
    },
    categoryTitle: {
      fontSize: "1.125rem",
      fontWeight: "700",
      color: "#0f172a",
      margin: "0 0 12px 0",
      lineHeight: "1.4"
    },
    singleProductGrayBox: {
      backgroundColor: "#f1f5f9",
      borderRadius: "6px",
      height: "260px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      marginBottom: "16px"
    },
    largeGrayIcon: {
      fontSize: "3.75rem",
      color: "#94a3b8"
    },
    subFourGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
      gap: "8px",
      marginBottom: "16px"
    },
    fourGridItem: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center"
    },
    smallGrayBox: {
      backgroundColor: "#f8fafc",
      padding: "8px",
      borderRadius: "4px",
      height: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    smallGridIcon: {
      fontSize: "1.5rem",
      color: "#64748b"
    },
    smallGridText: {
      fontSize: "0.75rem",
      fontWeight: "500",
      color: "#475569",
      margin: "4px 0 0 0"
    },
    categoryLinkAnchor: {
      fontSize: "0.875rem",
      fontWeight: "600",
      color: "#0d9488",
      textDecoration: "none",
      display: "inline-block",
      marginTop: "8px",
      transition: "color 0.15s"
    }
  };

  // ============================================================
  // 📦 Media Queries ke liye responsive
  // ============================================================
  const getGridColumns = () => {
    let columns = "repeat(1, minmax(0, 1fr))";
    if (window.innerWidth >= 640 && window.innerWidth < 1024) {
      columns = "repeat(2, minmax(0, 1fr))";
    }
    if (window.innerWidth >= 1024) {
      columns = "repeat(4, minmax(0, 1fr))";
    }
    return columns;
  };

  const [gridColumns, setGridColumns] = React.useState(getGridColumns());

  React.useEffect(() => {
    const handleResize = () => {
      setGridColumns(getGridColumns());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ============================================================
  // 📦 HELPER FUNCTION: Single Icon Box (Easy to Copy)
  // ============================================================
  const SingleIconBox = ({ title, icon, image, link, linkText }) => (
    <div
      style={styles.categoryCard}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, styles.categoryCardHover);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.05)";
      }}
    >
      <h3 style={styles.categoryTitle}>{title}</h3>
      <div style={styles.singleProductGrayBox}>
        {image ? (
          <img
            src={image}
            alt={title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={styles.largeGrayIcon}>{icon}</div>
        )}
      </div>
      <a
        href={link}
        style={styles.categoryLinkAnchor}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#0f766e";
          e.currentTarget.style.textDecoration = "underline";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#0d9488";
          e.currentTarget.style.textDecoration = "none";
        }}
      >
        {linkText} →
      </a>
    </div>
  );

  // ============================================================
  // 📦 HELPER FUNCTION: 4-in-1 Grid Box (Easy to Copy)
  // ============================================================
  const FourGridBox = ({ title, link, linkText, items }) => (
    <div
      style={styles.categoryCard}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, styles.categoryCardHover);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.05)";
      }}
    >
      <h3 style={styles.categoryTitle}>{title}</h3>
      <div style={styles.subFourGrid}>
        {items.map((item, index) => (
          <div key={index} style={styles.fourGridItem}>
            <div style={styles.smallGrayBox}>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.text}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "4px"
                  }}
                />
              ) : (
                item.icon
              )}
            </div>
            <p style={styles.smallGridText}>{item.text}</p>
          </div>
        ))}
      </div>
      <a
        href={link}
        style={styles.categoryLinkAnchor}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#0f766e";
          e.currentTarget.style.textDecoration = "underline";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#0d9488";
          e.currentTarget.style.textDecoration = "none";
        }}
      >
        {linkText} →
      </a>
    </div>
  );

  // ============================================================
  // 📦 RENDER FUNCTION
  // ============================================================
  return (
    <div
      style={{
        ...styles.gridContainer,
        gridTemplateColumns: gridColumns
      }}
    >

      {/* ===== CARD 1: Gaming ===== */}
      <SingleIconBox
        title="Get your game on"
        icon={<FaGamepad />}
        image={Gaming}  // 👈 NEW
        link="#gaming"
        linkText="Shop Gaming →"
      />

      {/* ===== CARD 2: Fashion (4-in-1 Grid with Photos) ===== */}
      <FourGridBox
        title="Shop Fashion for less"
        link="#fashion"
        linkText="See more fashion deals"
        items={[
          { image: fashionImg1, text: "Mens Jeans" },
          { image: fashionImg2, text: "Mens Shirts" },
          { image: fashionImg3, text: "Ladies Wear"},
          { image: fashionImg4, text: "Ladies Kurti"}
        ]}
      />

      {/* ===== CARD 3: Home (4-in-1 Grid with Photos) ===== */}
      <FourGridBox
        title="New home arrivals"
        link="#home-decor"
        linkText="Shop kitchen & decor"
        items={[
          { image: homeImg1, text: "Kitchen & Dining" },
          { image: homeImg2, text: "Home Improvement" },
          { image: homeImg3, text: "Pillows" },
          { image: homeImg4, text: "Bedding & Bath" }
        ]}
      />

      {/* ===== CARD 4: Trending Deals (4-in-1 Grid with Photos) ===== */}
      <FourGridBox
        title="Gear up to get fit"
        link="#gifts"
        linkText="Discover More"
        items={[
          { image: trendImg1, text: "Clothing" },
          { image: trendImg2, text: "Trackers" },
          { image: trendImg3, text: "Equipment" },
          { image: trendImg4, text: "Deals" }
        ]}
      />
      {/* ===== CARD 5: Most-Loved Watches (4-in-1 Grid) ===== */}
      <FourGridBox
        title="Most-loved watches"
        link="#watches"
        linkText="Discover more"
        items={[
          { image: watchImg1, text: "Women" },
          { image: watchImg2, text: "Men" },
          { image: watchImg3, text: "Girls" },
          { image: watchImg4, text: "Boys" }
        ]}
      />
      {/* ===== 🆕 CARD 6: Elevate Your Electronics ===== */}
      <FourGridBox
        title="Elevate your Electronics"
        link="#electronics"
        linkText="Discover more"
        items={[
          { image: elecImg1, text: "Headphones" },
          { image: elecImg2, text: "Tablets" },
          { image: elecImg3, text: "Gaming" },
          { image: elecImg4, text: "Speakers" }
        ]}
      />
      {/* ===== 🆕 CARD 7: Level up your PC here ===== */}
      <FourGridBox
        title="Level up your PC here"
        link="#pc"
        linkText="Discover more"
        items={[
          { image: pcImg1, text: "Laptops" },
          { image: pcImg2, text: "PCs" },
          { image: pcImg3, text: "Hard Drives" },
          { image: pcImg4, text: "Monitors" }
        ]}
      />
      {/* ===== 🆕 CARD 8: Top categories in Kitchen appliances ===== */}
      <FourGridBox
        title="Top categories in Kitchen"
        link="#kitchen"
        linkText="Explore all products in Kitchen"
        items={[
          { image: kitchenImg1, text: "Cooker" },
          { image: kitchenImg2, text: "Kettles" },
          { image: kitchenImg3, text: "Pots and Pans" },
          { image: kitchenImg4, text: "Coffee" }
        ]}
      />

    </div>
  );
};

export default Categories;