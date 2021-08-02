import { Fragment } from 'react'
import { CategoriesPart } from './CategoriesPart'
import { FacesDisplayPart } from './FacesDisplayPart';

export default function App() {

  return (
    <Fragment>
      <CategoriesPart />
      <FacesDisplayPart />
    </Fragment>

  )
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}