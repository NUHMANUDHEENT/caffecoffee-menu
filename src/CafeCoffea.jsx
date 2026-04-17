import { useState, useEffect } from "react";

const G = {
  deep: "#14342B",
  mid: "#1E5C40",
  teal: "#2A7A56",
  soft: "#4CAF78",
  pale: "#D6EDDF",
  cream: "#F5F8F4",
  white: "#FFFFFF",
  text: "#102318",
  textMid: "#3A5E48",
  textLight: "#7AAB8C",
  gold: "#B8935A",
  goldLight: "#F3E8D6",
};

const menuItems = [
  // SHAKES
  { id: 1, category: "shakes", name: "Peanut Banana Swirl", price: 220, short: "Rich peanut & ripe bananas blended to perfection.", detail: "A thick, creamy blend of rich peanut butter and perfectly ripe bananas. Smooth, filling, and absolutely delicious — comfort in a glass.", tag: "Fan Favourite" },
  { id: 2, category: "shakes", name: "Mississippi Mud", price: 250, short: "A decadent shake with brownies, choco chips & ice cream.", detail: "Inspired by the classic Mississippi mud dessert — loaded with fudgy brownie chunks, semi-sweet choco chips, and rich vanilla ice cream blended into pure indulgence.", tag: "Best Seller" },
  { id: 3, category: "shakes", name: "Popcorn Shake", price: 250, short: "Smooth vanilla ice cream with popcorn flavor and caramel syrup.", detail: "A playful carnival-inspired shake: smooth vanilla ice cream infused with buttery popcorn flavor, finished with a generous drizzle of golden caramel syrup.", tag: "" },
  { id: 4, category: "shakes", name: "Berry Cookie", price: 260, short: "Creamy blend of sweet blueberries & choco cookies.", detail: "Fresh sweet blueberries blended with luscious cream and crushed chocolate cookies — a purple dream in every sip.", tag: "" },
  { id: 5, category: "shakes", name: "Nutri Fusion", price: 270, short: "A healthy blend of cashew, dry fig, walnuts & iced milk.", detail: "Packed with wholesome goodness — premium cashews, sweet dry figs, and crunchy walnuts blended with chilled milk for a shake that's as nourishing as it is delicious.", tag: "Healthy Pick" },
  { id: 6, category: "shakes", name: "Euphoria", price: 280, short: "A delightful mix of ice cream scoops & almonds.", detail: "Layers of premium ice cream scoops blended with roasted almonds — a euphoric indulgence that lives up to its name.", tag: "" },
  { id: 7, category: "shakes", name: "Lotus Biscoff", price: 290, short: "Lotus Biscoff spread & cookies topped with whipped cream.", detail: "Creamy Lotus Biscoff spread and crushed cookies blended into a velvety shake, crowned with billowy whipped cream and extra crumbled cookies on top.", tag: "Chef's Special" },

  // DESSERTS
  { id: 8, category: "desserts", name: "Choco Callebaut", price: 250, short: "Made with rich Callebaut chocolate for a decadent experience.", detail: "A premium slice of cake crafted using authentic Belgian Callebaut chocolate. Deep, intense cocoa flavour with a silky ganache finish — the definitive chocolate experience.", tag: "Premium" },
  { id: 9, category: "desserts", name: "Biscoff Cheese", price: 290, short: "A creamy cheesecake infused with Biscoff flavor.", detail: "A luxuriously smooth baked cheesecake base infused with the warm spiced caramel flavour of Lotus Biscoff. Topped with a glossy Biscoff glaze and cookie crumble.", tag: "Best Seller" },
  { id: 10, category: "desserts", name: "Mellow Marvel", price: 250, short: "A light and fluffy cake perfect for any occasion.", detail: "A beautifully airy, cloud-soft sponge cake with delicate frosting. Light, mellow, and satisfying — perfect when you want something sweet without the heaviness.", tag: "" },
  { id: 11, category: "desserts", name: "Sizzling Brownie", price: 280, short: "A warm, chocolatey delight served sizzling hot.", detail: "A rich fudgy brownie served warm and sizzling, paired with a scoop of cold vanilla ice cream. The contrast of hot and cold is pure magic.", tag: "Must Try" },

  // SALADS
  { id: 12, category: "salads", name: "Waldorf Chicken Salad", price: 420, short: "Chicken, Apple, Grapes, Walnuts, Iceberg.", detail: "A classic Waldorf salad elevated with tender grilled chicken. Crisp iceberg, sweet apple slices, juicy grapes, and crunchy walnuts tossed in a creamy dressing.", tag: "" },
  { id: 13, category: "salads", name: "Nicoise Salad", price: 370, short: "Cherry Tomatoes, Black Olives, Boiled Eggs, Iceberg, Tuna.", detail: "A French classic — cherry tomatoes, briny black olives, perfectly boiled eggs, crisp iceberg, and premium tuna, dressed in a Dijon vinaigrette.", tag: "" },
  { id: 14, category: "salads", name: "Caesar Salad", price: 320, short: "Veg salad with cherry tomatoes, iceberg & Caesar dressing.", detail: "Crisp iceberg lettuce and fresh cherry tomatoes dressed in our house-made Caesar dressing with croutons and Parmesan shavings. Add-on chicken available for ₹50.", tag: "Add Chicken +₹50" },

  // APPETIZERS
  { id: 15, category: "appetizers", name: "French Fries", price: 120, short: "Golden crispy classic fries.", detail: "Light, crispy, golden-fried potato fries. Perfectly salted and served hot — the timeless classic snack.", tag: "" },
  { id: 16, category: "appetizers", name: "Cajun Fries", price: 150, short: "Spiced fries with Cajun seasoning.", detail: "Crispy fries tossed in a bold blend of Cajun spices — smoky, spicy, and absolutely addictive.", tag: "Spicy" },
  { id: 17, category: "appetizers", name: "Chicken Strips", price: 220, short: "A tantalizing treat of golden crispy chicken strips.", detail: "Tender chicken breast strips coated in a perfectly seasoned crispy batter, fried to a gorgeous golden crunch. Served with dipping sauce.", tag: "" },
  { id: 18, category: "appetizers", name: "Double Dip Loaded Fries", price: 260, short: "Fries smothered in two dips with caramelized onion.", detail: "A mountain of crispy fries loaded with two indulgent dips and sweet caramelized onions. Available in Chicken or Beef. ₹250 (Chicken) / ₹270 (Beef).", tag: "Chicken ₹250 | Beef ₹270" },

  // WRAPS
  { id: 19, category: "wraps", name: "Fried Chicken Wrap", price: 199, short: "Loaded with Fried Chicken & Seasoned to Perfection.", detail: "A warm, soft wrap generously loaded with crispy fried chicken, fresh vegetables, and our special seasoning — satisfying, flavourful, and great value.", tag: "" },
  { id: 20, category: "wraps", name: "Veg Wrap", price: 160, short: "A fresh vegetable wrap.", detail: "A wholesome wrap filled with an assortment of fresh vegetables, seasoned and wrapped in a soft tortilla. Light, healthy, and delicious.", tag: "Vegetarian" },

  // LOAF STACK
  { id: 21, category: "loaf", name: "BLT", price: 290, short: "Beef, Lettuce & Tomato stack.", detail: "A hearty stack of savoury beef, crisp lettuce, and ripe tomatoes between toasted loaf — a classic done right.", tag: "" },
  { id: 22, category: "loaf", name: "LVS", price: 250, short: "Loaf Vegetable Sandwich.", detail: "A wholesome vegetable sandwich on toasted loaf — packed with fresh greens and vegetable goodness.", tag: "Vegetarian" },

  // SANDWICHES
  { id: 23, category: "sandwiches", name: "Grilled Vegetable Sandwich", price: 270, short: "Toasted bread with grilled vegetables.", detail: "Perfectly grilled seasonal vegetables on toasted artisan bread — simple, fresh, and incredibly satisfying.", tag: "Vegetarian" },
  { id: 24, category: "sandwiches", name: "Grilled Chicken Sandwich", price: 299, short: "Toasted bread with grilled chicken, Feta Cheese & Gherkins.", detail: "Juicy grilled chicken breast with tangy feta cheese and crisp gherkins on toasted bread — a Mediterranean-inspired favourite.", tag: "" },
  { id: 25, category: "sandwiches", name: "Chicken Club Sandwich", price: 340, short: "Grilled Chicken, Fried Egg, Lettuce, Tomato & Chef's Dressing.", detail: "A triple-layered club sandwich with golden grilled chicken, a fried egg, fresh lettuce and tomato, all bound together with the chef's special dressing.", tag: "Chef's Choice" },
  { id: 26, category: "sandwiches", name: "Beef Club Sandwich", price: 380, short: "Grilled beef, Fried Egg, Lettuce, Tomato, Cucumber & Chef's Dressing.", detail: "A premium beef club — grilled beef patty, fried egg, crisp lettuce, ripe tomato, cool cucumber, and the chef's signature dressing on toasted bread.", tag: "" },

  // BURGERS
  { id: 27, category: "burgers", name: "Coffea Chicken Burger", price: 230, short: "Grilled Chicken patty, Jalapenos, Lettuce, Tomato & Chef Special Dressing.", detail: "Our signature Coffea chicken burger — a juicy grilled chicken patty topped with fiery jalapenos, fresh lettuce, ripe tomato, and the Coffea chef's special dressing.", tag: "Signature" },
  { id: 28, category: "burgers", name: "Coffea Beef Burger", price: 270, short: "Grilled Beef Patty, Jalapenos, Lettuce, Tomato & Chef Special Dressing.", detail: "Our signature beef burger — a flavourful grilled beef patty with jalapenos, lettuce, tomato, and the Coffea chef's special dressing in a toasted bun.", tag: "Signature" },
  { id: 29, category: "burgers", name: "Zesty Chicken Burger", price: 270, short: "Crunchy Chicken Fillet, Iceberg, cheese layer & BBQ Fries.", detail: "A crunchy chicken fillet burger with crisp iceberg lettuce, a melted cheese layer, and served alongside BBQ fries for maximum satisfaction.", tag: "" },
  { id: 30, category: "burgers", name: "Ham Burger", price: 290, short: "Grilled Beef Patty, Caramelized Onion, Ham & BBQ sauce.", detail: "A rich, hearty burger with a grilled beef patty, sweet caramelized onions, savoury ham, and a generous slather of smoky BBQ sauce.", tag: "" },
  { id: 31, category: "burgers", name: "Smash Burger", price: 350, short: "Smashed Double Beef Patty with Double Cheese & Chef's Dressing.", detail: "A true smash burger — two thin beef patties smashed to perfection for maximum crust, double cheese melted over each, with the chef's special dressing. Pure burger bliss.", tag: "Premium" },

  // PASTA
  { id: 32, category: "pasta", name: "Penne Arabiata", price: 250, short: "Italian Tomato Based Sauce with Penne Pasta.", detail: "Classic penne pasta in a bold, fiery Italian arrabiata tomato sauce. Simple, rustic, and deeply satisfying. Add chicken for ₹70.", tag: "" },
  { id: 33, category: "pasta", name: "Mac & Cheese", price: 260, short: "Rich Creamy Macaroni Pasta with Cheese Sauce.", detail: "Comforting elbow macaroni bathed in a gloriously rich, creamy cheese sauce. The ultimate comfort food, made with real cheese.", tag: "Comfort Food" },
  { id: 34, category: "pasta", name: "Spaghetti Arabiata", price: 270, short: "Italian Tomato Sauce with Spaghetti Pasta.", detail: "Al dente spaghetti tossed in a vibrant spiced Italian tomato arrabiata sauce — a timeless Italian classic. Add chicken for ₹70.", tag: "" },
  { id: 35, category: "pasta", name: "Penne Alfredo", price: 280, short: "Penne Pasta with Mushrooms in Rich & Creamy Sauce.", detail: "Silky penne pasta tossed with earthy sautéed mushrooms in a luxuriously rich and creamy Alfredo sauce. Indulgent and deeply satisfying. Add chicken for ₹70.", tag: "Chef's Pick" },
];

const categories = [
  { id: "all", label: "All Items", icon: "✦" },
  { id: "shakes", label: "Shakes", icon: "🥤" },
  { id: "desserts", label: "Desserts", icon: "🍰" },
  { id: "salads", label: "Salads", icon: "🥗" },
  { id: "appetizers", label: "Appetizers", icon: "🍟" },
  { id: "wraps", label: "Wraps", icon: "🌯" },
  { id: "loaf", label: "Loaf Stack", icon: "🥪" },
  { id: "sandwiches", label: "Sandwiches", icon: "🥙" },
  { id: "burgers", label: "Burgers", icon: "🍔" },
  { id: "pasta", label: "Pasta", icon: "🍝" },
];

const categoryColors = {
  shakes: "#2A7A56",
  desserts: "#8B5CF6",
  salads: "#16A34A",
  appetizers: "#D97706",
  wraps: "#0891B2",
  loaf: "#B45309",
  sandwiches: "#BE185D",
  burgers: "#DC2626",
  pasta: "#7C3AED",
};

const categoryImages = {
  shakes: "https://thebigmansworld.com/protein-shakes/",
  desserts: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80",
  salads: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80",
  appetizers: "https://www.allrecipes.com/recipe/50223/homemade-crispy-seasoned-french-fries/",
  wraps: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80",
  loaf: "https://images.unsplash.com/photo-1558229986-e265c0be31d6?w=400&q=80",
  sandwiches: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80",
  burgers: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
  pasta: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80",
};

function ItemCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false);
  const catColor = categoryColors[item.category] || G.teal;
  const imageUrl = categoryImages[item.category] || categoryImages.shakes;

  return (
    <div
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: G.white,
        borderRadius: 20,
        border: `1.5px solid ${hovered ? G.soft : "#E2EDE6"}`,
        padding: "16px",
        cursor: "pointer",
        transition: "all 0.22s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px rgba(20,52,43,0.12)" : "0 2px 8px rgba(20,52,43,0.05)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        gap: "16px",
        alignItems: "stretch"
      }}
    >
      {item.tag && (
        <span style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: `${catColor}18`,
          color: catColor,
          fontSize: 10,
          fontWeight: 600,
          padding: "3px 8px",
          borderRadius: 20,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          zIndex: 10,
        }}>{item.tag}</span>
      )}

      {/* Image Side */}
      <div style={{
        flex: "0 0 110px",
        height: "100%",
        minHeight: "110px",
        borderRadius: 14,
        overflow: "hidden",
        position: "relative",
      }}>
        <img src={imageUrl} alt={item.name} style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.4s ease",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }} />
      </div>

      {/* Content Side */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
        <h3 style={{
          margin: "0 0 6px",
          fontSize: 16,
          fontWeight: 700,
          color: G.text,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          lineHeight: 1.3,
          paddingRight: item.tag ? 60 : 0,
        }}>{item.name}</h3>

        <p style={{
          margin: "0 0 12px",
          fontSize: 13,
          color: G.textMid,
          lineHeight: 1.4,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>{item.short}</p>

        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontSize: 17,
            fontWeight: 800,
            color: G.deep,
            fontFamily: "'Cormorant Garamond', Georgia, serif",
          }}>₹{item.price}</span>
        </div>
      </div>
    </div>
  );
}

function ItemDetail({ item, onBack }) {
  const catColor = categoryColors[item.category] || G.teal;
  const cat = categories.find(c => c.id === item.category);
  const imageUrl = categoryImages[item.category] || categoryImages.shakes;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto'
      }}
      onClick={onBack}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 540,
          background: G.cream,
          borderRadius: 32,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
          margin: 'auto'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onBack}
          style={{
            position: 'absolute',
            top: 16, right: 16,
            zIndex: 10,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: 'blur(4px)',
            border: "none",
            borderRadius: '50%',
            color: "#fff",
            fontSize: 24,
            width: 40, height: 40,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >×</button>

        <div style={{
          position: "relative",
          overflow: "hidden",
        }}>
          <img src={imageUrl} alt={item.name} style={{
            width: "100%",
            height: "260px",
            objectFit: "cover",
            display: "block"
          }} />
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            background: "linear-gradient(to top, rgba(20,52,43,0.95), transparent)",
            padding: "40px 24px 20px",
          }}>
            {item.tag && (
              <span style={{
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                backdropFilter: "blur(4px)",
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: 20,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                display: "inline-block",
                marginBottom: 8,
              }}>{item.tag}</span>
            )}
            <h1 style={{
              margin: "0 0 6px",
              fontSize: 28,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.1,
            }}>{item.name}</h1>
            <p style={{
              margin: 0,
              fontSize: 14,
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.4,
            }}>{item.short}</p>
          </div>
        </div>

        <div style={{ padding: "24px" }}>
          <div style={{
            background: G.white,
            borderRadius: 20,
            padding: "24px",
            marginBottom: 16,
            border: "1.5px solid #E2EDE6",
          }}>
            <h2 style={{
              margin: "0 0 12px",
              fontSize: 13,
              fontWeight: 700,
              color: G.textLight,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>About this item</h2>
            <p style={{
              margin: 0,
              fontSize: 15,
              color: G.textMid,
              lineHeight: 1.75,
            }}>{item.detail}</p>
          </div>

          <div style={{
            background: G.deep,
            borderRadius: 20,
            padding: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div>
              <p style={{ margin: "0 0 4px", color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Price</p>
              <p style={{
                margin: 0,
                fontSize: 32,
                fontWeight: 800,
                color: G.white,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}>₹{item.price}</p>
            </div>
            <div style={{
              background: G.pale,
              borderRadius: 12,
              padding: "10px 18px",
              textAlign: "center",
            }}>
              <p style={{ margin: "0 0 2px", fontSize: 11, color: G.textMid, fontWeight: 600 }}>CATEGORY</p>
              <p style={{ margin: 0, fontSize: 14, color: G.deep, fontWeight: 700 }}>{cat?.label}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CafeCoffeaMenu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = menuItems.filter(item => {
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    const matchSearch = search === "" ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.short.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${G.cream}; font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${G.pale}; border-radius: 4px; }
        .cat-scroll { display: flex; gap: 10px; overflow-x: auto; padding: 0 20px 4px; scrollbar-width: none; }
        .cat-scroll::-webkit-scrollbar { display: none; }
        .menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; padding: 20px; }
        @media (max-width: 480px) { .menu-grid { grid-template-columns: 1fr; } }
        input::placeholder { color: ${G.textLight}; }
        input:focus { outline: none; border-color: ${G.soft} !important; }
      `}</style>

      <div style={{ minHeight: "100vh", background: G.cream }}>
        {/* Header */}
        <div style={{
          background: G.deep,
          padding: "0 20px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}>
          <div style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "18px 0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 42, height: 42,
                borderRadius: 12,
                background: G.pale,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
              }}>☕</div>
              <div>
                <h1 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: G.white,
                  lineHeight: 1,
                  letterSpacing: "0.01em",
                }}>Café & Coffea</h1>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>www.cafecoffea.in</p>
              </div>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: 10,
              padding: "6px 14px",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500 }}>
                {menuItems.length} items
              </span>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div style={{ padding: "16px 20px 8px", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ position: "relative" }}>
            <span style={{
              position: "absolute", left: 14, top: "50%",
              transform: "translateY(-50%)",
              fontSize: 16, color: G.textLight,
            }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search menu…"
              style={{
                width: "100%",
                padding: "12px 16px 12px 42px",
                borderRadius: 14,
                border: `1.5px solid #D6EDE0`,
                background: G.white,
                fontSize: 14,
                color: G.text,
                fontFamily: "'DM Sans', sans-serif",
                transition: "border-color 0.2s",
              }}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ maxWidth: 900, margin: "0 auto", paddingTop: 12 }}>
          <div className="cat-scroll">
            {categories.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    flexShrink: 0,
                    padding: "9px 16px",
                    borderRadius: 24,
                    border: isActive ? `1.5px solid ${G.teal}` : "1.5px solid #D6EDE0",
                    background: isActive ? G.deep : G.white,
                    color: isActive ? G.white : G.textMid,
                    fontSize: 13,
                    fontWeight: isActive ? 700 : 500,
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "all 0.18s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ fontSize: 14 }}>{cat.icon}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section heading */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 20px 4px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 22,
              fontWeight: 700,
              color: G.text,
            }}>
              {activeCategory === "all" ? "Full Menu" : categories.find(c => c.id === activeCategory)?.label}
            </h2>
            <span style={{ fontSize: 13, color: G.textLight, fontWeight: 500 }}>
              {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div style={{ width: 40, height: 3, background: G.soft, borderRadius: 2, marginTop: 6 }} />
        </div>

        {/* Menu Grid */}
        {filtered.length > 0 ? (
          <div className="menu-grid" style={{ maxWidth: 900, margin: "0 auto" }}>
            {filtered.map(item => (
              <ItemCard key={item.id} item={item} onClick={setSelectedItem} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🍃</div>
            <p style={{ color: G.textMid, fontSize: 15 }}>No items found for "{search}"</p>
            <button
              onClick={() => setSearch("")}
              style={{
                marginTop: 12, padding: "8px 20px",
                background: G.deep, color: G.white,
                border: "none", borderRadius: 10,
                fontSize: 13, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >Clear search</button>
          </div>
        )}

        {/* Footer */}
        <div style={{
          textAlign: "center",
          padding: "32px 20px",
          borderTop: `1px solid ${G.pale}`,
          marginTop: 16,
        }}>
          <p style={{ fontSize: 12, color: G.textLight }}>
            Prices are inclusive of all taxes · Café Coffea © 2025
          </p>
          <p style={{ fontSize: 12, color: G.textLight, marginTop: 4 }}>www.cafecoffea.in</p>
        </div>
      </div>

      {selectedItem && (
        <ItemDetail item={selectedItem} onBack={() => setSelectedItem(null)} />
      )}
    </>
  );
}
