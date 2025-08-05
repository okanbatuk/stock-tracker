import { RegisterInput } from "../schemas";

type Fields = Pick<RegisterInput, "email" | "name">;

export const normalizeUserFields = <T extends Partial<Fields>>(input: T): T => {
  return {
    ...input,
    email: input.email?.trim().toLowerCase(),
    ...(input.name && { name: toTitleCase(input.name?.trim()) }),
  };
};

const toTitleCase = (str: string): string =>
  str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
