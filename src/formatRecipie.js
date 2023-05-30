const formatRecipie = (recipie) => {
  return {
    id: recipie._id,
    stepsToCook: recipie.stepsToCook,
    title: recipie.title,
    img: recipie.img,
    ingredients: recipie.ingredients,
  };
};

module.exports = formatRecipie;
