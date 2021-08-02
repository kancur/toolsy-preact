import { kawaii } from './kawaiiData';
import { capitalizeFirstLetter } from './App'

export function CategoriesPart() {
  const categories = Object.keys(kawaii);

  return (
    <div class="box">
      <div class="tags are-large">
        {categories.map((category) => <SingleCategory key={category} category={category} />)}
      </div>
    </div>
  );
}

export const SingleCategory = ({ category }) => <span class="tag is-light">{capitalizeFirstLetter(category)} faces</span>
