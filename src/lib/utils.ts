/** Concatena clases ignorando falsy. Suficiente para este proyecto: no hay
 *  conflictos de utilidades Tailwind que justifiquen traer tailwind-merge. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
