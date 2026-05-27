import { todayInOslo } from "./holidays";

/**
 * Inneværende år beregnet i Europe/Oslo. Brukes til å holde header/footer-
 * navigasjon, copyright og lignende dynamiske. Husk å sette `revalidate` på
 * sider som rendrer dette, ellers fryses verdien ved build.
 */
export function getCurrentYear(): number {
  return todayInOslo().getUTCFullYear();
}
