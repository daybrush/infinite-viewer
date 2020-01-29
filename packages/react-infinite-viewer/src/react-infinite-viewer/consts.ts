import { EVENTS } from "infinite-viewer";
import { camelize } from "@daybrush/utils";

export const REACT_EVENTS =  EVENTS.map(name => camelize(`on ${name}`));
