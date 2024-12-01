import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import IngredientsSection, {
  Ingredient,
} from "@/components/SideBarComponents/IngredientsSection";
import RecipesSection, {
  Recipe,
} from "@/components/SideBarComponents/RecipesSection";
import CommunitySection from "@/components/SideBarComponents/CommunitySection";
import ProfileSection from "@/components/SideBarComponents/ProfileSection";
import "./MyProfile.css";
import {
  recipes as initialRecipes,
  ingredients,
  categories,
} from "./data/data";

const MyProfile: React.FC = () => {
  const [ingredientList] = useState<Ingredient[]>(ingredients);
  const [recipes] = useState<Recipe[]>(initialRecipes);

  const [activeSection, setActiveSection] = useState("ingredients");

  const renderSection = () => {
    switch (activeSection) {
      case "ingredients":
        return <IngredientsSection ingredients={ingredientList} />;
      case "recipes":
        return (
          <RecipesSection
            initialRecipes={recipes}
            availableIngredients={ingredientList}
            categories={categories}
          />
        );
      case "community":
        return <CommunitySection publicRecipes={recipes} />;
      case "profile":
        return <ProfileSection />;
      default:
        return <IngredientsSection ingredients={ingredients} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-[100vw]">
        <AppSidebar
          setActiveSection={setActiveSection}
          activeSection={activeSection}
        />
        <div className="content flex-1 p-4">{renderSection()}</div>
      </div>
      <SidebarTrigger />
    </SidebarProvider>
  );
};

export default MyProfile;
