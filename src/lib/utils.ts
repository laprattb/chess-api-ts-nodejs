import { tsRestType } from "@babel/types";
import Joi from "joi";
import { joi } from "joiful";
import { KeysOfAType } from "mongoose";

export const ToInterface = <T extends Joi.ObjectSchema>(jobj: T): any => {
  let tmp: any;

  for (const i of jobj["_ids"]["_byKey"].entries()) {
    console.log(i);
  }

  return tmp;
};

// type JoiDTO<T extends Record<string, keyof T>> = {};
// export const ToJoiSchema = <T>(): Joi.ObjectSchema => {
//   let tobj: JoiDTO<T>;
//   for (const key in tobj) {
//     console.log(key);
//   }
//   throw new Error("not implemented");
// };

export type JoiSchema<T> = T;
