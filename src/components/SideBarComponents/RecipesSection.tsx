import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import recipePic from "@/assets/images/recipe.webp"; // Placeholder for recipe cover photo

interface Ingredient {
  id: number;
  name: string;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  time: string;
  ingredients: Ingredient[];
  difficulty: string;
  category: string;
}

interface RecipesSectionProps {
  initialRecipes: Recipe[];
  availableIngredients: Ingredient[];
  categories: string[];
}

const RecipesSection: React.FC<RecipesSectionProps> = ({
  initialRecipes,
  availableIngredients,
  categories,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [filteredRecipes, setFilteredRecipes] =
    useState<Recipe[]>(initialRecipes);
  const [filters, setFilters] = useState({
    difficulty: "",
    time: "",
    category: "",
    ingredients: "",
  });

  const handleAddRecipe = (newRecipe: Recipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    setFilteredRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const handleEditRecipe = (updatedRecipe: Recipe) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
    setFilteredRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
  };

  const handleDeleteRecipe = (id: number) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== id)
    );
    setFilteredRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== id)
    );
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    let filtered = [...recipes];

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
      <div className="flex justify-between w-full items-center mb-4">
        <h2 className="text-3xl font-bold">My Recipes</h2>
        <AddRecipe
          onAdd={handleAddRecipe}
          availableIngredients={availableIngredients}
          categories={categories}
        />
      </div>
      <img
        src={recipePic}
        alt="Recipe Cover"
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
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
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
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onEdit={handleEditRecipe}
            onDelete={handleDeleteRecipe}
            availableIngredients={availableIngredients}
            categories={categories}
          />
        ))}
      </div>
    </div>
  );
};

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (updatedRecipe: Recipe) => void;
  onDelete: (id: number) => void;
  availableIngredients: Ingredient[];
  categories: string[];
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onEdit,
  onDelete,
  availableIngredients,
  categories,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(recipe);

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditedRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleIngredientChange = (ingredient: Ingredient) => {
    setEditedRecipe((prevRecipe) => {
      const ingredients = prevRecipe.ingredients.includes(ingredient)
        ? prevRecipe.ingredients.filter((ing) => ing.id !== ingredient.id)
        : [...prevRecipe.ingredients, ingredient];
      return { ...prevRecipe, ingredients };
    });
  };

  const handleSave = () => {
    onEdit(editedRecipe);
    setIsEditing(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center p-4 border rounded-lg shadow-md bg-white w-48 cursor-pointer">
          <div className="text-lg font-semibold">{recipe.title}</div>
          <div className="text-sm text-gray-500">{recipe.time}</div>
          <div className="text-sm text-gray-500">{recipe.difficulty}</div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-gray-200 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{recipe.title}</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          {isEditing ? (
            <form
              className="flex gap-4 justify-around"
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
            >
              <div className="flex flex-col gap-2 w-[21vw]">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={editedRecipe.title}
                  onChange={handleEditChange}
                  className="rounded-[5px] w-full bg-white"
                />
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editedRecipe.description}
                  onChange={handleEditChange}
                  className="rounded-[5px] w-full bg-white"
                />
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  name="time"
                  value={editedRecipe.time}
                  onChange={handleEditChange}
                  className="rounded-[5px] w-full bg-white"
                />
                <Label htmlFor="difficulty">Difficulty</Label>
                <Input
                  id="difficulty"
                  name="difficulty"
                  value={editedRecipe.difficulty}
                  onChange={handleEditChange}
                  className="rounded-[5px] w-full bg-white"
                />
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={editedRecipe.category}
                  onChange={handleEditChange}
                  className="rounded-[5px] w-full bg-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="font-bold text-lg">Ingredients</Label>
                <ul className="list-disc list-inside">
                  {availableIngredients.map((ingredient) => (
                    <li key={ingredient.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={editedRecipe.ingredients.some(
                            (ing) => ing.id === ingredient.id
                          )}
                          onChange={() => handleIngredientChange(ingredient)}
                        />
                        {ingredient.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </form>
          ) : (
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
          )}
        </DialogDescription>
        <DialogFooter>
          {isEditing ? (
            <>
              <Button
                variant="secondary"
                className="rounded-[5px]"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                className="rounded-[5px]"
                onClick={handleSave}
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="rounded-[5px]"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                className="rounded-[5px] text-white bg-red-500 hover:bg-red-400"
                onClick={() => onDelete(recipe.id)}
              >
                Delete
              </Button>
              <DialogClose asChild>
                <Button variant="secondary" className="rounded-[5px]">
                  Close
                </Button>
              </DialogClose>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface AddRecipeProps {
  onAdd: (newRecipe: Recipe) => void;
  availableIngredients: Ingredient[];
  categories: string[];
}

const AddRecipe: React.FC<AddRecipeProps> = ({
  onAdd,
  availableIngredients,
  categories,
}) => {
  const [newRecipe, setNewRecipe] = useState<Recipe>({
    id: Date.now(),
    title: "",
    description: "",
    time: "",
    ingredients: [],
    difficulty: "",
    category: "",
  });
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleIngredientChange = (ingredient: Ingredient) => {
    setNewRecipe((prevRecipe) => {
      const ingredients = prevRecipe.ingredients.includes(ingredient)
        ? prevRecipe.ingredients.filter((ing) => ing.id !== ingredient.id)
        : [...prevRecipe.ingredients, ingredient];
      return { ...prevRecipe, ingredients };
    });
  };

  const handleAdd = (closeDialog: () => void) => {
    if (
      newRecipe.title.trim() === "" ||
      newRecipe.description.trim() === "" ||
      newRecipe.time.trim() === "" ||
      newRecipe.difficulty.trim() === "" ||
      newRecipe.category.trim() === ""
    ) {
      setError("All fields are required");
      return;
    }
    onAdd(newRecipe);
    setNewRecipe({
      id: Date.now(),
      title: "",
      description: "",
      time: "",
      ingredients: [],
      difficulty: "",
      category: "",
    });
    setError("");
    closeDialog();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-[5px]">
          Add Recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-200 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Recipe</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          <form
            className="flex gap-4 justify-around"
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd(() => document.getElementById("add-dialog")?.click());
            }}
          >
            <div className="flex flex-col gap-2 w-[21vw]">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={newRecipe.title}
                onChange={handleChange}
                className="rounded-[5px] w-full bg-white"
              />
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newRecipe.description}
                onChange={handleChange}
                className="rounded-[5px] w-full bg-white"
              />
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                value={newRecipe.time}
                onChange={handleChange}
                className="rounded-[5px] w-full bg-white"
              />
              <Label htmlFor="difficulty">Difficulty</Label>
              <Input
                id="difficulty"
                name="difficulty"
                value={newRecipe.difficulty}
                onChange={handleChange}
                className="rounded-[5px] w-full bg-white"
              />
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                value={newRecipe.category}
                onChange={handleChange}
                className="rounded-[5px] w-full bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="font-bold text-lg">Ingredients</Label>
              <ul className="list-disc list-inside ">
                {availableIngredients.map((ingredient) => (
                  <li key={ingredient.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={newRecipe.ingredients.some(
                          (ing) => ing.id === ingredient.id
                        )}
                        onChange={() => handleIngredientChange(ingredient)}
                      />
                      {ingredient.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" className="rounded-[5px]">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="outline"
            className="rounded-[5px]"
            onClick={() =>
              handleAdd(() => document.getElementById("add-dialog")?.click())
            }
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipesSection;
