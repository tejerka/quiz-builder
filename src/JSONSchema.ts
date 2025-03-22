import { z } from "zod";

const colorStringSchema = z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/);

const translateTextSchema = z.record(z.union([z.literal("fr"), z.literal("en")]), z.string());

const backgroundSchema = z.object({
  image: z.string().optional(),
  couleur: colorStringSchema.optional(),
});

const screenTemplateSchema = z.object({
  id: z.string(),
  fond: backgroundSchema.optional(),
  titreEcran: translateTextSchema,
  subType: z.literal(undefined),
});

export const launchScreenSchema = screenTemplateSchema.extend({
  type: z.literal("lancement"),
  titre: translateTextSchema.optional(),
  texte: translateTextSchema,
  bouton_suivant: translateTextSchema,
});

export const transitionScreenSchema = screenTemplateSchema.extend({
  type: z.literal("transition"),
  image: z.string().optional(),
  bouton_suivant: translateTextSchema,
});

const choiceElementSchema = z.object({
  id: z.number().max(4).min(0),
  image: z.string().optional(),
  texte: translateTextSchema,
  reponse: z.boolean(),
});

export const choicesScreenSchema = screenTemplateSchema.extend({
  type: z.literal("qcm"),
  image: z.string().optional(),
  consigne: translateTextSchema,
  valider: translateTextSchema,
  feedBack: translateTextSchema,
  choix: z.array(choiceElementSchema).max(5),
});

export const searchScreenSchema = screenTemplateSchema.extend({
  type: z.literal("image"),
  image: z.string(),
  timer: z.number(),
});

const dropElementSchema = z.object({
  id: z.string(),
  image: z.string().optional(),
});

const dragTextElementSchema = z.object({
  id: z.number().max(4).min(0),
  texte: translateTextSchema,
  drop: z.string(),
});

export const dragAndDropTextScreenSchema = screenTemplateSchema.extend({
  type: z.literal("dragdrop"),
  subType: z.literal("text").optional(),
  consigne: translateTextSchema,
  valider: translateTextSchema,
  feedBack: translateTextSchema,
  drag: z.array(dragTextElementSchema).max(5),
  drop: z.array(dropElementSchema).max(5),
});

const dragImageElementSchema = z.object({
  id: z.number().max(9).min(0),
  image: z.string().optional(),
  image_miniature: z.string().optional(),
  drop: z.string(),
});

export const dragAndDropImageScreenSchema = screenTemplateSchema.extend({
  type: z.literal("dragdrop"),
  subType: z.literal("image").optional(),
  consigne: translateTextSchema,
  valider: translateTextSchema,
  feedBack: translateTextSchema,
  drag: z.array(dragImageElementSchema).max(10),
  drop: z.array(dropElementSchema).max(5),
});

const sortElementSchema = z.object({
  id: z.string(),
  image: z.string().optional(),
  texte: translateTextSchema,
  place: z.number().min(1).max(5),
});

export const SortScreenSchema = screenTemplateSchema.extend({
  type: z.literal("classement"),
  consigne: translateTextSchema,
  valider: translateTextSchema,
  retour: translateTextSchema,
  feedBack: translateTextSchema,
  classement: z.array(sortElementSchema).max(5),
});

export const EndScreenSchema = screenTemplateSchema.extend({
  type: z.literal("fin"),
  image: z.string().optional(),
  bouton_suivant: translateTextSchema,
});

export const screenSchema = z.union([
  launchScreenSchema,
  transitionScreenSchema,
  choicesScreenSchema,
  searchScreenSchema,
  dragAndDropTextScreenSchema,
  dragAndDropImageScreenSchema,
  SortScreenSchema,
  EndScreenSchema,
]);

const choiceSchema = z.object({
  titre: translateTextSchema,
  visuel: z.string().optional(),
  couleur: colorStringSchema.optional(),
  text: translateTextSchema,
});

export const quizSchema = z.object({
  id: z.string(),
  choix: choiceSchema,
  couleur_boutons: colorStringSchema.optional(),
  ecrans: z.array(screenSchema),
});

const JSONSchema = z.object({
  fond_permanent: backgroundSchema.optional(),
  fond_choix_quiz: z
    .object({
      image: z.string().optional(),
      couleur_overlay: colorStringSchema.optional(),
    })
    .optional(),
  quiz: z.array(quizSchema),
});

export type JSONType = z.infer<typeof JSONSchema>;

export default JSONSchema;
