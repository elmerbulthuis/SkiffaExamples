import * as api from "reverse-api";
import { Authentication } from "../authentication-handlers/types.js";

/**
 * The reverse operation handler. All logic for the operation is in this function.
 * This operation will take the body of a request, a string and return the reversed
 * string in the body of the response.
 */
export const reverse: api.server.ReverseOperationHandler<Authentication> = async (text) => {
  // reverse the text
  const characters = [...text];
  characters.reverse();
  const reversedText = characters.join("");

  // return the reversed text to the client
  return [200, reversedText];
};
