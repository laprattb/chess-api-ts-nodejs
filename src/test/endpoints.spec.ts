import Joi from "joi";
import { ToInterface, ToJoiSchema } from "../lib/utils";
import { convertSchema } from "joi-to-typescript";
import "reflect-metadata";
import * as joiful from "joiful";

describe("Test the joi object utilitiy", () => {
  it("Should create a interface from a joi object", () => {
    interface joiObjectExpected {
      requiredString: string;
      optionalString?: string;
    }

    const joiObject = Joi.object({
      requiredString: Joi.string().required(),
      optionalString: Joi.string(),
    });

    //const joiRetObj = ToInterface(joiObject);
    const joiobj = ToJoiSchema<joiObjectExpected>();

    expect(joiobj).toEqual(joiObject);
  });
});
