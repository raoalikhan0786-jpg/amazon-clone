// सभी होमपेज से जुड़े कंपोनेंट्स इम्पोर्ट किए गए हैं
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Trending from "../components/Trending";
import Footer from "../components/Footer"; // 🌟 बड़े फुटर को यहाँ होमपेज पर इम्पोर्ट किया गया है

const Home = () => {
  return (
    <>
      {/* 1. अमेज़न स्टाइल मुख्य हीरो बैनर */}
      <Hero />

      {/* 2. कैटेगरीज ग्रिड सेक्शन */}
      <Categories />

      {/* 3. ट्रेंडिंग प्रोडक्ट्स ग्रिड सेक्शन */}
      <Trending />

      {/* 🌟 4. बड़ा फुटर - अब सिर्फ फ्रंट पेज (Home) पर सबसे नीचे परफेक्टली लोड होगा */}
      <Footer />
    </>
  );
};

export default Home;