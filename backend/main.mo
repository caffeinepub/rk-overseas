import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import List "mo:core/List";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : Nat;
    imageUrl : Text;
    inStock : Nat;
    brand : Text;
    model : Text;
  };

  type Category = {
    id : Nat;
    name : Text;
    description : Text;
  };

  type Inquiry = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    productId : Nat;
    timestamp : Time.Time;
  };

  module Category {
    public func compare(cat1 : Category, cat2 : Category) : Order.Order {
      Nat.compare(cat1.id, cat2.id);
    };
  };

  module Product {
    public func compare(prod1 : Product, prod2 : Product) : Order.Order {
      Nat.compare(prod1.id, prod2.id);
    };
  };

  var nextProductId = 13;
  var nextCategoryId = 6;
  var nextInquiryId = 1;

  let products = Map.empty<Nat, Product>();
  let categories = Map.empty<Nat, Category>();
  let inquiries = Map.empty<Nat, Inquiry>();

  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Float, category : Nat, imageUrl : Text, inStock : Nat, brand : Text, model : Text) : async Nat {
    if (not categories.containsKey(category)) {
      Runtime.trap("Category does not exist");
    };

    let product : Product = {
      id = nextProductId;
      name;
      description;
      price;
      category;
      imageUrl;
      inStock;
      brand;
      model;
    };
    products.add(nextProductId, product);
    nextProductId += 1;
    product.id;
  };

  public shared ({ caller }) func updateProduct(id : Nat, name : Text, description : Text, price : Float, category : Nat, imageUrl : Text, inStock : Nat, brand : Text, model : Text) : async () {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?_) {
        if (not categories.containsKey(category)) {
          Runtime.trap("Category does not exist");
        };
        let updatedProduct : Product = {
          id;
          name;
          description;
          price;
          category;
          imageUrl;
          inStock;
          brand;
          model;
        };
        products.add(id, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?_) {
        products.remove(id);
      };
    };
  };

  public shared ({ caller }) func addCategory(name : Text, description : Text) : async Nat {
    let category : Category = {
      id = nextCategoryId;
      name;
      description;
    };
    categories.add(nextCategoryId, category);
    nextCategoryId += 1;
    category.id;
  };

  public shared ({ caller }) func updateCategory(id : Nat, name : Text, description : Text) : async () {
    switch (categories.get(id)) {
      case (null) { Runtime.trap("Category does not exist") };
      case (?_) {
        let updatedCategory : Category = {
          id;
          name;
          description;
        };
        categories.add(id, updatedCategory);
      };
    };
  };

  public shared ({ caller }) func deleteCategory(id : Nat) : async () {
    switch (categories.get(id)) {
      case (null) { Runtime.trap("Category does not exist") };
      case (?_) {
        categories.remove(id);
      };
    };
  };

  public shared ({ caller }) func addInquiry(name : Text, email : Text, phone : Text, message : Text, productId : Nat) : async Nat {
    let inquiry : Inquiry = {
      id = nextInquiryId;
      name;
      email;
      phone;
      message;
      productId;
      timestamp = Time.now();
    };
    inquiries.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
    inquiry.id;
  };

  public query ({ caller }) func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getCategory(id : Nat) : async Category {
    switch (categories.get(id)) {
      case (null) { Runtime.trap("Category does not exist") };
      case (?category) { category };
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getAllCategories() : async [Category] {
    categories.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(categoryId : Nat) : async [Product] {
    products.values().filter(
      func(p) { p.category == categoryId }
    ).toArray();
  };

  public query ({ caller }) func searchProducts(searchTerm : Text) : async [Product] {
    let lowerTerm = searchTerm.toLower();
    products.values().filter(
      func(p) {
        p.name.toLower().contains(#text lowerTerm) or
        p.description.toLower().contains(#text lowerTerm) or
        p.brand.toLower().contains(#text lowerTerm) or
        p.model.toLower().contains(#text lowerTerm)
      }
    ).toArray();
  };

  public query ({ caller }) func getInquiriesForProduct(productId : Nat) : async [Inquiry] {
    inquiries.values().filter(
      func(i) { i.productId == productId }
    ).toArray();
  };

  public query ({ caller }) func getProductsByCategoryName(categoryName : Text) : async [Product] {
    let categoryId = findCategoryIdByName(categoryName);
    switch (categoryId) {
      case (null) { Runtime.trap("Category not found") };
      case (?id) { productsByCategoryId(id) };
    };
  };

  func findCategoryIdByName(categoryName : Text) : ?Nat {
    let lowerName = categoryName.toLower();
    let found = categories.values().toArray().find(
      func(c) { c.name.toLower().contains(#text lowerName) }
    );
    switch (found) {
      case (?cat) { ?cat.id };
      case (null) { null };
    };
  };

  func productsByCategoryId(categoryId : Nat) : [Product] {
    let filtered = List.empty<Product>();
    for (product in products.values()) {
      if (product.category == categoryId) {
        filtered.add(product);
      };
    };
    filtered.toArray();
  };

  public query ({ caller }) func getAllProductsPaged(page : Nat, pageSize : Nat) : async [Product] {
    let allProducts = products.values().toArray();
    let start = page * pageSize;
    let end = Nat.min(start + pageSize, allProducts.size());

    if (start >= allProducts.size()) {
      return [];
    };

    allProducts.sliceToArray(start, end);
  };

  public query ({ caller }) func getTotalProducts() : async Nat {
    products.size();
  };

  public query ({ caller }) func getAllAvailableProducts() : async [Product] {
    products.values().toArray().filter(
      func(p) { p.inStock > 0 }
    );
  };

  public query ({ caller }) func filterProductsByPrice(minPrice : Float, maxPrice : Float) : async [Product] {
    products.values().toArray().filter(
      func(p) { p.price >= minPrice and p.price <= maxPrice }
    );
  };

  system func preupgrade() {
    // Pre-upgrade logic (not used in this context)
  };

  system func postupgrade() {
    categorySeed();
    productSeed();
  };

  func categorySeed() {
    let category1 : Category = {
      id = 1;
      name = "Kitchen Appliances";
      description = "Home appliances for the kitchen";
    };
    let category2 : Category = {
      id = 2;
      name = "Washing Machines";
      description = "Washing machines and laundry appliances";
    };
    let category3 : Category = {
      id = 3;
      name = "Air Conditioners";
      description = "Cooling and heating appliances";
    };
    let category4 : Category = {
      id = 4;
      name = "Refrigerators";
      description = "Cold storage appliances";
    };
    let category5 : Category = {
      id = 5;
      name = "Small Appliances";
      description = "Various smaller home appliances";
    };

    categories.add(1, category1);
    categories.add(2, category2);
    categories.add(3, category3);
    categories.add(4, category4);
    categories.add(5, category5);
  };

  func productSeed() {
    let product1 : Product = {
      id = 1;
      name = "Samsung 350L Double Door Refrigerator";
      description = "Spacious and frost-free, perfect for large families";
      price = 599.99;
      category = 4;
      imageUrl = "https://images.samsung.double.door.refrigerator";
      inStock = 15;
      brand = "Samsung";
      model = "RT35K5538S8";
    };
    let product2 : Product = {
      id = 2;
      name = "LG 7kg Front Loading Washing Machine";
      description = "Efficient washing with multiple cycle options";
      price = 449.99;
      category = 2;
      imageUrl = "https://images.lg.front.loading.washing.machine";
      inStock = 10;
      brand = "LG";
      model = "F4V5VYP2T";
    };
    let product3 : Product = {
      id = 3;
      name = "Whirlpool Microwave Oven";
      description = "1000W power, multiple presets for easy cooking";
      price = 179.99;
      category = 1;
      imageUrl = "https://images.whirlpool.microwave.oven";
      inStock = 25;
      brand = "Whirlpool";
      model = "MAX 30X SL";
    };
    let product4 : Product = {
      id = 4;
      name = "Daikin 1.5 Ton Split AC";
      description = "Energy efficient cooling, ideal for medium rooms";
      price = 699.99;
      category = 3;
      imageUrl = "https://images.daikin.split.ac";
      inStock = 12;
      brand = "Daikin";
      model = "FTKF50TV";
    };
    let product5 : Product = {
      id = 5;
      name = "Philips Air Fryer";
      description = "Healthy frying with minimal oil, easy to clean";
      price = 129.99;
      category = 5;
      imageUrl = "https://images.philips.air.fryer";
      inStock = 30;
      brand = "Philips";
      model = "HD9220/53";
    };
    let product6 : Product = {
      id = 6;
      name = "Bosch Dishwasher";
      description = "Silent operation, water-saving technology";
      price = 549.99;
      category = 1;
      imageUrl = "https://images.bosch.dishwasher";
      inStock = 8;
      brand = "Bosch";
      model = "SMS46KI03I";
    };
    let product7 : Product = {
      id = 7;
      name = "Panasonic Inverter Refrigerator";
      description = "Smart inverter technology for energy efficiency";
      price = 499.99;
      category = 4;
      imageUrl = "https://images.panasonic.inverter.refrigerator";
      inStock = 20;
      brand = "Panasonic";
      model = "NR-TG35Q1";
    };
    let product8 : Product = {
      id = 8;
      name = "Haier 8kg Top Load Washing Machine";
      description = "Powerful washing, easy-to-use interface";
      price = 379.99;
      category = 2;
      imageUrl = "https://images.haier.top.load.washing.machine";
      inStock = 18;
      brand = "Haier";
      model = "HTW80-1128";
    };
    let product9 : Product = {
      id = 9;
      name = "Sony 43\" 4K Smart TV";
      description = "Crystal clear 4K display with smart features";
      price = 699.99;
      category = 5;
      imageUrl = "https://images.sony.4k.smart.tv";
      inStock = 14;
      brand = "Sony";
      model = "KD-43X7002G";
    };
    let product10 : Product = {
      id = 10;
      name = "Morphy Richards Electric Kettle";
      description = "Stylish design, fast boil technology";
      price = 49.99;
      category = 5;
      imageUrl = "https://images.morphy.richards.electric.kettle";
      inStock = 40;
      brand = "Morphy Richards";
      model = "Voyager Classic";
    };
    let product11 : Product = {
      id = 11;
      name = "Hitachi 1 Ton Inverter AC";
      description = "Silent cooling, great for small rooms";
      price = 599.99;
      category = 3;
      imageUrl = "https://images.hitachi.inverter.ac";
      inStock = 15;
      brand = "Hitachi";
      model = "RSC312KS";
    };
    let product12 : Product = {
      id = 12;
      name = "IFB Front Load Washing Machine";
      description = "Advanced washing cycles, water efficient";
      price = 529.99;
      category = 2;
      imageUrl = "https://images.ifb.front.load.washing.machine";
      inStock = 9;
      brand = "IFB";
      model = "Senator Aqua SX";
    };

    products.add(1, product1);
    products.add(2, product2);
    products.add(3, product3);
    products.add(4, product4);
    products.add(5, product5);
    products.add(6, product6);
    products.add(7, product7);
    products.add(8, product8);
    products.add(9, product9);
    products.add(10, product10);
    products.add(11, product11);
    products.add(12, product12);
  };
};
