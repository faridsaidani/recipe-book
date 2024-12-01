const recipes = [
  {
    id: 1,
    title: "Pancakes",
    description:
      "Fluffy pancakes with syrup, perfect for a cozy breakfast. These pancakes are made from a simple batter of flour, milk, and eggs, and are cooked to golden perfection. Serve with maple syrup, fresh fruit, or whipped cream for a delightful start to your day.",
    time: "20 mins",
    ingredients: [
      { id: 1, name: "Flour" },
      { id: 2, name: "Milk" },
      { id: 3, name: "Eggs" },
    ],
    difficulty: "Easy",
    category: "Breakfast",
  },
  {
    id: 2,
    title: "Spaghetti Carbonara",
    description:
      "A creamy and savory Italian classic, Spaghetti Carbonara combines pasta with a rich sauce made of eggs, Parmesan cheese, pancetta, and black pepper. Quick to prepare yet incredibly flavorful, this dish is perfect for a hearty dinner or a special occasion meal.",
    time: "30 mins",
    ingredients: [
      { id: 1, name: "Spaghetti" },
      { id: 2, name: "Eggs" },
      { id: 3, name: "Parmesan cheese" },
      { id: 4, name: "Pancetta" },
      { id: 5, name: "Black pepper" },
    ],
    difficulty: "Medium",
    category: "Dinner",
  },
  {
    id: 3,
    title: "Chicken Caesar Salad",
    description:
      "A fresh and satisfying salad featuring tender grilled chicken, crisp romaine lettuce, crunchy croutons, and a creamy Caesar dressing. Topped with shaved Parmesan cheese, this classic dish is a balanced meal that's light yet fulfilling.",
    time: "25 mins",
    ingredients: [
      { id: 1, name: "Romaine lettuce" },
      { id: 2, name: "Chicken breast" },
      { id: 3, name: "Croutons" },
      { id: 4, name: "Caesar dressing" },
      { id: 5, name: "Parmesan cheese" },
    ],
    difficulty: "Easy",
    category: "Lunch",
  },
  {
    id: 4,
    title: "Beef Stroganoff",
    description:
      "A creamy and comforting dish, Beef Stroganoff is made with tender strips of beef cooked in a savory mushroom and sour cream sauce. Serve it over buttered noodles or rice for a hearty meal that will satisfy any appetite.",
    time: "40 mins",
    ingredients: [
      { id: 1, name: "Beef strips" },
      { id: 2, name: "Mushrooms" },
      { id: 3, name: "Onions" },
      { id: 4, name: "Sour cream" },
      { id: 5, name: "Butter" },
    ],
    difficulty: "Medium",
    category: "Dinner",
  },
  {
    id: 5,
    title: "Chocolate Chip Cookies",
    description:
      "Chewy and buttery chocolate chip cookies that melt in your mouth. Perfect for an afternoon treat or dessert, these cookies are packed with rich chocolate chips and baked to golden perfection for a sweet indulgence.",
    time: "35 mins",
    ingredients: [
      { id: 1, name: "Flour" },
      { id: 2, name: "Butter" },
      { id: 3, name: "Sugar" },
      { id: 4, name: "Eggs" },
      { id: 5, name: "Chocolate chips" },
    ],
    difficulty: "Easy",
    category: "Dessert",
  },
  {
    id: 6,
    title: "Vegetable Stir-Fry",
    description:
      "A vibrant and healthy stir-fry featuring an assortment of fresh vegetables sautéed in a savory soy-based sauce. This dish is quick to prepare and can be customized with your favorite vegetables or protein for a nutritious meal.",
    time: "20 mins",
    ingredients: [
      { id: 1, name: "Broccoli" },
      { id: 2, name: "Carrots" },
      { id: 3, name: "Bell peppers" },
      { id: 4, name: "Soy sauce" },
      { id: 5, name: "Garlic" },
    ],
    difficulty: "Easy",
    category: "Lunch",
  },
  {
    id: 7,
    title: "Classic Margherita Pizza",
    description:
      "A timeless Italian favorite, Margherita pizza features a thin crust topped with rich tomato sauce, fresh mozzarella cheese, and fragrant basil leaves. Baked to perfection, this pizza is a simple yet flavorful delight.",
    time: "45 mins",
    ingredients: [
      { id: 1, name: "Pizza dough" },
      { id: 2, name: "Tomato sauce" },
      { id: 3, name: "Mozzarella cheese" },
      { id: 4, name: "Fresh basil" },
    ],
    difficulty: "Medium",
    category: "Dinner",
  },
];

const ingredients = [
  { id: 1, name: "Flour" },
  { id: 2, name: "Milk" },
  { id: 3, name: "Eggs" },
  { id: 4, name: "Spaghetti" },
  { id: 5, name: "Parmesan cheese" },
  { id: 6, name: "Pancetta" },
  { id: 7, name: "Black pepper" },
  { id: 8, name: "Romaine lettuce" },
  { id: 9, name: "Chicken breast" },
  { id: 10, name: "Croutons" },
  { id: 11, name: "Caesar dressing" },
  { id: 12, name: "Beef strips" },
  { id: 13, name: "Mushrooms" },
  { id: 14, name: "Onions" },
  { id: 15, name: "Sour cream" },
  { id: 16, name: "Butter" },
  { id: 17, name: "Butter" },
  { id: 18, name: "Sugar" },
  { id: 19, name: "Chocolate chips" },
  { id: 20, name: "Broccoli" },
  { id: 21, name: "Carrots" },
  { id: 22, name: "Bell peppers" },
  { id: 23, name: "Soy sauce" },
  { id: 24, name: "Garlic" },
  { id: 25, name: "Pizza dough" },
  { id: 26, name: "Tomato sauce" },
  { id: 27, name: "Mozzarella cheese" },
  { id: 28, name: "Fresh basil" },
];

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Appetizer",
  "Side Dish",
  "Drink",
  "Other",
];

export { recipes, ingredients, categories };
