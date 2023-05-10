const foodCategories = {
    drinks: "drinks",
    entrees: "entrees",
    sides: "sides",
};

const TORTILLA_ITEM_NAME = "Tortilla on the Side";
const CHIPS_ITEM_NAME = "Chips";
const FOUNTAIN_DRINK_ITEM_NAME = "22 fl oz Soda/Iced Tea";
const CHIPS_AND_SALSA_ITEM_NAME = "Chips & Fresh Tomato Salsa";
const SIDE_OF_GUACAMOLE_ITEM_NAME = "Side of Guacamole";
const SIDE_OF_QUESO_ITEM_NAME = "Side of Queso Blanco";
const BOTTLED_DRINK_ITEM_TYPES = [
    "Izze",
    "Nantucket",
    "SanPellegrino",
    "MexCoke",
    "Tractor RTD",
    "MexSprite",
    "BottledWater",
];
const DOUBLE_PROTEIN_ITEM_TYPES = ["ExtraPortion"];
const CHIPS_AND_QUESO_ITEM_NAME = "Chips & Queso Blanco";
const CHIPS_AND_GUACAMOLE_ITEM_NAME = "Chips & Guacamole";
const KIDS_MEAL_ITEM_NAME = ["KidsBYO", "KidsQuesadilla"];
const ENTREE_ITEM_TYPES = ["Bowl"];
const QUESADILLA_ITEM_TYPES = ["Quesadilla"];
/**
 * A mapping that helps you go from an item in the rewards store to the exact item/items sold in each
 * chipotle store. I.E. "Side Tortilla" in the rewards store is used to redeem a "Tortilla on the side" in
 * the actual physical stores
 * @returns an object containing the reward to store mapping
 */
export default function getRewardMappings() {
    return {
        "Side Tortilla": {
            itemCategory: foodCategories.sides,
            itemName: TORTILLA_ITEM_NAME,
            options: false,
        },
        Chips: {
            itemCategory: foodCategories.sides,
            itemName: CHIPS_ITEM_NAME,
            options: false,
        },
        "Fountain Drink": {
            itemCategory: foodCategories.drinks,
            itemName: FOUNTAIN_DRINK_ITEM_NAME,
            options: false,
        },
        "Chips & Salsa": {
            itemCategory: foodCategories.sides,
            itemName: CHIPS_AND_SALSA_ITEM_NAME,
            options: false,
        },
        "Side of Guacamole": {
            itemCategory: foodCategories.sides,
            itemName: SIDE_OF_GUACAMOLE_ITEM_NAME,
            options: false,
        },
        "Side of Queso Blanco": {
            itemCategory: foodCategories.sides,
            itemName: SIDE_OF_QUESO_ITEM_NAME,
            options: false,
        },
        "Bottled Drink": {
            itemCategory: foodCategories.drinks,
            itemType: BOTTLED_DRINK_ITEM_TYPES,
            options: true,
        },
        "Double Protein": {
            itemCategory: foodCategories.entrees,
            itemType: DOUBLE_PROTEIN_ITEM_TYPES,
            options: true,
        },
        "Chips & Queso Blanco": {
            itemCategory: foodCategories.sides,
            itemName: CHIPS_AND_QUESO_ITEM_NAME,
            options: false,
        },
        "Chips & Guacamole": {
            itemCategory: foodCategories.sides,
            itemName: CHIPS_AND_GUACAMOLE_ITEM_NAME,
            options: false,
        },
        "Kid’s Meal": {
            itemCategory: foodCategories.entrees,
            itemType: KIDS_MEAL_ITEM_NAME,
            options: true,
        },
        Entree: {
            itemCategory: foodCategories.entrees,
            itemType: ENTREE_ITEM_TYPES,
            options: true,
        },
        Quesadilla: {
            itemCategory: foodCategories.entrees,
            itemType: QUESADILLA_ITEM_TYPES,
            options: true,
        },
    };
}
