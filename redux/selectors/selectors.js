import { stat } from "fs";

/**
 * @param {Object} state
 * @returns {any|Array<any>}
 */
export const stateSelector = (state) => state.userReducer;

