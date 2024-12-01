import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/components/SideBarComponents/RecipesSection";
import communityPic from "@/assets/images/community.webp"; // Placeholder for recipe cover photo

interface CommunitySectionProps {
  publicRecipes: Recipe[];
}

const CommunitySection: React.FC<CommunitySectionProps> = ({
  publicRecipes,
}) => {
  const [filteredRecipes, setFilteredRecipes] =
    useState<Recipe[]>(publicRecipes);
  const [filters, setFilters] = useState({
    difficulty: "",
    time: "",
    category: "",
    ingredients: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    let filtered = [...publicRecipes];

    if (filters.difficulty) {
      filtered = filtered.filter(
        (recipe) => recipe.difficulty === filters.difficulty
      );
    }

    if (filters.time) {
      filtered = filtered.sort((a, b) => {
        const timeA = parseInt(a.time.split(" ")[0]);
        const timeB = parseInt(b.time.split(" ")[0]);
        return filters.time === "shortest" ? timeA - timeB : timeB - timeA;
      });
    }

    if (filters.category) {
      filtered = filtered.filter(
        (recipe) => recipe.category === filters.category
      );
    }

    if (filters.ingredients) {
      filtered = filtered.sort((a, b) => {
        return filters.ingredients === "fewest"
          ? a.ingredients.length - b.ingredients.length
          : b.ingredients.length - a.ingredients.length;
      });
    }

    setFilteredRecipes(filtered);
  };

  return (
    <div className="flex flex-col items-start w-full">
      <h2 className="text-3xl font-bold mb-4">Community recipes</h2>
      <img
        src={communityPic}
        alt="Recipe"
        className="w-full h-64 mb-4 object-cover object-top"
      />
      <div className="flex gap-4 mb-4 items-center">
        <select
          name="difficulty"
          onChange={handleFilterChange}
          className="rounded-[5px] p-2 border border-gray-300"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select
          name="time"
          onChange={handleFilterChange}
          className="rounded-[5px] p-2 border border-gray-300"
        >
          <option value="">All Times</option>
          <option value="shortest">Shortest to Longest</option>
          <option value="longest">Longest to Shortest</option>
        </select>
        <select
          name="category"
          onChange={handleFilterChange}
          className="rounded-[5px] p-2 border border-gray-300"
        >
          <option value="">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
        </select>
        <select
          name="ingredients"
          onChange={handleFilterChange}
          className="rounded-[5px] p-2 border border-gray-300"
        >
          <option value="">All Ingredients</option>
          <option value="fewest">Fewest to Most</option>
          <option value="most">Most to Fewest</option>
        </select>
        <Button
          variant="outline"
          className="rounded-[5px] text-white bg-customLime hover:bg-customLimeLight  font-bold py-3 px-6 shadow-lg transform transition-transform hover:scale-105"
          onClick={applyFilters}
        >
          Apply Filters
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 w-full">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center p-4 border rounded-lg shadow-md bg-white w-48 cursor-pointer">
          <div className="text-lg font-semibold">{recipe.title}</div>
          <div className="text-sm text-gray-500">{recipe.time}</div>
          <div className="text-sm text-gray-500">{recipe.difficulty}</div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-gray-200 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{recipe.title}</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          <div className="flex flex-col gap-2">
            <div>
              <strong>Description:</strong> {recipe.description}
            </div>
            <div>
              <strong>Time:</strong> {recipe.time}
            </div>
            <div>
              <strong>Difficulty:</strong> {recipe.difficulty}
            </div>
            <div>
              <strong>Category:</strong> {recipe.category}
            </div>
            <div>
              <strong>Ingredients:</strong>
              <ul className="list-disc list-inside">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </DialogDescription>
        <DialogClose asChild>
          <Button variant="secondary" className="rounded-[5px]">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CommunitySection;
