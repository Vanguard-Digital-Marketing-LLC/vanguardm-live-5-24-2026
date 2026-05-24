import { z } from "zod";

export const createApprovalSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required").max(5000),
  category: z.string().max(50).optional(),
  projectId: z.string().cuid().optional(),
  dueDate: z.string().datetime().optional(),
  fileUrls: z.array(z.string()).max(5).optional(),
});

export const resubmitApprovalSchema = z.object({
  description: z.string().min(1).max(5000).optional(),
  fileUrls: z.array(z.string()).max(5).optional(),
  comment: z.string().max(2000).optional(),
});

export const respondSchema = z
  .object({
    action: z.enum(["APPROVED", "REVISION_REQUESTED"]),
    reason: z
      .enum(["NEEDS_CHANGES", "WRONG_DIRECTION", "MISSING_INFO", "OTHER"])
      .optional(),
    comment: z.string().max(2000).optional(),
  })
  .refine((d) => d.action !== "REVISION_REQUESTED" || d.reason, {
    message: "Reason required when requesting revision",
  })
  .refine((d) => d.reason !== "OTHER" || (d.comment && d.comment.length > 0), {
    message: "Comment required when reason is OTHER",
  });
