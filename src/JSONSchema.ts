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
  titreEcran: translateTextSchema.optional(),
  subType: z.literal(undefined),
});

export const launchScreenSchema = screenTemplateSchema.extend({
  type: z.literal("lancement"),
  titre: translateTextSchema.optional(),
  texte: translateTextSchema.optional(),
  bouton_suivant: translateTextSchema.optional(),
});

export const transitionScreenSchema = screenTemplateSchema.extend({
  type: z.literal("transition"),
  image: z.string().optional(),
  bouton_suivant: translateTextSchema.optional(),
});

const choiceElementSchema = z.object({
  id: z.number().max(4).min(0),
  image: z.string().optional(),
  texte: translateTextSchema.optional(),
  reponse: z.boolean().optional(),
});

export const choicesScreenSchema = screenTemplateSchema.extend({
  type: z.literal("qcm"),
  image: z.string().optional(),
  consigne: translateTextSchema.optional(),
  valider: translateTextSchema.optional(),
  feedBack: translateTextSchema.optional(),
  choix: z.array(choiceElementSchema).max(5).optional(),
});

export const searchScreenSchema = screenTemplateSchema.extend({
  type: z.literal("image"),
  image: z.string().optional(),
  timer: z.number().optional(),
});

const dropElementSchema = z.object({
  id: z.string(),
  image: z.string().optional(),
});

const dragTextElementSchema = z.object({
  id: z.number().max(4).min(0),
  texte: translateTextSchema.optional(),
  drop: z.string().optional(),
});

export const dragAndDropTextScreenSchema = screenTemplateSchema.extend({
  type: z.literal("dragdrop"),
  subType: z.literal("text").optional(),
  consigne: translateTextSchema.optional(),
  valider: translateTextSchema.optional(),
  feedBack: translateTextSchema.optional(),
  drag: z.array(dragTextElementSchema).max(5).optional(),
  drop: z.array(dropElementSchema).max(5).optional(),
});

const dragImageElementSchema = z.object({
  id: z.number().max(9).min(0),
  image: z.string().optional(),
  image_miniature: z.string().optional(),
  drop: z.string().optional(),
});

export const dragAndDropImageScreenSchema = screenTemplateSchema.extend({
  type: z.literal("dragdrop"),
  subType: z.literal("image").optional(),
  consigne: translateTextSchema.optional(),
  valider: translateTextSchema.optional(),
  feedBack: translateTextSchema.optional(),
  drag: z.array(dragImageElementSchema).max(10).optional(),
  drop: z.array(dropElementSchema).max(5).optional(),
});

const sortElementSchema = z.object({
  id: z.string(),
  image: z.string().optional(),
  texte: translateTextSchema.optional(),
  place: z.number().min(1).max(5).optional(),
});

export const SortScreenSchema = screenTemplateSchema.extend({
  type: z.literal("classement"),
  consigne: translateTextSchema.optional(),
  valider: translateTextSchema.optional(),
  retour: translateTextSchema.optional(),
  feedBack: translateTextSchema.optional(),
  classement: z.array(sortElementSchema).max(5).optional(),
});

export const EndScreenSchema = screenTemplateSchema.extend({
  type: z.literal("fin"),
  image: z.string().optional(),
  bouton_suivant: translateTextSchema.optional(),
});

export const NewScreenSchema = screenTemplateSchema.extend({
  type: z.literal("new"),
});

export const screenSchema = z.union([
  NewScreenSchema,
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
  titre: translateTextSchema.optional(),
  visuel: z.string().optional(),
  couleur: colorStringSchema.optional(),
  text: translateTextSchema.optional(),
});

export const quizSchema = z.object({
  id: z.string(),
  choix: choiceSchema.optional(),
  couleur_boutons: colorStringSchema.optional(),
  ecrans: z.array(screenSchema).optional(),
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
