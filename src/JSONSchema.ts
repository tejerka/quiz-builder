import { z } from "zod";

const JSONSchema = z.object({
  test: z.number(),
  deep: z.object({
    plop: z.enum(["toto", "titi", "tutu"]),
    counter: z.number(),
  }),
});

export type JSONType = z.infer<typeof JSONSchema>;

export default JSONSchema;
