const products = [
    {
        id: 1,
        title: "Asymmetric Silk Midi Dress",
        category: "new-season",
        price: 245.00,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
        description: "Fluid silk blend with asymmetric draping and structured bodice lines.",
        badge: "New"
    },
    {
        id: 2,
        title: "Structured Wool Blazer",
        category: "women",
        price: 320.00,
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
        description: "Tailored wool blend coat designed with sharp lines and relaxed shoulders.",
        badge: "Best"
    },
    {
        id: 3,
        title: "Minimalist Leather Tote",
        category: "accessories",
        price: 185.00,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
        description: "Crafted from supple Italian leather with minimalist hardware and generous capacity.",
        badge: "Hot"
    },
    {
        id: 4,
        title: "Organic Cotton Poplin Shirt",
        category: "men",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
        description: "Crisp organic cotton shirt featuring relaxed tailoring and curved hem details.",
        badge: "Special"
    },
    {
        id: 5,
        title: "Handcrafted Gold Signet Ring",
        category: "jewelry",
        price: 95.00,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
        description: "Solid sterling silver ring finished with a thick 18k gold vermeil coating.",
        badge: "Best"
    },
    {
        id: 6,
        title: "Pleated Midi Skirt",
        category: "women",
        price: 160.00,
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80",
        description: "Delicate pleating combined with a fluid drape for effortless everyday movement.",
        badge: "New"
    },
    {
        id: 7,
        title: "Cashmere Ribbed Turtleneck",
        category: "women",
        price: 290.00,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
        description: "Supremely soft Mongolian cashmere knit tailored with a cozy ribbed collar.",
        badge: "Best"
    },
    {
        id: 8,
        title: "Tailored Linen Trouser",
        category: "men",
        price: 155.00,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
        description: "Breathable pure European linen trousers with a sleek flat-front waistband.",
        badge: "New"
    },
    {
        id: 9,
        title: "Architectural Pearl Hoops",
        category: "jewelry",
        price: 110.00,
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
        description: "Modern sculptural brass hoops suspended with natural freshwater baroque pearls.",
        badge: "Hot"
    },
    {
        id: 10,
        title: "Suede Crossbody Pouch",
        category: "accessories",
        price: 210.00,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
        description: "Supple calfskin suede pouch featuring a magnetic snap closure and slim strap.",
        badge: "New"
    },
    {
        id: 11,
        title: "Oversized Cotton Trench Coat",
        category: "new-season",
        price: 380.00,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
        description: "Classic weather-resistant twill coat updated with dropped shoulders and deep pockets.",
        badge: "Best"
    },
    {
        id: 12,
        title: "Merino Wool Crewneck Sweater",
        category: "men",
        price: 175.00,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
        description: "Lightweight superfine merino wool knit crafted for seamless layering.",
        badge: "New"
    },
    {
        id: 13,
        title: "Silk Charmeuse Slip Dress",
        category: "women",
        price: 260.00,
        image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fb1b?auto=format&fit=crop&w=800&q=80",
        description: "Lustrous bias-cut silk dress with delicate spaghetti straps and a clean V-neckline.",
        badge: "Hot"
    },
    {
        id: 14,
        title: "Raw Brass Cuff Bracelet",
        category: "jewelry",
        price: 75.00,
        image: "https://images.unsplash.com/photo-1611591475269-ad6223500201?auto=format&fit=crop&w=800&q=80",
        description: "Hand-hammered architectural cuff bracelet designed to mold comfortably to the wrist.",
        badge: "Special"
    },
    {
        id: 15,
        title: "Structured Canvas Weekender",
        category: "accessories",
        price: 295.00,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        description: "Heavy-duty waxed cotton canvas travel bag reinforced with full-grain bridle leather.",
        badge: "Best"
    },
    {
        id: 16,
        title: "Ribbed Knit Cardigan",
        category: "women",
        price: 195.00,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
        description: "Relaxed-fit organic cotton cardigan with horn-style buttons and deep patch pockets.",
        badge: "New"
    },
    {
        id: 17,
        title: "Pique Cotton Polo Shirt",
        category: "men",
        price: 90.00,
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
        description: "Breathable organic cotton pique knit with a tailored collar and natural mother-of-pearl buttons.",
        badge: "Hot"
    },
    {
        id: 18,
        title: "Geometric Layered Pendant",
        category: "jewelry",
        price: 125.00,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
        description: "Brushed gold vermeil pendant suspended on a delicate adjustable trace chain.",
        badge: "Best"
    },
    {
        id: 19,
        title: "Double-Breasted Linen Blazer",
        category: "new-season",
        price: 310.00,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
        description: "Crisp structured linen jacket tailored with classic horn buttons and interior lining.",
        badge: "New"
    },
    {
        id: 20,
        title: "Minimalist Leather Card Holder",
        category: "accessories",
        price: 65.00,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
        description: "Slim vegetable-tanned leather card wallet featuring four slots and a central pocket.",
        badge: "Best"
    },
    {
        id: 21,
        title: "Wide-Leg Cotton Trousers",
        category: "women",
        price: 170.00,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
        description: "High-waisted tailored trousers with crisp front pleats and a relaxed wide-leg silhouette.",
        badge: "New"
    },
    {
        id: 22,
        title: "Heavyweight Cotton Hoodie",
        category: "men",
        price: 140.00,
        image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
        description: "Luxury fleece-lined organic cotton hoodie featuring a double-lined hood and clean pouch pocket.",
        badge: "Hot"
    },
    {
        id: 23,
        title: "Sterling Silver Band Ring",
        category: "jewelry",
        price: 85.00,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
        description: "Subtle organic-textured band cast in solid 925 sterling silver with a satin matte finish.",
        badge: "Best"
    },
    {
        id: 24,
        title: "Chunky Acetate Sunglasses",
        category: "accessories",
        price: 150.00,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
        description: "Hand-polished Mazzucchelli acetate frames fitted with premium gradient UV lenses.",
        badge: "New"
    },
    {
        id: 25,
        title: "Cropped Knit Vest",
        category: "new-season",
        price: 115.00,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
        description: "Layerable cotton-blend knit vest with ribbed trims and a boxy modern cut.",
        badge: "Hot"
    },
    {
        id: 26,
        title: "Slim Fit Chino Trousers",
        category: "men",
        price: 110.00,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
        description: "Stretch-cotton twill chinos garment-dyed for a soft, broken-in feel from day one.",
        badge: "Best"
    },
    {
        id: 27,
        title: "Silk Twill Neck Scarf",
        category: "accessories",
        price: 70.00,
        image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80",
        description: "Pure Italian silk scarf featuring a bespoke abstract studio artwork print and hand-rolled edges.",
        badge: "New"
    },
    {
        id: 28,
        title: "Structured Leather Bucket Bag",
        category: "accessories",
        price: 240.00,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
        description: "Clean cylindrical leather bag with a secure drawstring closure and adjustable shoulder strap.",
        badge: "Best"
    },
    {
        id: 29,
        title: "Textured Knit Midi Dress",
        category: "women",
        price: 230.00,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
        description: "Form-fitting ribbed knit midi dress designed with comfortable stretch and a flattering neckline.",
        badge: "Hot"
    },
    {
        id: 30,
        title: "Minimalist Gold Choker",
        category: "jewelry",
        price: 145.00,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
        description: "Rigid collar necklace crafted in solid brass with a gleaming 18k gold vermeil finish.",
        badge: "New"
    },
    {
        id: 31,
        title: "Organic Linen Overshirt",
        category: "men",
        price: 135.00,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
        description: "Versatile lightweight linen shirt jacket equipped with dual chest patch pockets.",
        badge: "Best"
    },
    {
        id: 32,
        title: "Sleeveless Ribbed Tank",
        category: "women",
        price: 55.00,
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
        description: "Essential organic cotton ribbed tank top tailored with a close fit and clean bound edges.",
        badge: "New"
    },
    {
        id: 33,
        title: "Tailored Wool Overcoat",
        category: "new-season",
        price: 450.00,
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
        description: "Luxurious heavyweight wool-cashmere blend coat with structured lapels and deep welt pockets.",
        badge: "Hot"
    },
    {
        id: 34,
        title: "Beaded Drop Earrings",
        category: "jewelry",
        price: 80.00,
        image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=800&q=80",
        description: "Hand-strung glass seed beads paired with sterling silver posts for effortless evening wear.",
        badge: "Best"
    },
    {
        id: 35,
        title: "Leather Belt with Brushed Buckle",
        category: "accessories",
        price: 95.00,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
        description: "Full-grain Italian cowhide belt secured with a custom matte brushed metal buckle.",
        badge: "New"
    },
    {
        id: 36,
        title: "Cotton Denim Chore Jacket",
        category: "men",
        price: 180.00,
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80",
        description: "Sturdy Japanese selvedge denim utility jacket featuring reinforced bar-tack stitching.",
        badge: "Hot"
    },
    {
        id: 37,
        title: "Wrap-Style Midi Skirt",
        category: "women",
        price: 150.00,
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80",
        description: "Effortless wrap skirt crafted from breathable lyocell twill with an adjustable tie waist.",
        badge: "Best"
    },
    {
        id: 38,
        title: "Architectural Cufflinks",
        category: "jewelry",
        price: 90.00,
        image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80",
        description: "Solid sterling silver geometric cufflinks designed for formal tailoring and crisp cuffs.",
        badge: "New"
    },
    {
        id: 39,
        title: "Cashmere Scarf",
        category: "accessories",
        price: 160.00,
        image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80",
        description: "Sumptuously soft fringed winter scarf woven from pure Inner Mongolian cashmere yarn.",
        badge: "Best"
    },
    {
        id: 40,
        title: "Pleated Cotton Shorts",
        category: "men",
        price: 85.00,
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80",
        description: "Tailored mid-length cotton shorts featuring clean front pleats and side slip pockets.",
        badge: "New"
    },
    {
        id: 41,
        title: "Satin Evening Blouse",
        category: "women",
        price: 140.00,
        image: "https://images.unsplash.com/photo-1551803091-e2038746321e?auto=format&fit=crop&w=800&q=80",
        description: "Fluid triacetate satin blouse with buttoned cuffs and a graceful boat neckline.",
        badge: "Hot"
    },
    {
        id: 42,
        title: "Minimalist Sterling Ring Set",
        category: "jewelry",
        price: 130.00,
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
        description: "Stackable trio of polished and hammered solid sterling silver rings.",
        badge: "Special"
    },
    {
        id: 43,
        title: "Canvas Messenger Bag",
        category: "accessories",
        price: 195.00,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
        description: "Durable urban canvas bag equipped with quick-release brass clasps and laptop sleeve.",
        badge: "New"
    },
    {
        id: 44,
        title: "Ribbed Merino Beanie",
        category: "accessories",
        price: 60.00,
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80",
        description: "Cozy folded brim beanie knit from itch-free extrafine merino wool yarn.",
        badge: "Best"
    },
    {
        id: 45,
        title: "Utility Puffer Vest",
        category: "new-season",
        price: 210.00,
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
        description: "Lightweight quilted vest filled with recycled synthetic down insulation for core warmth.",
        badge: "Hot"
    },
    {
        id: 46,
        title: "Striped Cotton Sailor Shirt",
        category: "men",
        price: 95.00,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
        description: "Classic yarn-dyed French terry stripe top featuring a relaxed boxy silhouette.",
        badge: "New"
    },
    {
        id: 47,
        title: "Leather Crossbody Camera Bag",
        category: "accessories",
        price: 175.00,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",
        description: "Compact pebble-grain leather bag with dual zipper compartments and an adjustable strap.",
        badge: "Best"
    },
    {
        id: 48,
        title: "Asymmetric Gold Vermeil Earrings",
        category: "jewelry",
        price: 115.00,
        image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
        description: "Sculpted drop earrings finished with a polished 18k gold vermeil coating.",
        badge: "New"
    },
    {
        id: 49,
        title: "Structured Blazer Dress",
        category: "new-season",
        price: 290.00,
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
        description: "Tailored tuxedo-style blazer dress featuring sharp lapels and double-breasted buttons.",
        badge: "Special"
    },
    {
        id: 50,
        title: "Pure Silk Pocket Square",
        category: "accessories",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80",
        description: "Hand-rolled pure silk pocket square featuring subtle tonal jacquard motifs.",
        badge: "Best"
    }
];

// Helper functions for filtering and retrieving products across views
function getProductsByCategory(category) {
    if (!category || category === 'all') return products;
    return products.filter(p => p.category === category);
}

function getProductById(id) {
    return products.find(p => p.id === Number(id));
}