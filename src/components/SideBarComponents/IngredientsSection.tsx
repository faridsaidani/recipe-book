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
import ingredientsPic2 from "@/assets/images/ingredients2.webp";

interface Ingredient {
  id: number;
  name: string;
}

interface IngredientsSectionProps {
  ingredients: Ingredient[];
}

const IngredientsSection = ({ ingredients }: IngredientsSectionProps) => {
  const [ingredientsState, setIngredientsState] = useState(ingredients);

  const handleIngredientChange = (id: number, newName: string) => {
    setIngredientsState((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, name: newName } : ingredient
      )
    );
  };

  const handleDeleteIngredient = (id: number) => {
    setIngredientsState((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== id)
    );
  };

  const handleAddIngredient = (newIngredient: Ingredient) => {
    setIngredientsState((prevIngredients) => [
      ...prevIngredients,
      newIngredient,
    ]);
  };

  return (
    <div className="flex flex-col items-start w-full">
      <div className="flex justify-between w-full items-center mb-4">
        <h1 className="text-2xl font-bold ml-2">Ingredients</h1>
        <AddIngredient onAdd={handleAddIngredient} />
      </div>
      <div className="flex flex-col items-center w-full">
        <img
          src={ingredientsPic2}
          alt="Ingredients"
          className="w-full h-64 mb-4 object-cover object-top"
        />
        <div className="flex flex-wrap gap-4 w-full">
          {ingredientsState.map((ingredient) => (
            <div
              key={ingredient.id}
              className="flex flex-col items-center p-4 border rounded-lg shadow-md bg-white w-48"
            >
              <div className="text-lg font-semibold">{ingredient.name}</div>
              <div className="flex gap-2 mt-2">
                <EditIngredient
                  ingredient={ingredient}
                  onEdit={handleIngredientChange}
                />
                <DeleteIngredient
                  id={ingredient.id}
                  onDelete={handleDeleteIngredient}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface EditIngredientProps {
  ingredient: Ingredient;
  onEdit: (id: number, newName: string) => void;
}

function EditIngredient({ ingredient, onEdit }: EditIngredientProps) {
  const [name, setName] = useState(ingredient.name);
  const [error, setError] = useState("");

  const handleEdit = (closeDialog: () => void) => {
    if (name.trim() === "") {
      setError("Name cannot be empty");
      return;
    }
    onEdit(ingredient.id, name);
    closeDialog();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-[5px]">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-200 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Ingredient</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(() =>
                document.getElementById(`edit-dialog-${ingredient.id}`)?.click()
              );
            }}
          >
            <div className="flex gap-1 items-center justify-between">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                className="rounded-[5px] w-[20vw] bg-white"
              />
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
              handleEdit(() =>
                document.getElementById(`edit-dialog-${ingredient.id}`)?.click()
              )
            }
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface DeleteIngredientProps {
  id: number;
  onDelete: (id: number) => void;
}

function DeleteIngredient({ id, onDelete }: DeleteIngredientProps) {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-[5px] text-white bg-red-500 hover:bg-red-400"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-200 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Ingredient</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this ingredient?
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" className="rounded-[5px]">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="text-white bg-red-500 p-2 rounded-[5px] hover:bg-red-400"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface AddIngredientProps {
  onAdd: (newIngredient: Ingredient) => void;
}

function AddIngredient({ onAdd }: AddIngredientProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleAdd = (closeDialog: () => void) => {
    if (name.trim() === "") {
      setError("Name cannot be empty");
      return;
    }
    const newIngredient = {
      id: Date.now(),
      name,
    };
    onAdd(newIngredient);
    setName("");
    closeDialog();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-[5px]">
          Add Ingredient
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-200 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Ingredient</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleAdd(() => document.getElementById("add-dialog")?.click());
            }}
          >
            <div className="flex gap-1 items-center justify-between">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                className="rounded-[5px] w-[20vw] bg-white"
              />
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
}

export default IngredientsSection;
export type { Ingredient };
